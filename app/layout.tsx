import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Couples Coupons | Digital Love Coupons & Romantic Gestures",
  description:
    "Strengthen your relationship with digital coupon packs. Send romantic gestures, acts of service, and memorable experiences to your partner.",
  keywords: [
    "couples coupons",
    "digital love coupons",
    "romantic gestures",
    "relationship gifts",
    "anniversary gift",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
