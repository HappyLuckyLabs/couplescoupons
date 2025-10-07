# Couples Coupons - Complete Implementation Plan

## Executive Summary

This is a comprehensive, detailed implementation plan for migrating Couples Coupons from Bubble.io to a modern Next.js 14 application. This plan is designed for a thorough, "one-shot" approach with extreme attention to detail in planning and preparation.

**Project Goal**: Build a production-ready, scalable digital coupon platform with superior UX, performance, and maintainability.

**Timeline**: 6-8 weeks for MVP + Enhanced Features
**Tech Stack**: Next.js 14 + TypeScript + Tailwind + Prisma + PostgreSQL + Stripe + Resend

---

## Architecture Validation & Key Decisions

### ✅ Confirmed Technical Stack

**Frontend**
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v3
- UI Components: shadcn/ui (Radix UI primitives)
- Forms: React Hook Form + Zod validation
- Animations: Framer Motion (lazy loaded)
- Icons: Lucide React

**Backend**
- Runtime: Node.js (Vercel Edge Runtime where applicable)
- API: Next.js API Routes (Route Handlers)
- ORM: Prisma (with PostgreSQL)
- Validation: Zod schemas

**Database**
- Primary: PostgreSQL (Neon or Supabase)
- Caching: Vercel KV (Redis) for session data
- File Storage: Vercel Blob or Cloudinary for PDFs/images

**Third-Party Services**
- Payments: Stripe Checkout + Webhooks
- Email: Resend (react-email templates)
- PDF Generation: @react-pdf/renderer
- QR Codes: qrcode library
- Analytics: Vercel Analytics + Google Analytics 4
- Error Tracking: Sentry (optional)

**Hosting & Deployment**
- Platform: Vercel
- Domain: couplescoupons.com
- CI/CD: GitHub Actions → Vercel
- Environments: dev, staging, production

---

## Phase 1: MVP Core (Week 1-2)

**Goal**: Functional purchase-to-redemption flow with basic UX

### 1.1 Project Setup & Foundation

**Tasks:**
- [ ] Initialize Next.js 14 project with TypeScript + Tailwind
- [ ] Configure ESLint, Prettier, and VS Code settings
- [ ] Set up Git repository with .gitignore
- [ ] Install core dependencies:
  ```bash
  npm install prisma @prisma/client
  npm install @stripe/stripe-js stripe
  npm install react-hook-form @hookform/resolvers zod
  npm install @react-pdf/renderer qrcode
  npm install resend react-email
  npm install lucide-react
  npm install framer-motion
  ```
- [ ] Install dev dependencies:
  ```bash
  npm install -D @types/node @types/react
  npm install -D prisma
  npm install -D tailwindcss-animate class-variance-authority clsx tailwind-merge
  ```
- [ ] Set up environment variables structure (.env.example)
- [ ] Configure Tailwind with custom theme colors
- [ ] Set up shadcn/ui CLI and install base components

**Deliverables:**
- Clean project structure
- TypeScript config with strict mode
- Tailwind configured with design tokens
- README with setup instructions

---

### 1.2 Database Schema & Prisma Setup

**Tasks:**
- [ ] Set up PostgreSQL database (Neon or Supabase)
- [ ] Create complete Prisma schema (from PRD Section 5)
- [ ] Add all enums: `OrderStatus`, `PromoType`
- [ ] Configure indexes for performance
- [ ] Create initial migration: `npx prisma migrate dev --name init`
- [ ] Generate Prisma Client
- [ ] Create `/lib/db.ts` singleton client
- [ ] Test database connection

**Schema Tables:**
1. `coupon_packs` - 3 main packs (Romance, Acts of Service, Making Memories)
2. `coupon_templates` - 20 coupons per pack (60 total templates)
3. `orders` - Purchase records with buyer/receiver info
4. `user_coupons` - Redeemable coupon instances
5. `promo_codes` - Discount codes
6. `subscribers` - Newsletter emails
7. `faqs` - FAQ content
8. `blog_posts` - Blog articles (optional for MVP)
9. `currency_mappings` - Multi-currency support

**Deliverables:**
- Complete Prisma schema file
- Database migrations
- Seed script with initial data

---

### 1.3 Database Seeding with Initial Data

**Tasks:**
- [ ] Create `/prisma/seed.ts` script
- [ ] Seed 3 coupon packs with metadata:
  - Romance Pack (slug: `romance`)
  - Acts of Service Pack (slug: `acts-of-service`)
  - Making Memories Pack (slug: `making-memories`)
- [ ] Seed 20 coupon templates per pack (60 total)
- [ ] Add sample FAQs
- [ ] Add currency mappings (AUD, USD, EUR, GBP)
- [ ] Add test promo code: `LAUNCH10` (10% off)
- [ ] Run seed: `npx prisma db seed`

**Coupon Data Sources:**
- Romance Pack: PRD Section 10 (15 defined + 5 more)
- Acts of Service: PRD Section 10 (3 defined + 17 more)
- Making Memories: PRD Section 10 (20 new coupons)

**Deliverables:**
- Populated database with real content
- Test data for development

---

### 1.4 Design System & UI Components

**Tasks:**
- [ ] Set up Tailwind custom theme in `tailwind.config.ts`:
  ```js
  colors: {
    primary: { 500: '#D64933', ... },
    peach: '#FFE5E0',
    neutral: { ... }
  }
  ```
- [ ] Install shadcn/ui components:
  - Button
  - Card
  - Input
  - Label
  - Select
  - Textarea
  - Accordion
  - Dialog (Modal)
  - Toast/Sonner
- [ ] Create custom components:
  - `/components/ui/coupon-card.tsx`
  - `/components/ui/pack-card.tsx`
  - `/components/layout/navbar.tsx`
  - `/components/layout/footer.tsx`
  - `/components/layout/container.tsx`
