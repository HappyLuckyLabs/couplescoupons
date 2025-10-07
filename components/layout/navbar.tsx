import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-500 fill-primary-500" />
            <span className="text-2xl font-bold text-neutral-900">Couples Coupons</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/packs" className="text-neutral-700 hover:text-primary-500 transition-colors">
              Coupon Packs
            </Link>
            <Link href="/how-it-works" className="text-neutral-700 hover:text-primary-500 transition-colors">
              How It Works
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-500 transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-neutral-700 hover:text-primary-500 transition-colors">
              FAQ
            </Link>
          </div>

          <Link href="/packs">
            <Button size="lg">Browse Packs</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
