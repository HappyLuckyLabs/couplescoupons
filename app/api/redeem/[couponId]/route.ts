import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { sendRedemptionNotification } from "@/lib/email-postmark";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ couponId: string }> }
) {
  try {
    const { couponId } = await params;
    const coupon = await db.userCoupon.findUnique({
      where: { id: couponId },
      include: { order: true },
    });

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    if (coupon.isRedeemed) {
      return NextResponse.json({ error: "Already redeemed" }, { status: 400 });
    }

    // Mark as redeemed
    const updatedCoupon = await db.userCoupon.update({
      where: { id: couponId },
      data: {
        isRedeemed: true,
        redeemedAt: new Date(),
      },
    });

    // Send notification email to gifter
    await sendRedemptionNotification(coupon.order, updatedCoupon);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redemption error:", error);
    return NextResponse.json({ error: "Redemption failed" }, { status: 500 });
  }
}