- [ ] Create motion wrapper components for animations
- [ ] Build reusable form components with React Hook Form

**Design Tokens:**
```css
--primary: #D64933;
--primary-hover: #B83E2A;
--background: #FFE5E0;
--card: #FFFFFF;
--text: #1A1A1A;
--text-muted: #6B6B6B;
```

**Deliverables:**
- Complete design system
- Reusable UI component library
- Consistent visual language

---

### 1.5 Homepage & Marketing Pages

**Tasks:**
- [ ] Create `/app/page.tsx` (Homepage)
  - Hero section with value proposition
  - Floating coupon cards animation (Framer Motion)
  - "How It Works" bento grid section
  - Pack showcase cards (3 packs)
  - Social proof placeholder
  - CTA section
  - Newsletter signup in footer
- [ ] Create `/app/about/page.tsx`
  - Mission statement
  - Brand story (PRD Section 19)
  - Illustrated design
- [ ] Create `/app/how-it-works/page.tsx`
  - 3-step process visualization
  - "You gift it" → "They redeem it" → "You fulfill it"
- [ ] Create `/app/faq/page.tsx`
  - Accordion FAQ list from database
  - Dynamic data fetch with Prisma
- [ ] Create navigation menu with dropdowns
- [ ] Create footer with links and newsletter form
- [ ] Implement responsive mobile layouts
- [ ] Add SEO metadata for all pages

**Deliverables:**
- Complete marketing site
- Mobile-responsive designs
- SEO-optimized pages

---

### 1.6 Pack Listing & Detail Pages

**Tasks:**
- [ ] Create `/app/packs/page.tsx` (Pack Listing)
  - Fetch all active packs from database
  - Display pack cards with:
    - Icon
    - Name & tagline
    - Price (AUD$25)
    - "View pack" button
  - Show seasonal packs if active
- [ ] Create `/app/packs/[slug]/page.tsx` (Pack Detail)
  - Dynamic route for each pack
  - Display pack information:
    - Hero section with pack icon
    - Description
    - "What's included" list
    - Price with currency
    - "Buy now" CTA (prominent)
  - Show 6 sample coupons in grid
  - Add "View all 20 coupons" modal/expansion
- [ ] Create coupon preview modal component
- [ ] Handle 404 for invalid pack slugs
- [ ] Add structured data for SEO (JSON-LD)

**Deliverables:**
- Pack browsing experience
- Detailed pack information pages
- Sample coupon previews

---

### 1.7 Stripe Checkout Integration

**Tasks:**
- [ ] Set up Stripe account and get API keys
- [ ] Create Stripe products for each pack:
  - Romance Pack: AUD$25
  - Acts of Service Pack: AUD$25
  - Making Memories Pack: AUD$25
- [ ] Create `/app/checkout/[packId]/page.tsx`
  - Pre-checkout form:
    - Buyer name (required)
    - Buyer email (required)
    - Receiver name (required)
    - Personal message (textarea, optional)
    - Promo code field (optional)
  - Form validation with Zod
  - Show pack summary and price
  - Apply promo code discounts
- [ ] Create `/app/api/checkout/route.ts`
  - Create pending order in database
  - Generate unique access code (6 chars)
  - Create Stripe Checkout Session
  - Return session URL
- [ ] Redirect to Stripe Checkout
- [ ] Create success page: `/app/checkout/success/page.tsx`
  - Thank you message
  - Order confirmation
  - Next steps

**Stripe Checkout Session Config:**
```ts
{
  mode: 'payment',
  line_items: [{ price: priceId, quantity: 1 }],
  customer_email: buyerEmail,
  metadata: {
    orderId: order.id,
    packId: pack.id,
    receiverName: receiverName
  },
  success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/packs/${packSlug}`
}
```

**Deliverables:**
- Working Stripe checkout flow
- Order creation in database
- Payment success handling

---

### 1.8 Stripe Webhook Handler

**Tasks:**
- [ ] Create `/app/api/webhooks/stripe/route.ts`
- [ ] Configure webhook signing secret
- [ ] Handle `checkout.session.completed` event:
  1. Verify webhook signature
  2. Update order status to 'paid'
  3. Create 20 `user_coupons` from pack templates
  4. Generate access code and URL
  5. Generate QR code image
  6. Generate PDF card
  7. Send order confirmation email to buyer
  8. Send gift delivery email to receiver
  9. Update order with PDF URL and timestamps
- [ ] Handle `checkout.session.expired` event
- [ ] Handle `payment_intent.payment_failed` event
- [ ] Add error handling and logging
- [ ] Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

**Deliverables:**
- Webhook handler for payment completion
- Automated post-purchase workflow

---

### 1.9 PDF Card Generation

**Tasks:**
- [ ] Create `/lib/pdf.ts` utility
- [ ] Install `@react-pdf/renderer`
- [ ] Design PDF card template (PRD reference):
  - "Let's make memories" header
  - Personalized message from buyer
  - QR code (2x2 inches)
  - Access code (e.g., "DOC7NN")
  - Branded footer with logo
  - Elegant layout matching brand
- [ ] Generate QR code pointing to: `https://couplescoupons.com/redeem?code=ABC123`
- [ ] Convert PDF to buffer
- [ ] Upload to Vercel Blob or Cloudinary
- [ ] Return public URL
- [ ] Test PDF generation locally

**Deliverables:**
- PDF generation utility
- Beautiful, printable gift cards
- Cloud storage integration

---

### 1.10 Email System with Resend

**Tasks:**
- [ ] Set up Resend account and get API key
- [ ] Create email templates with `react-email`:
  - `/emails/order-confirmation.tsx` (to buyer)
  - `/emails/gift-delivery.tsx` (to receiver)
  - `/emails/redemption-notification.tsx` (to gifter)
  - `/emails/newsletter-welcome.tsx`
