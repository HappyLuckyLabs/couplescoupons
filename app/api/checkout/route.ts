import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateAccessCode, generateOrderNumber } from "@/lib/utils/access-code";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packId, buyerName, buyerEmail, receiverName, customMessage, promoCode } = body;

    // Get pack
    const pack = await prisma.couponPack.findUnique({
      where: { id: packId },
    });

    if (!pack) {
      return NextResponse.json({ error: "Pack not found" }, { status: 404 });
    }

    // Calculate price (with promo code if provided)
    let finalAmount = Number(pack.priceAud);
    let discountAmount = 0;

    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: { code: promoCode.toUpperCase() },
      });

      if (promo && promo.isActive) {
        if (promo.discountType === "percentage") {
          discountAmount = (finalAmount * Number(promo.discountValue)) / 100;
        } else if (promo.discountType === "fixed_amount") {
          discountAmount = Number(promo.discountValue);
        }
        finalAmount = Math.max(0, finalAmount - discountAmount);
      }
    }

    // Generate access code and order number
    const accessCode = await generateAccessCode();
    const orderNumber = generateOrderNumber();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const accessUrl = `${baseUrl}/my-pack/${accessCode}`;

    // Create pending order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        accessCode,
        accessUrl,
        buyerEmail,
        buyerName,
        receiverName,
        customMessage,
        packId: pack.id,
        packName: pack.name,
        packPrice: pack.priceAud,
        currencyCode: "AUD",
        promoCode: promoCode?.toUpperCase(),
        discountAmount,
        finalAmount,
        status: "pending",
      },
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: pack.name,
              description: pack.tagline || undefined,
            },
            unit_amount: Math.round(finalAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: buyerEmail,
      metadata: {
        orderId: order.id,
        packId: pack.id,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/packs/${pack.slug}`,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
