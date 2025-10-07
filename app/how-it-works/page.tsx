import { Gift, Heart, Bell } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "How It Works | Couples Coupons",
  description: "Learn how easy it is to gift thoughtful moments with Couples Coupons in just three simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-peach-50 to-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1 className="text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-neutral-600">
              Gift thoughtful moments in three simple steps
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <Gift className="h-10 w-10 text-primary-500" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-primary-500 font-semibold mb-2">Step 1</div>
                  <h2 className="text-3xl font-bold mb-4">You Gift It</h2>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    Choose from our thoughtfully curated packs of 20 coupons—whether it's Romance,
                    Acts of Service, or Making Memories. Personalize your gift with a heartfelt message
                    and complete your purchase. We'll deliver a beautiful digital card with a unique
                    access code directly to your partner's email.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="w-px h-12 bg-neutral-200"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 order-1 md:order-2">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-primary-500 fill-primary-500" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-right order-2 md:order-1">
                  <div className="text-primary-500 font-semibold mb-2">Step 2</div>
                  <h2 className="text-3xl font-bold mb-4">They Redeem It</h2>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    Your partner receives their digital pack and can browse all 20 coupons at their leisure.
                    When they're ready to cash in on a special moment—whether it's a massage, a date night,
                    or breakfast in bed—they simply click "Redeem" on the coupon of their choice.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="w-px h-12 bg-neutral-200"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <Bell className="h-10 w-10 text-primary-500" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-primary-500 font-semibold mb-2">Step 3</div>
                  <h2 className="text-3xl font-bold mb-4">You Fulfill It</h2>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    You'll receive an instant email notification when your partner redeems a coupon.
                    Now it's your turn to make it happen! Follow through on the gesture and create a
                    memorable moment together. Each coupon comes with helpful tips to make fulfillment easy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Couples Love It</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">No Commitment Pressure</h3>
                <p className="text-neutral-700">
                  Unlike physical coupons that can get lost or forgotten, digital coupons are always
                  accessible. Redeem them whenever the moment feels right.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Instant Notifications</h3>
                <p className="text-neutral-700">
                  Know immediately when your partner redeems a coupon, so you can plan and follow
                  through without any awkward reminders.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Thoughtfully Curated</h3>
                <p className="text-neutral-700">
                  Each pack contains 20 carefully selected gestures designed to strengthen your bond
                  and create meaningful moments together.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Easy to Gift</h3>
                <p className="text-neutral-700">
                  Perfect for anniversaries, birthdays, or just because. Purchase takes less than 2
                  minutes, and delivery is instant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Create Memorable Moments?
            </h2>
            <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
              Browse our curated packs and start strengthening your relationship today.
            </p>
            <Link href="/packs">
              <Button size="xl" variant="outline" className="bg-white text-primary-600 hover:bg-neutral-50">
                Browse All Packs
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