- [ ] Create `/lib/email.ts` utility with functions:
  - `sendOrderConfirmation(order)`
  - `sendGiftDelivery(order)`
  - `sendRedemptionNotification(userCoupon, order)`
- [ ] Add personalization tokens
- [ ] Include PDF as attachment in gift delivery email
- [ ] Test emails with Resend test mode

**Email Content (PRD Section 12):**
1. **Gift Delivery Email**
   - Subject: "[Name] sent you Couples Coupons! ❤️"
   - Personalized message from buyer
   - Access link + access code
   - PDF attachment
   - Preview of pack

2. **Order Confirmation**
   - Subject: "Your Couples Coupons order is confirmed!"
   - Order details
   - Copy of PDF
   - Tips for presenting the gift

3. **Redemption Notification**
   - Subject: "[Partner] redeemed: [Coupon Name]! 💕"
   - Coupon details
   - Tips for fulfilling
   - Remaining coupon count

**Deliverables:**
- Professional email templates
- Email sending utility
- Tested email delivery

---

### 1.11 Redemption Flow

**Tasks:**
- [ ] Create `/app/redeem/page.tsx`
  - Access code input form
  - Validate code format (6 characters)
  - Friendly error messages
  - Loading states
- [ ] Create `/app/api/redeem/validate/route.ts`
  - Look up order by access code
  - Return order + user_coupons
  - Handle invalid codes gracefully
- [ ] Create `/app/my-pack/[accessCode]/page.tsx`
  - Display all 20 coupons in grid
  - Show pack name and receiver name
  - Show redemption stats: "X/20 redeemed"
  - Coupon cards with:
    - Icon
    - Title
    - Description
    - "Redeem" button (primary CTA)
    - Grayed out if already redeemed
- [ ] Create redemption confirmation modal:
  - "Are you sure you want to redeem this coupon?"
  - Coupon title and description preview
  - "Yes, Redeem" / "Cancel" buttons
- [ ] Create `/app/api/redeem/[couponId]/route.ts`
  - Mark user_coupon as redeemed
  - Set redeemed_at timestamp
  - Send redemption notification email to gifter
  - Return success response
- [ ] Update UI after redemption:
  - Button → "Redeemed ✓" (disabled)
  - Show redemption date
  - Show fulfillment tips (expandable)

**Deliverables:**
- Complete redemption flow
- Confirmation modal to prevent accidents
- Email notifications to gifter

---

### 1.12 Access Code Generation & Security

**Tasks:**
- [ ] Create `/lib/utils/access-code.ts`
- [ ] Implement code generation:
  ```ts
  function generateAccessCode(): string {
    // 6 characters: uppercase letters + numbers
    // Exclude: 0, O, I, 1 (confusing characters)
    // Check against profanity list
    // Ensure uniqueness in database
  }
  ```
- [ ] Add uniqueness check with retry logic
- [ ] Implement rate limiting on redemption API
- [ ] Add CSRF protection (Next.js built-in)
- [ ] Validate access codes on every request

**Security Measures:**
- Access codes are single-use (tied to one order)
- Rate limit: 10 requests/minute per IP on redemption
- No authentication required (simplicity)
- Session tracking to prevent abuse

**Deliverables:**
- Secure access code system
- Rate limiting middleware
- Validation utilities

---

### 1.13 Promo Code System

**Tasks:**
- [ ] Create promo code validation logic in checkout API
- [ ] Implement discount calculations:
  - Percentage off: `finalAmount = price * (1 - discount / 100)`
  - Fixed amount: `finalAmount = price - discount`
- [ ] Validate promo code:
  - Code exists and is active
  - Not expired (check valid_from and valid_until)
  - Usage limit not exceeded
- [ ] Increment `times_used` on successful order
- [ ] Show discount in checkout summary
- [ ] Pass promo code to Stripe metadata

**Test Promo Codes:**
- `LAUNCH10`: 10% off
- `WELCOME5`: $5 off
- `FREESHIP`: (future: free shipping)

**Deliverables:**
- Working promo code system
- Discount calculations
- Usage tracking

---

### 1.14 Error Handling & Loading States

**Tasks:**
- [ ] Create error boundary component: `/components/error-boundary.tsx`
- [ ] Add error pages:
  - `/app/error.tsx` (general errors)
  - `/app/not-found.tsx` (404 page)
  - `/app/global-error.tsx` (root error)
- [ ] Implement loading states:
  - `/app/loading.tsx` (global loading)
  - Skeleton components for data fetching
  - Button loading states (spinner icons)
- [ ] Add toast notifications with Sonner:
  - Success messages
  - Error messages
  - Info messages
- [ ] Implement client-side error logging (Sentry optional)
- [ ] Add proper HTTP status codes in API routes

**Deliverables:**
- Graceful error handling
- User-friendly error messages
- Loading indicators

---

### 1.15 MVP Testing & Quality Assurance

**Tasks:**
- [ ] **Manual Testing Checklist:**
  - [ ] Browse packs from homepage
  - [ ] View pack details
  - [ ] Complete checkout with test card
  - [ ] Verify webhook triggers
  - [ ] Receive order confirmation email
  - [ ] Receive gift delivery email
  - [ ] Access pack with code
  - [ ] Redeem a coupon
  - [ ] Verify gifter receives notification
  - [ ] Test promo code application
  - [ ] Test invalid access code
  - [ ] Test mobile responsiveness
  - [ ] Test all form validations
  - [ ] Test navigation across site
- [ ] **Stripe Testing:**
  - [ ] Test successful payment: `4242 4242 4242 4242`
  - [ ] Test declined card: `4000 0000 0000 0002`
  - [ ] Test expired session handling
- [ ] **Email Testing:**
  - [ ] Verify all emails render correctly
  - [ ] Test links in emails
  - [ ] Test PDF attachment delivery
