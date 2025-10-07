"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 to-white px-6">
      <div className="text-center max-w-md">
        <AlertCircle className="h-16 w-16 text-primary-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Something Went Wrong</h1>
        <p className="text-lg text-neutral-600 mb-8">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={reset}>
            Try Again
          </Button>
          <Button size="lg" variant="outline" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
        </div>
        {error.digest && (
          <p className="text-sm text-neutral-400 mt-8">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
