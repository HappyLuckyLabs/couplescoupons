"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas";
import { toast } from "sonner";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          packId: params.packId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Checkout failed");
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <Input {...register("buyerName")} placeholder="John Doe" />
                {errors.buyerName && (
                  <p className="text-sm text-red-500 mt-1">{errors.buyerName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <Input {...register("buyerEmail")} type="email" placeholder="john@example.com" />
                {errors.buyerEmail && (
                  <p className="text-sm text-red-500 mt-1">{errors.buyerEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Partner's Name</label>
                <Input {...register("receiverName")} placeholder="Jane Doe" />
                {errors.receiverName && (
                  <p className="text-sm text-red-500 mt-1">{errors.receiverName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  {...register("customMessage")}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder="Write a sweet message to your partner..."
                />
                {errors.customMessage && (
                  <p className="text-sm text-red-500 mt-1">{errors.customMessage.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Promo Code (Optional)
                </label>
                <Input {...register("promoCode")} placeholder="LAUNCH10" />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
