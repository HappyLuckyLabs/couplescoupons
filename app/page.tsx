import Link from "next/link";
import { Heart, Gift, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { db } from "@/lib/supabase";

// Disable static generation to avoid build-time database access
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const packs = await db.couponPack.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
    take: 3,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-peach-50 via-white to-primary-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Romantic gestures and{" "}
                <span className="text-primary-500">acts of service</span> for your loved one
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Digital coupons are ready-to-use vouchers to share with your partner, to show
                your love and strengthen your relationship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/packs">
                  <Button size="xl" className="group">
                    Browse Packs
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="xl" variant="outline">
                    How it works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-32 w-32 text-primary-500 fill-primary-100 mx-auto mb-4" />
                <p className="text-neutral-600">❤️ Loved by 10,000+ couples</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-neutral-600">Three simple steps to create memorable moments together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-primary-500 transition-colors">
              <Gift className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">You gift it</h3>
              <p className="text-neutral-600">
                Pick the perfect pack and send via email or PDF card
              </p>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-primary-500 transition-colors">
              <Sparkles className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">They redeem it</h3>
              <p className="text-neutral-600">
                Your partner redeems online using their unique access code
              </p>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-primary-500 transition-colors">
              <Heart className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">You fulfill it</h3>
              <p className="text-neutral-600">
                Get notified and turn their chosen coupon into reality
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Packs */}
      <section className="py-20 bg-gradient-to-b from-white to-peach-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Specially curated digital coupon packs</h2>
            <p className="text-xl text-neutral-600">
              Each pack contains 20 unique coupons designed to show your love
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack: { id: string; name: string; description: string; slug: string; price: number }) => (
              <Card key={pack.id} className="group hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-peach-100 to-primary-100 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle>{pack.name}</CardTitle>
                  <p className="text-neutral-600">{pack.tagline}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-primary-500">AUD${pack.priceAud.toString()}</div>
                    <p className="text-sm text-neutral-500">20 coupons included</p>
                  </div>
                  <Link href={`/packs/${pack.slug}`}>
                    <Button className="w-full group-hover:bg-primary-600">
                      View pack
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to strengthen your bond?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of couples who've discovered the joy of thoughtful gestures with
            Couples Coupons.
          </p>
          <Link href="/packs">
            <Button size="xl" variant="outline" className="bg-white text-primary-600 hover:bg-neutral-50">
              Browse all packs
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
