import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accessCode: string }> }
) {
  try {
    const { accessCode } = await params;
    const order = await db.order.findUnique({
      where: { accessCode },
      include: {
        userCoupons: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!order || order.status !== "paid") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}
