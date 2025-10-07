# Couples Coupons

A digital couples coupon platform built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and Stripe.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (use Neon, Supabase, or local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/couplescoupons"

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Get after setting up webhook

# Email (Resend - get from https://resend.com)
RESEND_API_KEY="re_..."

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Couples Coupons"
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with initial data (3 packs, 60 coupons, FAQs, etc.)
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
/app
  /api                 # API routes
    /checkout          # Stripe checkout creation
    /webhooks/stripe   # Stripe webhook handler
    /redeem            # Coupon redemption
  /packs               # Pack listing and details
  /checkout            # Checkout flow
  /my-pack             # Coupon viewing and redemption
  /redeem              # Access code entry
/components
  /ui                  # Reusable UI components
  /layout              # Navbar, Footer
/lib
  /utils               # Utility functions
  db.ts                # Prisma client
  stripe.ts            # Stripe client
  email.ts             # Email functions
  pdf.ts               # PDF generation
  schemas.ts           # Zod validation schemas
/prisma
  schema.prisma        # Database schema
  seed.ts              # Seed script
```

## 🎯 Features Implemented

### ✅ Core Functionality
- [x] Homepage with hero and pack showcase
- [x] Pack listing page
- [x] Pack detail pages with sample coupons
- [x] Checkout flow with Stripe integration
- [x] Order creation and management
- [x] PDF card generation with QR codes
- [x] Email notifications (order confirmation, gift delivery, redemption)
- [x] Access code system
- [x] Coupon redemption flow
- [x] Real-time coupon status updates

### ✅ Database
- [x] Complete Prisma schema (9 models)
- [x] Seed script with 60 coupons across 3 packs
- [x] Promo code system
- [x] FAQ and blog post models

### ✅ UI/UX
- [x] Responsive design
- [x] Modern, clean interface
- [x] Toast notifications
- [x] Form validation with Zod
- [x] Loading states

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:migrate   # Create migration
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## 🔐 Stripe Webhook Setup

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`

## 📧 Email Setup (Resend)

1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local` as `RESEND_API_KEY`
4. Verify your sending domain (for production)

## 🗄️ Database Options

### Option 1: Neon (Recommended)
1. Sign up at https://neon.tech
2. Create a new project
3. Copy connection string to `DATABASE_URL`

### Option 2: Supabase
1. Sign up at https://supabase.com
2. Create a new project
3. Go to Settings > Database
4. Copy connection string (use connection pooling URL)

### Option 3: Local PostgreSQL
```bash
# Install PostgreSQL
brew install postgresql  # macOS
# Start PostgreSQL
brew services start postgresql
# Create database
createdb couplescoupons
# Update DATABASE_URL in .env.local
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables from `.env.local` to your Vercel project settings.

Don't forget to:
- Switch Stripe keys to production keys
- Update `NEXT_PUBLIC_BASE_URL` to your production domain
- Set up production webhook endpoint in Stripe dashboard

## 📊 Database Schema

- **coupon_packs**: Templates for the 3 main packs
- **coupon_templates**: 20 coupons per pack (60 total)
- **orders**: Purchase records with buyer/receiver info
- **user_coupons**: Redeemable coupon instances
- **promo_codes**: Discount codes
- **subscribers**: Newsletter signups
- **faqs**: FAQ content
- **blog_posts**: Blog articles
- **currency_mappings**: Multi-currency support

## 🎨 Design Tokens

```css
Primary: #D64933
Peach: #FFE5E0
Neutral: #1A1A1A to #FAFAFA
```

## 📝 License

MIT

## 🤝 Support

For support, email support@couplescoupons.com
