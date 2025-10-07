import QRCode from "qrcode";
import type { Order } from "@prisma/client";

export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      errorCorrectionLevel: "M",
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    throw error;
  }
}

export async function generatePDFCard(order: Order, _qrCodeUrl: string): Promise<string> {
  // For now, return a simple data URL
  // In production, you'd use @react-pdf/renderer to create a beautiful PDF
  const pdfContent = `
    Couples Coupons Gift Card

    ${order.customMessage || ""}

    Scan the QR code or visit:
    ${order.accessUrl}

    Access Code: ${order.accessCode}

    From: ${order.buyerName}
    To: ${order.receiverName}
  `;

  // This is a placeholder - in production, generate actual PDF
  return `data:text/plain;base64,${Buffer.from(pdfContent).toString("base64")}`;
}
