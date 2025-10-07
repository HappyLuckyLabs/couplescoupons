import { Heart } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "About Us | Couples Coupons",
  description: "Learn about our mission to help couples strengthen their relationships through thoughtful gestures.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-br from-peach-50 to-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <Heart className="h-16 w-16 text-primary-500 fill-primary-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6">About Couples Coupons</h1>
              <p className="text-xl text-neutral-600">
                We believe that the little things matter most in a relationship
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-lg leading-relaxed text-neutral-700">
                At Couples Coupons, we believe that the little things matter most in a relationship.
                Whether it's a heartfelt gesture, a fun surprise, or a simple reminder that says,
                "I care," our mission is to bring couples closer together in meaningful and memorable ways.
              </p>

              <p className="text-lg leading-relaxed text-neutral-700">
                Our thoughtfully designed coupons are more than just pieces of paper—they're an
                invitation to create moments that strengthen your bond. From breakfast in bed to
                spontaneous date nights, each coupon is a spark for love, laughter, and connection.
              </p>

              <p className="text-lg leading-relaxed text-neutral-700">
                We started Couples Coupons because we know life gets busy, and sometimes it's easy
                to overlook those small but meaningful acts of love. That's where we come in! Our
                goal is to make it easy for couples to show appreciation and keep the romance alive,
                no matter how hectic life gets.
              </p>

              <div className="bg-primary-50 rounded-2xl p-8 my-12">
                <h2 className="text-3xl font-bold mb-4 text-primary-900">Our Values</h2>
                <ul className="space-y-3 text-lg text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-3">❤️</span>
                    <span>Love is in the details - small gestures create big impacts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-3">🌟</span>
                    <span>Relationships are built on shared moments and experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-3">💕</span>
                    <span>Every couple deserves more reasons to smile together</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg leading-relaxed text-neutral-700">
                Join thousands of couples who've discovered the joy of giving and receiving thoughtful
                gestures. Because when you put love into action, everyone wins.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
