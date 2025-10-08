import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { accessCode } = await req.json();

    const order = await db.order.findUnique({
      where: { accessCode },
      include: {
        userCoupons: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!order || order.status !== "paid") {
      return NextResponse.json({ error: "Invalid access code" }, { status: 404 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