- [ ] **Performance Testing:**
  - [ ] Check page load times (<2s)
  - [ ] Verify images are optimized
  - [ ] Test with slow 3G network
- [ ] **Database Testing:**
  - [ ] Verify all relationships work
  - [ ] Check data integrity after orders
  - [ ] Test with multiple concurrent orders

**Deliverables:**
- Fully tested MVP
- Bug-free core flows
- Performance validation

---

## Phase 2: Enhanced Features (Week 3-4)

**Goal**: Content pages, improved UX, newsletter, seasonal packs

### 2.1 Blog System (Optional but Recommended)

**Tasks:**
- [ ] Create `/app/blog/page.tsx`
  - List all published blog posts
  - Show featured image, title, excerpt
  - Sort by published date
  - Pagination (10 posts per page)
- [ ] Create `/app/blog/[slug]/page.tsx`
  - Dynamic blog post page
  - Render markdown/rich text content
  - Show author, date, reading time
  - Social share buttons
- [ ] Create admin seed script for sample posts
- [ ] Add SEO metadata for blog posts
- [ ] Implement blog post views counter

**Sample Blog Topics (PRD Section 14):**
1. "101 Acts of Service for Your Partner"
2. "How to Keep Romance Alive in Long-Term Relationships"
3. "The 5 Love Languages: Which One is Yours?"
4. "Creative Date Night Ideas for Couples"

**Deliverables:**
- Functional blog system
- Sample content
- SEO-optimized blog pages

---

### 2.2 Newsletter Signup & Integration

**Tasks:**
- [ ] Create newsletter signup form component
- [ ] Add to footer on all pages
- [ ] Create `/app/api/newsletter/subscribe/route.ts`
  - Validate email with Zod
  - Check if already subscribed
  - Save to `subscribers` table
  - Send welcome email
  - Return success response
- [ ] Integrate with Mailchimp or ConvertKit (optional)
- [ ] Create `/emails/newsletter-welcome.tsx`
- [ ] Add unsubscribe link in emails
- [ ] Create `/app/newsletter/unsubscribe/page.tsx`

**Form Fields:**
- Email (required)
- Checkbox: "I agree to receive relationship tips and special offers"

**Deliverables:**
- Working newsletter signup
- Welcome email automation
- Unsubscribe functionality

---

### 2.3 Seasonal Packs System

**Tasks:**
- [ ] Add `is_seasonal` flag to packs table
- [ ] Create seasonal pack: "Mother's Day Pack"
  - Special pricing: AUD$20
  - Limited time messaging
  - Different coupon selection
- [ ] Add date range for seasonal availability
- [ ] Show seasonal badge on pack cards
- [ ] Create countdown timer component
- [ ] Filter seasonal packs from listing when inactive
- [ ] Add admin seed script for seasonal packs

**Deliverables:**
- Seasonal pack infrastructure
- Limited-time offer UX
- Mother's Day pack example

---

### 2.4 Order History & Tracking

**Tasks:**
- [ ] Create `/app/track/[orderId]/page.tsx`
  - Show order details
  - Display buyer/receiver information
  - List all coupons with redemption status
  - Show redemption timeline
  - Download PDF card again
- [ ] Add "Track Order" link in emails
- [ ] Create order lookup form (email + order ID)
- [ ] Show redemption progress: "8/20 redeemed"
- [ ] Add individual coupon redemption dates

**Deliverables:**
- Order tracking page
- Redemption history view
- PDF re-download option

---

### 2.5 Enhanced Redemption UX

**Tasks:**
- [ ] Add redemption confirmation modal (already in 1.11)
- [ ] Implement post-redemption state improvements:
  - [ ] Show "Redeemed ✓" badge
  - [ ] Display redemption date below coupon
  - [ ] Add expandable "Tips for fulfilling" section
  - [ ] Show fulfillment checklist (optional)
- [ ] Create redemption history page: `/app/my-pack/[code]/history`
  - [ ] Timeline view of all redemptions
  - [ ] Filter: "Redeemed" vs "Available"
  - [ ] Stats: "You've redeemed X/20 coupons"
- [ ] Add redemption "undo" feature (5-minute window)
  - [ ] API route: `/app/api/redeem/undo/[couponId]/route.ts`
  - [ ] Show "Undo" button for 5 minutes after redemption
  - [ ] Mark as unredeemed, clear timestamp
  - [ ] Do NOT send undo notification (avoid spam)

**Deliverables:**
- Improved redemption experience
- Redemption history tracking
- Undo functionality

---

### 2.6 Pack Preview Enhancements

**Tasks:**
- [ ] Add "View all 20 coupons" button on pack detail page
- [ ] Create full coupon list modal/page
- [ ] Show all coupons in the pack before purchase
- [ ] Add sample coupon categories/tags
- [ ] Implement "Try Demo Pack" feature:
  - [ ] Generate temporary access code (expires in 1 hour)
  - [ ] Watermark: "DEMO - Not Redeemable"
  - [ ] Show full redemption flow
  - [ ] Add "Buy this pack" CTA throughout demo
  - [ ] Clean up demo orders after 24 hours (cron job)

**Deliverables:**
- Complete pack previews
- Demo pack experience
- Improved purchase confidence

---

### 2.7 Improved Form Validation & UX

**Tasks:**
- [ ] Enhance checkout form with real-time validation:
  - [ ] Show inline error messages
  - [ ] Validate email format on blur
  - [ ] Character counter for personal message (max 500)
  - [ ] Auto-capitalize names
- [ ] Add form field hints and examples
- [ ] Implement auto-save draft (localStorage)
- [ ] Show price updates when promo code applied
- [ ] Add loading states to all buttons
- [ ] Disable form during submission
- [ ] Show success animations

