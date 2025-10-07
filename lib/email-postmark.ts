import { ServerClient } from "postmark";
import type { Order, UserCoupon } from "@prisma/client";

// Initialize Postmark client
const postmark = process.env.POSTMARK_API_KEY
  ? new ServerClient(process.env.POSTMARK_API_KEY)
  : null;

const FROM_EMAIL = "noreply@couplescoupons.com";

/**
 * Send order confirmation and gift delivery emails using Postmark template
 * Template: coupon-pack
 */
export async function sendOrderConfirmation(order: Order) {
  if (!postmark) {
    console.log("[DEV] Email would be sent: Order confirmation to", order.buyerEmail);
    return;
  }

  try {
    // Send to buyer - order confirmation
    await postmark.sendEmailWithTemplate({
      From: FROM_EMAIL,
      To: order.buyerEmail,
      TemplateAlias: "coupon-pack",
      TemplateModel: {
        buyer_name: order.buyerName,
        receiver_name: order.receiverName,
        pack_name: order.packName,
        order_number: order.orderNumber,
        access_code: order.accessCode,
        access_url: order.accessUrl,
        custom_message: order.customMessage || "",
        pdf_url: order.pdfUrl || "",
      },
    });

    console.log("✅ Order confirmation sent to:", order.buyerEmail);
  } catch (error) {
    console.error("Failed to send order confirmation:", error);
    throw error;
  }
}

/**
 * Send gift delivery email to receiver using Postmark template
 * Template: coupon-pack (same template, different recipient)
 */
export async function sendGiftDelivery(order: Order, receiverEmail?: string) {
  if (!postmark) {
    console.log("[DEV] Email would be sent: Gift delivery to", receiverEmail || order.buyerEmail);
    return;
  }

  try {
    // In production, this should go to the actual receiver's email
    // For now, sending to buyer's email as a demo
    const recipientEmail = receiverEmail || order.buyerEmail;

    await postmark.sendEmailWithTemplate({
      From: FROM_EMAIL,
      To: recipientEmail,
      TemplateAlias: "coupon-pack",
      TemplateModel: {
        buyer_name: order.buyerName,
        receiver_name: order.receiverName,
        pack_name: order.packName,
        order_number: order.orderNumber,
        access_code: order.accessCode,
        access_url: order.accessUrl,
        custom_message: order.customMessage || "",
        pdf_url: order.pdfUrl || "",
        is_gift: true, // Flag to show gift-specific messaging
      },
    });

    console.log("✅ Gift delivery sent to:", recipientEmail);
  } catch (error) {
    console.error("Failed to send gift delivery:", error);
    throw error;
  }
}

/**
 * Send redemption notification to gifter using Postmark template
 * Template: coupon-pack-1
 */
export async function sendRedemptionNotification(
  order: Order,
  coupon: UserCoupon
) {
  if (!postmark) {
    console.log("[DEV] Email would be sent: Redemption notification to", order.buyerEmail);
    return;
  }

  try {
    await postmark.sendEmailWithTemplate({
      From: FROM_EMAIL,
      To: order.buyerEmail,
      TemplateAlias: "coupon-pack-1",
      TemplateModel: {
        buyer_name: order.buyerName,
        receiver_name: order.receiverName,
        coupon_title: coupon.title,
        coupon_description: coupon.description,
        coupon_tip: coupon.tip || "",
        redeemed_at: coupon.redeemedAt?.toISOString() || new Date().toISOString(),
      },
    });

    console.log("✅ Redemption notification sent to:", order.buyerEmail);
  } catch (error) {
    console.error("Failed to send redemption notification:", error);
    throw error;
  }
}
