import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accessCode: string }> }
) {
  try {
    const { accessCode } = await params;
    const order = await prisma.order.findUnique({
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
