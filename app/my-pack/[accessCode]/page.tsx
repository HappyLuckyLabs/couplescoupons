"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

type UserCoupon = {
  id: string;
  title: string;
  description: string;
  tip: string | null;
  isRedeemed: boolean;
  redeemedAt: string | null;
};

type Order = {
  packName: string;
  receiverName: string;
  buyerName: string;
  customMessage: string | null;
  userCoupons: UserCoupon[];
};

export default function MyPackPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await fetch(`/api/my-pack/${params.accessCode}`);
      if (!response.ok) throw new Error("Failed to load coupons");
      const data = await response.json();
      setOrder(data);
    } catch {
      toast.error("Failed to load your coupons");
    } finally {
      setLoading(false);
    }
  }, [params.accessCode]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleRedeem = async (couponId: string) => {
    try {
      const response = await fetch(`/api/redeem/${couponId}`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to redeem");

      toast.success("Coupon redeemed! The gifter has been notified.");
      fetchOrder(); // Refresh
    } catch {
      toast.error("Failed to redeem coupon");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your coupons...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Coupons not found</p>
      </div>
    );
  }

  const redeemedCount = order.userCoupons.filter((c) => c.isRedeemed).length;
  const totalCount = order.userCoupons.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 bg-gradient-to-br from-peach-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                {order.packName} from {order.buyerName}
              </h1>
              {order.customMessage && (
                <p className="text-lg text-neutral-600 italic mb-4">"{order.customMessage}"</p>
              )}
              <p className="text-neutral-600">
                Redeemed: {redeemedCount}/{totalCount} coupons
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.userCoupons.map((coupon) => (
                <Card
                  key={coupon.id}
                  className={`${
                    coupon.isRedeemed ? "opacity-60 border-neutral-300" : "border-primary-200"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-full bg-peach-100 flex items-center justify-center">
                        <Heart className="h-8 w-8 text-primary-500" />
                      </div>
                      {coupon.isRedeemed && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{coupon.title}</h3>
                    <p className="text-neutral-600 text-sm mb-4">{coupon.description}</p>

                    {coupon.tip && !coupon.isRedeemed && (
                      <div className="bg-peach-50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-neutral-700">
                          <strong>Tip:</strong> {coupon.tip}
                        </p>
                      </div>
                    )}

                    {coupon.isRedeemed ? (
                      <div className="text-center py-2">
                        <p className="text-sm text-neutral-500">
                          Redeemed{" "}
                          {new Date(coupon.redeemedAt!).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleRedeem(coupon.id)}
                        className="w-full"
                      >
                        Redeem
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
