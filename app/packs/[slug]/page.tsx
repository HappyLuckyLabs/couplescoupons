import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/db";

export async function generateStaticParams() {
  const packs = await prisma.couponPack.findMany({
    select: { slug: true },
  });

  return packs.map((pack) => ({
    slug: pack.slug,
  }));
}

export default async function PackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pack = await prisma.couponPack.findUnique({
    where: { slug },
    include: {
      coupons: {
        orderBy: { displayOrder: "asc" },
        take: 6, // Show first 6 as preview
      },
    },
  });

  if (!pack) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-peach-50 to-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-peach-100 to-primary-100 flex items-center justify-center mb-6">
                  <Heart className="h-12 w-12 text-primary-500" />
                </div>
                <h1 className="text-5xl font-bold mb-4">{pack.name}</h1>
                <p className="text-2xl text-primary-500 mb-6">{pack.tagline}</p>
                <p className="text-lg text-neutral-600 mb-8">{pack.description}</p>

                <div className="flex items-baseline gap-3 mb-8">
                  <div className="text-5xl font-bold text-primary-500">
                    ${pack.priceAud.toString()}
                  </div>
                  <div className="text-neutral-600">AUD</div>
                </div>

                <Link href={`/checkout/${pack.id}`}>
                  <Button size="xl" className="group">
                    Buy now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">What's included</h3>
                <ul className="space-y-3">
                  {pack.whatsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Sample Coupons */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Sample Coupons</h2>
              <p className="text-neutral-600">Here's a preview of what's inside this pack</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pack.coupons.map((coupon) => (
                <Card key={coupon.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-peach-100 flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{coupon.title}</h3>
                    <p className="text-neutral-600 text-sm">{coupon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-neutral-600 mb-4">...and {20 - pack.coupons.length} more coupons!</p>
              <Link href={`/checkout/${pack.id}`}>
                <Button size="lg">
                  Get this pack
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
