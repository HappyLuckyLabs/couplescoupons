"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking payment status
    // In production, you might verify the session with Stripe
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-600">Confirming your order...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <div className="text-center">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6">Payment Successful!</h1>
              <p className="text-xl text-neutral-600 mb-12">
                Your gift has been sent! Here's what happens next:
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-8 w-8 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">You'll Receive a Confirmation Email</h3>
                    <p className="text-neutral-700">
                      Check your inbox for an order confirmation with all the details of your purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-8 w-8 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Your Partner Gets Their Gift</h3>
                    <p className="text-neutral-700">
                      They'll receive a beautifully designed email with their digital coupon pack and a
                      unique access code to redeem their coupons.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">You'll Be Notified When They Redeem</h3>
                    <p className="text-neutral-700">
                      Each time your partner redeems a coupon, you'll get an instant email notification
                      so you can fulfill their request and create a memorable moment together.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
              <p className="text-neutral-700 mb-6">
                Keep an eye on your email for redemption notifications. Each coupon comes with helpful
                tips to make fulfillment easy and memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/packs">
                  <Button size="lg" variant="outline">
                    Browse More Packs
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg">Return Home</Button>
                </Link>
              </div>
            </div>

            {sessionId && (
              <p className="text-sm text-neutral-400 text-center mt-8">
                Order reference: {sessionId.slice(-12)}
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
