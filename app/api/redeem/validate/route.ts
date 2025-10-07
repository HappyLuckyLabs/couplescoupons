import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { accessCode } = await req.json();

    const order = await prisma.order.findUnique({
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