**Zod Schema Example:**
```ts
const checkoutSchema = z.object({
  buyerName: z.string().min(2, "Name must be at least 2 characters"),
  buyerEmail: z.string().email("Please enter a valid email"),
  receiverName: z.string().min(2, "Receiver name required"),
  personalMessage: z.string().max(500, "Message too long (max 500 chars)").optional(),
  promoCode: z.string().optional()
});
```

**Deliverables:**
- Polished form experience
- Real-time validation
- User-friendly errors

---

### 2.8 Gifter Dashboard (Simple Version)

**Tasks:**
- [ ] Create `/app/dashboard/[orderId]/page.tsx`
  - [ ] Lookup order by ID + buyer email
  - [ ] Show order summary
  - [ ] Display all coupons with redemption status
  - [ ] Show which coupons have been redeemed
  - [ ] Display redemption dates
  - [ ] Show redemption rate: "15/20 redeemed (75%)"
  - [ ] Add notes section for each coupon (optional)
- [ ] Add "View Dashboard" link in order confirmation email
- [ ] Secure with simple validation (order ID + email)
- [ ] Add export functionality (CSV or PDF)

**Deliverables:**
- Basic gifter dashboard
- Redemption tracking for gifters
- Order management

---

### 2.9 Multi-Currency Support

**Tasks:**
- [ ] Implement currency detection based on IP (optional)
- [ ] Add currency switcher in header/footer
- [ ] Store selected currency in cookie
- [ ] Update pack prices dynamically:
  - [ ] AUD$25 (default)
  - [ ] USD$17
  - [ ] EUR€15
  - [ ] GBP£13
- [ ] Create Stripe products for each currency
- [ ] Update all price displays
- [ ] Show correct currency symbol
- [ ] Test checkout with different currencies

**Deliverables:**
- Multi-currency support
- Currency switcher UI
- Localized pricing

---

### 2.10 Analytics & Tracking

**Tasks:**
- [ ] Install Vercel Analytics: `npm install @vercel/analytics`
- [ ] Add analytics provider to root layout
- [ ] Set up Google Analytics 4:
  - [ ] Create GA4 property
  - [ ] Add tracking code to `<head>`
  - [ ] Configure events:
    - `view_pack` (pack detail page)
    - `begin_checkout` (checkout started)
    - `purchase` (order completed)
    - `redeem_coupon` (coupon redeemed)
- [ ] Implement custom event tracking
- [ ] Add conversion tracking for ads
- [ ] Set up goals in Google Analytics

**Deliverables:**
- Analytics implementation
- Event tracking
- Conversion measurement

---

## Phase 3: Polish & Optimization (Week 5-6)

**Goal**: SEO, performance, accessibility, admin tools

### 3.1 SEO Optimization

**Tasks:**
- [ ] Add comprehensive metadata to all pages:
  - [ ] `title`, `description`, `keywords`
  - [ ] Open Graph tags (og:title, og:image, etc.)
  - [ ] Twitter Card tags
  - [ ] Canonical URLs
- [ ] Create `/app/sitemap.ts` (dynamic sitemap.xml)
- [ ] Create `/app/robots.ts` (robots.txt)
- [ ] Add structured data (JSON-LD):
  - [ ] Organization schema
  - [ ] Product schema for packs
  - [ ] BreadcrumbList schema
  - [ ] FAQPage schema
- [ ] Implement internal linking strategy
- [ ] Add alt text to all images
- [ ] Optimize page titles and descriptions
- [ ] Submit sitemap to Google Search Console

**Target Keywords (PRD Section 14):**
- Digital love coupons
- Couples gift ideas
- Romantic gestures for couples
- Acts of service coupons
- Valentine's Day gift
- Anniversary gift for couples
- Long distance relationship gifts

**Deliverables:**
- Complete SEO implementation
- Structured data
- Search engine indexing

---

### 3.2 Performance Optimization

**Tasks:**
- [ ] Optimize all images:
  - [ ] Convert to WebP format
  - [ ] Use Next.js Image component everywhere
  - [ ] Add proper sizes and srcset
  - [ ] Lazy load images below fold
- [ ] Implement route prefetching
- [ ] Code split large components
- [ ] Lazy load Framer Motion:
  ```ts
  const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div));
  ```
- [ ] Minimize bundle size:
  - [ ] Tree-shake unused code
  - [ ] Analyze bundle with `@next/bundle-analyzer`
  - [ ] Remove unnecessary dependencies
- [ ] Optimize fonts:
  - [ ] Use next/font with font-display: swap
  - [ ] Preload critical fonts
- [ ] Implement caching strategies:
  - [ ] Cache static assets (1 year)
  - [ ] Cache API routes (appropriate TTL)
  - [ ] Use Vercel Edge Cache
- [ ] Run Lighthouse audit:
  - [ ] Aim for 90+ on all metrics
  - [ ] Fix all accessibility issues
  - [ ] Improve Core Web Vitals

**Performance Targets:**
- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1
- Time to First Byte (TTFB): <600ms

**Deliverables:**
- Optimized images and assets
- Fast page load times
- High Lighthouse scores

---

### 3.3 Accessibility (WCAG 2.1 AA Compliance)

**Tasks:**
- [ ] Audit with axe DevTools or Lighthouse
- [ ] Keyboard navigation:
  - [ ] All interactive elements focusable
  - [ ] Visible focus indicators
  - [ ] Logical tab order
  - [ ] Escape key closes modals
- [ ] Screen reader optimization:
  - [ ] Semantic HTML everywhere
  - [ ] ARIA labels where needed
  - [ ] Alt text for images
  - [ ] Skip to content link
  - [ ] Announce dynamic content changes
- [ ] Color contrast:
  - [ ] Fix all contrast issues (4.5:1 ratio)
  - [ ] Test with color blindness simulators
