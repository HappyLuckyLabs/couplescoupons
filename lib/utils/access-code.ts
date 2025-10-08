import { db } from "@/lib/supabase";

// Generate a unique 6-character access code
// Excludes confusing characters: 0, O, I, 1
const ALLOWED_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export async function generateAccessCode(): Promise<string> {
  let code = "";
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    // Generate 6-character code
    code = "";
    for (let i = 0; i < 6; i++) {
      code += ALLOWED_CHARS.charAt(Math.floor(Math.random() * ALLOWED_CHARS.length));
    }

    // Check if code already exists
    const existing = await db.order.findUnique({
      where: { accessCode: code },
    });

    if (!existing) {
      isUnique = true;
    }

    attempts++;
  }

  if (!isUnique) {
    throw new Error("Failed to generate unique access code");
  }

  return code;
}

export function generateOrderNumber(): string {
  // Format: timestamp + random
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `${timestamp}x${random}`;
}
