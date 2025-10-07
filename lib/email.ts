import { Resend } from "resend";
import type { Order, UserCoupon } from "@prisma/client";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = "Couples Coupons <noreply@couplescoupons.com>";

export async function sendOrderConfirmation(order: Order) {
  if (!resend) {
    console.log("[DEV] Email would be sent: Order confirmation to", order.buyerEmail);
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.buyerEmail,
      subject: "Your Couples Coupons order is confirmed! 🎁",
      html: `
        <h1>Thank you for your order!</h1>
        <p>Hi ${order.buyerName},</p>
        <p>Your ${order.packName} has been sent to ${order.receiverName}!</p>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Access Code:</strong> ${order.accessCode}</p>
        <p>They'll receive an email with instructions on how to access their coupons.</p>
        <p>You'll get notified each time they redeem a coupon!</p>
        <br>
        <p>With love,<br>The Couples Coupons Team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send order confirmation:", error);
  }
}

export async function sendGiftDelivery(order: Order) {
  if (!resend) {
    console.log("[DEV] Email would be sent: Gift delivery to", order.buyerEmail);
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.buyerEmail, // In a real app, this would be sent to a recipient email
      subject: `${order.buyerName} sent you Couples Coupons! ❤️`,
      html: `
        <h1>${order.buyerName} sent you something special!</h1>
        <p>Hi ${order.receiverName},</p>
        ${order.customMessage ? `<p><em>"${order.customMessage}"</em></p>` : ""}
        <p>You've received a ${order.packName} with 20 romantic coupons!</p>
        <h2>How to Access Your Coupons:</h2>
        <p>1. Visit: <a href="${order.accessUrl}">${order.accessUrl}</a></p>
        <p>2. Enter access code: <strong>${order.accessCode}</strong></p>
        <p>Redeem them whenever you want, and ${order.buyerName} will be notified to make it happen!</p>
        <br>
        <p>Enjoy your coupons!<br>The Couples Coupons Team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send gift delivery:", error);
  }
}

export async function sendRedemptionNotification(
  order: Order,
  coupon: UserCoupon
) {
  if (!resend) {
    console.log("[DEV] Email would be sent: Redemption notification to", order.buyerEmail);
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.buyerEmail,
      subject: `${order.receiverName} redeemed: ${coupon.title}! 💕`,
      html: `
        <h1>Coupon Redeemed!</h1>
        <p>Hi ${order.buyerName},</p>
        <p>${order.receiverName} just redeemed: <strong>${coupon.title}</strong></p>
        <p>${coupon.description}</p>
        ${coupon.tip ? `<h3>Tips for fulfilling:</h3><p>${coupon.tip}</p>` : ""}
        <p>Time to make it happen! ✨</p>
        <br>
        <p>With love,<br>The Couples Coupons Team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send redemption notification:", error);
  }
}