- [ ] Form accessibility:
  - [ ] Proper label associations
  - [ ] Error announcements
  - [ ] Required field indicators
- [ ] Add captions/transcripts for video testimonials (Phase 2)

**Deliverables:**
- WCAG 2.1 AA compliant site
- Screen reader friendly
- Keyboard navigable

---

### 3.4 Mobile Responsiveness Refinement

**Tasks:**
- [ ] Test on real devices:
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] iPad (Safari)
- [ ] Fix layout issues at all breakpoints:
  - [ ] 320px (small phones)
  - [ ] 768px (tablets)
  - [ ] 1024px (small laptops)
  - [ ] 1440px+ (desktops)
- [ ] Optimize touch targets (min 44x44px)
- [ ] Test forms on mobile keyboards
- [ ] Fix any horizontal scrolling
- [ ] Optimize mobile navigation
- [ ] Test QR code scanning on mobile

**Deliverables:**
- Perfect mobile experience
- Touch-optimized UI
- Cross-device compatibility

---

### 3.5 Admin Panel (Simple CMS)

**Tasks:**
- [ ] Create admin authentication (simple password protection)
- [ ] Create `/app/admin/page.tsx` dashboard:
  - [ ] Show total orders
  - [ ] Show revenue this month
  - [ ] Show recent orders
  - [ ] Show redemption rates
- [ ] Create `/app/admin/orders/page.tsx`:
  - [ ] List all orders with filters
  - [ ] Search by email or code
  - [ ] View order details
  - [ ] Export to CSV
- [ ] Create `/app/admin/packs/page.tsx`:
  - [ ] List all packs
  - [ ] Toggle active/inactive
  - [ ] Edit pack details
  - [ ] Add new pack (optional)
- [ ] Create `/app/admin/coupons/page.tsx`:
  - [ ] List all coupon templates
  - [ ] Edit coupon text
  - [ ] Add new coupons to packs
- [ ] Create `/app/admin/promo-codes/page.tsx`:
  - [ ] List promo codes
  - [ ] Add new promo code
  - [ ] Deactivate codes
- [ ] Create `/app/admin/analytics/page.tsx`:
  - [ ] Revenue charts
  - [ ] Redemption rate by pack
  - [ ] Popular coupons
  - [ ] Conversion funnel

**Authentication:**
- Simple password protection (no user accounts)
- Store hashed password in env vars
- Middleware to protect /admin routes

**Deliverables:**
- Functional admin panel
- Order management
- Content management

---

### 3.6 Email Campaign System

**Tasks:**
- [ ] Create email templates for campaigns:
  - [ ] Welcome series (5-email drip)
  - [ ] Post-purchase tips
  - [ ] Redemption reminders
  - [ ] Re-engagement campaigns
- [ ] Integrate with Mailchimp or ConvertKit
- [ ] Set up automated email sequences
- [ ] Create email list segments:
  - [ ] Recent buyers
  - [ ] Active redeemers
  - [ ] Inactive users (no redemptions)
- [ ] Design monthly newsletter template
- [ ] Add unsubscribe handling

**Email Sequences (PRD Section 21):**
1. Welcome series (5 emails over 2 weeks)
2. Post-purchase: "How to present your gift" (1 day after purchase)
3. Weekly: "Don't forget to redeem!" (if no redemptions after 1 week)
4. Re-engagement: "It's been a while..." (30 days inactive)
5. Winback: "We miss you" (90 days inactive)

**Deliverables:**
- Email marketing integration
- Automated email sequences
- Newsletter system

---

### 3.7 Testimonials & Social Proof

**Tasks:**
- [ ] Create testimonials table in database
- [ ] Seed with 10-15 sample testimonials
- [ ] Create `/app/api/testimonials/route.ts`
- [ ] Add testimonials section to homepage:
  - [ ] Carousel/grid of testimonial cards
  - [ ] 5-star ratings
  - [ ] Customer photos (avatars)
  - [ ] Pack type mentioned
- [ ] Add social proof elements:
  - [ ] "Join 10,000+ couples" counter
  - [ ] Trust badges (secure payment, etc.)
  - [ ] Instagram feed widget (@CouplesCoupons)
- [ ] Create `/app/reviews/page.tsx` (optional)
  - [ ] All testimonials
  - [ ] Filter by pack type
  - [ ] Submit review form

**Deliverables:**
- Testimonials system
- Social proof on homepage
- Trust-building elements

---

### 3.8 Referral Program (Optional)

**Tasks:**
- [ ] Create referrals table in database
- [ ] Generate unique referral codes per order
- [ ] Create `/app/refer/page.tsx`:
  - [ ] Referral link generator
  - [ ] Social share buttons
  - [ ] Referral stats
- [ ] Track referral conversions:
  - [ ] Referrer gets $5 credit
  - [ ] Referee gets $5 off
- [ ] Create referral promo codes automatically
- [ ] Send notification when referral converts
- [ ] Add referral widget to post-purchase email

**Deliverables:**
- Referral program
- Social sharing tools
- Referral tracking

---

### 3.9 Final Testing & Bug Fixes

