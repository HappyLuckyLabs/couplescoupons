"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function RedeemPage() {
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/redeem/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode: accessCode.toUpperCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid access code");
      }

      // Redirect to coupon pack
      router.push(`/my-pack/${accessCode.toUpperCase()}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid access code");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 bg-gradient-to-br from-peach-50 to-white">
        <div className="container mx-auto px-6 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">Enter Your Access Code</CardTitle>
              <p className="text-center text-neutral-600">
                Enter the 6-character code from your email or PDF card
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading || accessCode.length !== 6}>
                  {isLoading ? "Checking..." : "View My Coupons"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
