# 🚀 Couples Coupons - Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon, Supabase, or local)
- Stripe account (test mode)
- Resend account (for emails)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

#### Option A: Use Neon (Easiest)

1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy your connection string
4. Create `.env.local` in root:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/couplescoupons?sslmode=require"
```

#### Option B: Local PostgreSQL

```bash
# Create database
createdb couplescoupons

# Add to .env.local
DATABASE_URL="postgresql://localhost:5432/couplescoupons"
```

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create tables
npx prisma db push

# Seed with data (3 packs, 60 coupons, FAQs)
npm run db:seed
```

You should see:
```
✅ Created currency mappings
✅ Created Romance Pack with 20 coupons
✅ Created Acts of Service Pack with 20 coupons
✅ Created Making Memories Pack with 20 coupons
✅ Created promo codes
✅ Created FAQs
✅ Created sample blog posts
🎉 Database seed completed successfully!
```

### 4. Set Up Stripe

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your test keys
3. Add to `.env.local`:

```env
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 5. Set Up Stripe Webhook (Important!)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# Or download from https://stripe.com/docs/stripe-cli

# Login
stripe login

# Start webhook forwarding
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook secret (`whsec_...`) to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Keep this terminal running while developing!**

### 6. Set Up Email (Resend)

1. Go to https://resend.com and sign up
2. Get your API key
3. Add to `.env.local`:

```env
RESEND_API_KEY="re_..."
```

### 7. Complete .env.local

Your final `.env.local` should look like:

```env
# Database
DATABASE_URL="postgresql://..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Couples Coupons"
```

### 8. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 🧪 Testing the Application

### Test Flow

1. **Browse Packs**
   - Go to http://localhost:3000
   - Click "Browse Packs"
   - Select "Romance Pack"

2. **Purchase Flow**
   - Click "Buy now"
   - Fill in checkout form:
     - Your Name: John Doe
     - Your Email: john@example.com
     - Partner's Name: Jane
     - Message: "I love you!"
     - Promo Code: LAUNCH10 (for 10% off)
   - Click "Continue to Payment"

3. **Stripe Test Payment**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Complete payment

4. **Webhook Processing**
   - Check Stripe CLI terminal for webhook events
   - Order should be created with status "paid"
   - 20 user coupons should be created
   - Emails should be "sent" (check console logs)

5. **Redeem Coupons**
   - Note the access code from the order (check database or console)
   - Go to http://localhost:3000/redeem
   - Enter access code (e.g., "ABC123")
   - View all 20 coupons
   - Click "Redeem" on a coupon
   - Check that gifter receives notification email

### Using Prisma Studio

To view your data:

```bash
npm run db:studio
```

Opens at http://localhost:5555

### Test Promo Codes

Pre-seeded promo codes:
- `LAUNCH10` - 10% off
- `WELCOME5` - $5 off
- `LOVE20` - 20% off (inactive)

## 🐛 Troubleshooting

### "Failed to create checkout session"
- Check Stripe keys are correct
- Ensure pack exists in database

### "Webhook signature verification failed"
- Ensure Stripe CLI is running
- Check STRIPE_WEBHOOK_SECRET matches CLI output

### "Failed to send email"
- Check RESEND_API_KEY is correct
- For development, emails are logged to console

### "Prisma Client not generated"
```bash
npx prisma generate
```

### Database connection issues
- Check DATABASE_URL is correct
- For Neon, ensure `?sslmode=require` is appended
- For local PostgreSQL, ensure service is running

## 📦 What's Included

After setup, you have:

- **3 Coupon Packs**:
  - Romance (20 coupons)
  - Acts of Service (20 coupons)
  - Making Memories (20 coupons)

- **Promo Codes**:
  - LAUNCH10 (10% off)
  - WELCOME5 ($5 off)

- **8 FAQs** pre-populated
- **3 Sample Blog Posts**
- **4 Currency Mappings** (AUD, USD, EUR, GBP)

## 🚀 Next Steps

1. Customize coupon content in `prisma/seed.ts`
2. Update branding/colors in `tailwind.config.ts`
3. Add your own pack icons
4. Create more pages (About, How It Works, FAQ)
5. Deploy to Vercel

## 📝 Production Checklist

Before going live:

- [ ] Switch to Stripe production keys
- [ ] Set up production webhook in Stripe dashboard
- [ ] Configure Resend with verified domain
- [ ] Update NEXT_PUBLIC_BASE_URL to production domain
- [ ] Set up production database
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Seed production data
- [ ] Test full purchase flow
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics

## 🆘 Need Help?

Check:
- README.md for project overview
- IMPLEMENTATION_PLAN.md for detailed architecture
- Prisma Studio to inspect database
- Browser console for errors
- Stripe dashboard for payment logs

Happy coding! 🎉
