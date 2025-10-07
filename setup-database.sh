#!/bin/bash

# Couples Coupons - Database Setup Script
# Run this if the automated setup fails

echo "🚀 Setting up Couples Coupons database..."
echo ""

# Step 1: Generate Prisma Client
echo "📦 Step 1: Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client generated"
echo ""

# Step 2: Push schema to database
echo "🗄️  Step 2: Creating tables in Supabase..."
npx prisma db push --accept-data-loss
echo "✅ Tables created with cc_ prefix"
echo ""

# Step 3: Seed database
echo "🌱 Step 3: Seeding database with initial data..."
npm run db:seed
echo "✅ Database seeded with 60 coupons!"
echo ""

echo "🎉 Database setup complete!"
echo ""
echo "Tables created:"
echo "  - cc_coupon_packs (3 packs)"
echo "  - cc_coupon_templates (60 coupons)"
echo "  - cc_orders"
echo "  - cc_user_coupons"
echo "  - cc_promo_codes"
echo "  - cc_subscribers"
echo "  - cc_faqs"
echo "  - cc_blog_posts"
echo "  - cc_currency_mappings"
echo ""
echo "Next steps:"
echo "  1. Update .env.local with your Stripe keys"
echo "  2. Run: npm run dev"
echo "  3. Visit: http://localhost:3000"