**Tasks:**
- [ ] Conduct comprehensive QA:
  - [ ] Test all user flows end-to-end
  - [ ] Test edge cases
  - [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - [ ] Mobile device testing
  - [ ] Accessibility audit
  - [ ] Performance benchmarking
- [ ] Fix all critical bugs
- [ ] Address all console warnings
- [ ] Validate all forms
- [ ] Test with real Stripe payments
- [ ] Test email delivery
- [ ] Load testing with k6 or similar tool
- [ ] Security audit:
  - [ ] Check for XSS vulnerabilities
  - [ ] Validate CSRF protection
  - [ ] Review API rate limiting
  - [ ] Check for SQL injection (Prisma prevents this)
  - [ ] Review environment variable security

**Deliverables:**
- Bug-free application
- Security validated
- Performance confirmed

---

### 3.10 Launch Preparation

**Tasks:**
- [ ] Set up production database (Neon or Supabase)
- [ ] Configure production environment variables
- [ ] Set up custom domain: couplescoupons.com
- [ ] Configure DNS records (A/CNAME)
- [ ] Enable SSL (automatic with Vercel)
- [ ] Set up Stripe production keys
- [ ] Configure Resend for production
- [ ] Set up error monitoring (Sentry)
- [ ] Create production webhook endpoint
- [ ] Register webhook in Stripe dashboard
- [ ] Seed production database with real content
- [ ] Create launch checklist
- [ ] Prepare marketing materials
- [ ] Set up Google Analytics production property
- [ ] Configure email sending domain (SPF, DKIM)

**Pre-Launch Checklist:**
- [ ] All features tested in production-like environment
- [ ] Database backed up
- [ ] Monitoring and alerts configured
- [ ] Support email set up (support@couplescoupons.com)
- [ ] Terms of Service and Privacy Policy pages
- [ ] Refund policy documented
- [ ] Customer support system ready

**Deliverables:**
- Production deployment
- Live website
- Monitoring in place

---

## Technical Implementation Details

### File Structure

```
/couplescoupons
├── /app
│   ├── layout.tsx (root layout with providers)
│   ├── page.tsx (homepage)
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── /packs
│   │   ├── page.tsx (pack listing)
│   │   └── /[slug]
│   │       └── page.tsx (pack detail)
│   ├── /checkout
│   │   ├── /[packId]
│   │   │   └── page.tsx (checkout form)
│   │   └── /success
│   │       └── page.tsx
│   ├── /redeem
│   │   └── page.tsx (access code entry)
│   ├── /my-pack
│   │   └── /[accessCode]
│   │       ├── page.tsx (coupon grid)
│   │       └── /history
│   │           └── page.tsx
│   ├── /track
│   │   └── /[orderId]
│   │       └── page.tsx
│   ├── /dashboard
│   │   └── /[orderId]
│   │       └── page.tsx
│   ├── /blog
│   │   ├── page.tsx
│   │   └── /[slug]
│   │       └── page.tsx
│   ├── /about
│   │   └── page.tsx
│   ├── /how-it-works
│   │   └── page.tsx
│   ├── /faq
│   │   └── page.tsx
│   ├── /admin
│   │   ├── page.tsx
│   │   ├── /orders
│   │   ├── /packs
│   │   ├── /coupons
│   │   └── /analytics
│   └── /api
│       ├── /checkout
│       │   └── route.ts
│       ├── /webhooks
│       │   └── /stripe
│       │       └── route.ts
│       ├── /redeem
│       │   ├── /validate
│       │   │   └── route.ts
│       │   └── /[couponId]
│       │       └── route.ts
│       ├── /newsletter
│       │   └── /subscribe
│       │       └── route.ts
│       └── /testimonials
│           └── route.ts
├── /components
│   ├── /ui (shadcn components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── accordion.tsx
│   │   └── ... (other shadcn components)
│   ├── /layout
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── container.tsx
│   │   └── newsletter-form.tsx
│   ├── /coupon
│   │   ├── coupon-card.tsx
│   │   ├── coupon-grid.tsx
│   │   └── redemption-modal.tsx
│   ├── /pack
│   │   ├── pack-card.tsx
│   │   ├── pack-preview.tsx
│   │   └── floating-coupons.tsx
│   ├── /checkout
│   │   ├── checkout-form.tsx
│   │   └── promo-code-input.tsx
│   └── error-boundary.tsx
├── /lib
│   ├── db.ts (Prisma client singleton)
│   ├── stripe.ts (Stripe client)
│   ├── email.ts (Resend email utilities)
│   ├── pdf.ts (PDF generation)
│   ├── /utils
│   │   ├── access-code.ts
│   │   ├── currency.ts
│   │   └── validation.ts
│   └── /schemas
│       ├── checkout.ts (Zod schemas)
│       └── redeem.ts
├── /prisma
│   ├── schema.prisma
│   ├── seed.ts
│   └── /migrations
├── /emails (react-email templates)
│   ├── order-confirmation.tsx
│   ├── gift-delivery.tsx
│   ├── redemption-notification.tsx
│   └── newsletter-welcome.tsx
├── /public
│   ├── /images
│   ├── /icons
│   └── logo.svg
├── .env.example
├── .env.local (gitignored)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Environment Variables Reference

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Couples Coupons"

# File Storage (Vercel Blob or Cloudinary)
BLOB_READ_WRITE_TOKEN="..."
# OR
CLOUDINARY_URL="cloudinary://..."

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."

# Admin (simple auth)
ADMIN_PASSWORD_HASH="..."

# Email Marketing (optional)
MAILCHIMP_API_KEY="..."
MAILCHIMP_LIST_ID="..."
```

---

## Testing Strategy

### Manual Testing Checklist

**Purchase Flow:**
- [ ] Browse homepage and navigate to packs
- [ ] View pack details
- [ ] Click "Buy now"
- [ ] Fill checkout form with valid data
- [ ] Apply promo code
- [ ] Complete Stripe payment (test card: 4242 4242 4242 4242)
- [ ] Verify redirect to success page
- [ ] Check order created in database
- [ ] Verify webhook triggered
- [ ] Confirm emails received (buyer and receiver)
- [ ] Download and check PDF card

**Redemption Flow:**
- [ ] Access redemption page
- [ ] Enter access code from email
- [ ] View coupon grid
- [ ] Click "Redeem" on a coupon
- [ ] Confirm in modal
- [ ] Verify coupon marked as redeemed
- [ ] Check gifter receives notification email
- [ ] Verify redemption date displayed
- [ ] Test "Undo" redemption

**Edge Cases:**
- [ ] Invalid access code
- [ ] Already redeemed coupon
- [ ] Expired promo code
- [ ] Invalid promo code
- [ ] Failed Stripe payment
- [ ] Empty form submissions
- [ ] Very long personal messages (>500 chars)
- [ ] Special characters in names
- [ ] Multiple rapid redemptions (rate limiting)

**Cross-Browser:**
- [ ] Chrome (Mac/Windows)
- [ ] Safari (Mac/iOS)
- [ ] Firefox
- [ ] Edge

**Mobile:**
- [ ] iPhone (various sizes)
- [ ] Android phone
- [ ] iPad
- [ ] Landscape orientation

**Performance:**
- [ ] Lighthouse audit (all pages)
- [ ] Core Web Vitals
- [ ] Slow 3G network simulation
- [ ] Image loading
- [ ] Bundle size analysis

### Automated Testing (Optional for MVP)

**Unit Tests:**
- Access code generation
- Promo code validation
- Discount calculations
- Email address validation

**Integration Tests:**
- Checkout API route
- Webhook handler
- Redemption API

**E2E Tests (Playwright):**
- Complete purchase flow
- Complete redemption flow
- Newsletter signup

---

## Deployment Strategy

### Vercel Deployment

**1. Connect Repository:**
- Push code to GitHub
- Connect repo to Vercel
- Auto-deploy on push to main

**2. Environment Variables:**
- Add all env vars in Vercel dashboard
- Use different values for production
- Test staging environment first

**3. Domain Configuration:**
- Add custom domain in Vercel
- Update DNS records:
  - A record: 76.76.21.21
  - CNAME: cname.vercel-dns.com
- Wait for SSL certificate provisioning

**4. Database Setup:**
- Create production database on Neon/Supabase
- Run migrations: `npx prisma migrate deploy`
- Seed production data: `npx prisma db seed`

**5. Stripe Configuration:**
- Switch to production API keys
- Register production webhook endpoint
- Test with real payment (small amount)

**6. Email Configuration:**
- Verify Resend domain
- Add SPF and DKIM records
- Send test emails

**7. Monitoring:**
- Enable Vercel Analytics
- Set up error tracking (Sentry)
- Configure uptime monitoring

---

## Launch Checklist

**Pre-Launch (1 week before):**
- [ ] All features tested in staging
- [ ] Performance optimized
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Error monitoring active
- [ ] Database backed up
- [ ] Terms and Privacy pages live
- [ ] Support email functional
- [ ] Social media accounts ready
- [ ] Marketing materials prepared

**Launch Day:**
- [ ] Deploy to production
- [ ] Verify all integrations work
- [ ] Test purchase flow end-to-end
- [ ] Send test order to yourself
- [ ] Announce on social media
- [ ] Email existing customers (if migrating)
- [ ] Monitor error logs
- [ ] Watch analytics dashboard
- [ ] Be ready for support requests

**Post-Launch (First Week):**
- [ ] Monitor daily active users
- [ ] Track conversion rates
- [ ] Check for errors/bugs
- [ ] Gather user feedback
- [ ] Fix any issues quickly
- [ ] Optimize based on data
- [ ] Celebrate the launch! 🎉

---

## Success Metrics (3 Months)

**Traffic:**
- 5,000 monthly visitors
- 2% conversion rate
- 50% mobile traffic

**Sales:**
- 100 orders/month
- $2,500 monthly revenue
- 70%+ redemption rate
- Average order value: $25

**Engagement:**
- 500 newsletter subscribers
- 30% email open rate
- 3+ coupons redeemed per pack
- Average time to first redemption: 3 days

**Technical:**
- 99.9% uptime
- <2s page load time
- 90+ Lighthouse score
- Zero critical bugs

---

## Future Enhancements (Post-Launch)

**Phase 4 (Month 2-3):**
- Customizable coupon packs (build your own)
- Scheduled delivery (send on specific date)
- Subscription model ($10/month for monthly surprise coupons)
- Mobile app (React Native)
- Gamification (badges, streaks, challenges)
- Referral program
- Physical card shipping option
- SMS delivery
- Multi-language support

**Phase 5 (Ongoing):**
- A/B testing framework
- Advanced analytics dashboard
- Customer support chat
- User-generated content (submitted coupon ideas)
- Partnership integrations (date night apps)
- Wholesale/B2B program
- Seasonal campaigns
- Influencer marketing

---

## Risk Mitigation

**Technical Risks:**
- **Database failure**: Regular backups, use managed service (Neon/Supabase)
- **Payment issues**: Test thoroughly, have Stripe support contact
- **Email delivery problems**: Use reputable service (Resend), monitor deliverability
- **PDF generation errors**: Comprehensive testing, fallback to simple text email
- **High traffic**: Use Vercel's auto-scaling, CDN for assets
- **Security breach**: Follow best practices, regular security audits

**Business Risks:**
- **Low conversion**: A/B test checkout flow, improve messaging
- **High refund rate**: Set clear expectations, improve product quality
- **Poor redemption rate**: Send reminder emails, improve UX
- **Customer support overload**: Build comprehensive FAQ, automate common queries

---

## Conclusion

This implementation plan provides a complete, detailed roadmap for building Couples Coupons from scratch. The key to success is:

1. **Follow the phases sequentially** - Don't skip MVP testing
2. **Test thoroughly at each stage** - Catch bugs early
3. **Prioritize user experience** - Make it delightful
4. **Measure everything** - Data-driven decisions
5. **Iterate based on feedback** - Listen to users

With this plan, you have everything needed to build a world-class digital couples coupon platform. Good luck with the build! 🚀

---

**Document Version**: 1.0
**Last Updated**: 2025-10-08
**Owner**: Couples Coupons Team
