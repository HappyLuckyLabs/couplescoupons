import QRCode from "qrcode";
import { put } from "@vercel/blob";
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { createElement } from "react";

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

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#111827",
  },
  message: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  qrCode: {
    width: 180,
    height: 180,
  },
  accessCode: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2563eb",
    marginTop: 10,
    letterSpacing: 3,
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: "#9ca3af",
    textAlign: "center",
  },
});

interface PDFCardProps {
  buyerName: string;
  receiverName: string;
  packName: string;
  customMessage?: string;
  accessUrl: string;
  accessCode: string;
  qrCodeDataUrl: string;
}

// PDF Document Component
const PDFCard = ({ buyerName, receiverName, packName, customMessage, accessUrl, accessCode, qrCodeDataUrl }: PDFCardProps) =>
  createElement(
    Document,
    {},
    createElement(
      Page,
      { size: "A4", style: styles.page },
      createElement(Text, { style: styles.header }, "💝 Couples Coupons Gift Card"),

      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.label }, "To:"),
        createElement(Text, { style: styles.value }, receiverName)
      ),

      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.label }, "From:"),
        createElement(Text, { style: styles.value }, buyerName)
      ),

      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.label }, "Pack:"),
        createElement(Text, { style: styles.value }, packName)
      ),

      customMessage ? createElement(View, { style: styles.section },
        createElement(Text, { style: styles.label }, "Personal Message:"),
        createElement(Text, { style: styles.message }, customMessage)
      ) : null,

      createElement(View, { style: styles.qrContainer },
        createElement(Image, { style: styles.qrCode, src: qrCodeDataUrl }),
        createElement(Text, { style: styles.accessCode }, accessCode)
      ),

      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.label }, "Access your coupons at:"),
        createElement(Text, { style: styles.value }, accessUrl)
      ),

      createElement(Text, { style: styles.footer }, "Scan the QR code or visit the URL above to view your coupons")
    )
  );

export async function generatePDFCard(
  order: { buyerName: string; receiverName: string; packName: string; customMessage?: string | null; accessUrl: string; accessCode: string; orderNumber: string },
  qrCodeDataUrl: string
): Promise<string> {
  try {
    // Generate PDF as blob
    const pdfDoc = PDFCard({
      buyerName: order.buyerName,
      receiverName: order.receiverName,
      packName: order.packName,
      customMessage: order.customMessage || undefined,
      accessUrl: order.accessUrl,
      accessCode: order.accessCode,
      qrCodeDataUrl,
    });

    const pdfBlob = await pdf(pdfDoc).toBlob();

    // Upload to Vercel Blob
    const filename = `gift-cards/${order.orderNumber}-${Date.now()}.pdf`;
    const blob = await put(filename, pdfBlob, {
      access: "public",
      contentType: "application/pdf",
    });

    return blob.url;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw error;
  }
}
