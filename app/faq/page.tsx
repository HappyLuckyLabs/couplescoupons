import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "FAQ | Couples Coupons",
  description: "Frequently asked questions about Couples Coupons, our digital coupon packs, and how they work.",
};

// Disable static generation to avoid build-time database access
export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-peach-50 to-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-neutral-600">
              Everything you need to know about Couples Coupons
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
                  <h2 className="text-2xl font-bold mb-4 text-neutral-900">
                    {faq.question}
                  </h2>
                  <div className="text-lg text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-16 text-center bg-primary-50 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-neutral-700 mb-6">
                We're here to help! Reach out to our support team.
              </p>
              <a
                href="mailto:support@couplescoupons.com"
                className="text-primary-500 hover:text-primary-600 font-semibold text-lg"
              >
                support@couplescoupons.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
