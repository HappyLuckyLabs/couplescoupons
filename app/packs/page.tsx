import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { db } from "@/lib/supabase";

// Disable static generation to avoid build-time database access
export const dynamic = 'force-dynamic';

export default async function PacksPage() {
  const packs = await db.couponPack.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-br from-peach-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Choose Your Pack</h1>
              <p className="text-xl text-neutral-600">
                Each pack contains 20 thoughtfully curated coupons designed by relationship experts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packs.map((pack: { id: string; name: string; description: string; slug: string; price: number; whatsIncluded: string[]; tagline: string; priceAud: number }) => (
                <Card key={pack.id} className="group hover:shadow-2xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-peach-100 to-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Heart className="h-10 w-10 text-primary-500" />
                    </div>
                    <CardTitle className="text-2xl">{pack.name}</CardTitle>
                    <CardDescription className="text-base">{pack.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-6">{pack.description}</p>

                    <div className="mb-6 pb-6 border-b border-neutral-200">
                      <div className="text-4xl font-bold text-primary-500 mb-1">
                        ${pack.priceAud.toString()}
                      </div>
                      <p className="text-sm text-neutral-500">20 digital coupons</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="font-semibold text-sm text-neutral-700">What's included:</p>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        {pack.whatsIncluded.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary-500 mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={`/packs/${pack.slug}`}>
                      <Button className="w-full group-hover:bg-primary-600">
                        View pack
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
