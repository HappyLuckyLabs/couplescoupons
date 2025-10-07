import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateQRCode } from "@/lib/pdf";
import { sendOrderConfirmation, sendGiftDelivery } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json({ error: "No order ID" }, { status: 400 });
    }

    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { pack: true },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Generate QR code
      const qrCodeDataUrl = await generateQRCode(order.accessUrl);

      // Create user coupons from templates
      const couponTemplates = await prisma.couponTemplate.findMany({
        where: { packId: order.packId },
        orderBy: { displayOrder: "asc" },
      });

      await Promise.all(
        couponTemplates.map((template) =>
          prisma.userCoupon.create({
            data: {
              orderId: order.id,
              couponTemplateId: template.id,
              title: template.title,
              description: template.description,
              iconUrl: template.iconUrl,
              tip: template.tip,
              displayOrder: template.displayOrder,
            },
          })
        )
      );

      // Update order
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "paid",
          stripePaymentIntentId: session.payment_intent as string,
          qrCodeUrl: qrCodeDataUrl,
          pdfGeneratedAt: new Date(),
          confirmationEmailSentAt: new Date(),
          giftEmailSentAt: new Date(),
        },
      });

      // Send emails
      await sendOrderConfirmation(order);
      await sendGiftDelivery(order);

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error("Webhook processing error:", error);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
