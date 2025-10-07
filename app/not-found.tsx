import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 to-white px-6">
      <div className="text-center max-w-md">
        <Heart className="h-16 w-16 text-primary-500 fill-primary-500 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-neutral-600 mb-8">
          Oops! The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="/packs">
            <Button size="lg" variant="outline">Browse Packs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
