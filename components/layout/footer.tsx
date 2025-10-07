import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary-500 fill-primary-500" />
              <span className="text-xl font-bold">Couples Coupons</span>
            </Link>
            <p className="text-sm text-neutral-600">
              Digital coupons to strengthen your relationship and create lasting memories.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-primary-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-primary-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-neutral-600 hover:text-primary-500">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-600 hover:text-primary-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Packs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/packs/romance" className="text-neutral-600 hover:text-primary-500">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/packs/acts-of-service" className="text-neutral-600 hover:text-primary-500">
                  Acts of Service
                </Link>
              </li>
              <li>
                <Link href="/packs/making-memories" className="text-neutral-600 hover:text-primary-500">
                  Making Memories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-neutral-600 mb-2">support@couplescoupons.com</p>
            <p className="text-sm text-neutral-600">@CouplesCoupons</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-600">
          <p>&copy; {new Date().getFullYear()} Couples Coupons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
