# CoupleCoupons.com - Product Requirements Document

## 1. EXECUTIVE SUMMARY

### Product Vision
A digital platform that helps couples strengthen their relationships through curated packs of romantic coupons, acts of service, and memorable experiences. Users purchase themed coupon packs, customize them with personal messages, and gift them to partners who redeem coupons online.

### Business Model
- **Revenue**: One-time purchases of digital coupon packs
- **Price Point**: AUD$25 per pack (20 digital coupons)
- **Special Offers**: Seasonal packs (e.g., Mother's Day at AUD$20)
- **Delivery**: Instant digital delivery via email + printable PDF card with QR code

### Target Audience
- Couples in relationships (new, long-term, or long-distance)
- People seeking thoughtful, experience-based gifts
- Ages 20-45, relationship-focused individuals

### Core Value Proposition
**"Because love is in the details. Because relationships are built on shared moments. Because every couple deserves more reasons to smile together."**

### Contact
- Email: support@couplescoupons.com
- Instagram: @CouplesCoupons
- Website: www.couplescoupons.com

---

## 2. PAGES & NAVIGATION STRUCTURE

### Main Pages
1. **Homepage** (`/`)
   - Hero section with value proposition
   - Sample coupon previews (3 visible cards)
   - "Buy now" and "How it works" CTAs
   - Navigation: Coupon Packs (dropdown), About, Blog

2. **About Page** (`/about`)
   - Mission statement
   - Brand story and values
   - Illustrated design with hand-drawn heart exchange

3. **How It Works** (`/how-it-works`)
   - 3-step process:
     - "You gift it" - Purchase and send pack
     - "They redeem it" - Partner uses unique link/code
     - "You fulfill it" - Get notified to complete gesture

4. **Pack Listing Page** (`/coupon-packs`)
   - Three main packs:
     - **Romance** - "Spark the romance, ignite the love"
     - **Acts of Service** - "Actions speak louder than words"
     - **Making Memories** - "Cherish moments, create bonds"
   - Each pack: Icon, title, tagline, price (AUD$25), "View pack" button

5. **Pack Detail Page** (e.g., `/packs/romance`)
   - Pack name and description
   - What's included:
     - Personalized message
     - Unique secure weblink
     - PDF card with QR code + access code
     - Email notifications when redeemed
     - Tips for each coupon
     - 20x digital coupons
   - Price display: AUD$25
   - "Buy now" CTA

6. **Pack Preview/Sample** (`/packs/{pack-name}/preview`)
   - Shows 6+ sample coupons from the pack
   - Each coupon card displays:
     - Icon (feather illustration)
     - Coupon title (e.g., "Candlelit Dinner")
     - Description
     - "Redeem" button (in preview mode)

7. **Blog** (`/blog`)
   - Relationship tips and content
   - Newsletter signup

8. **FAQ Page** (`/faq`)
   - Accordion-style questions:
     - How do Couples Coupons work?
     - Can I customize my coupon pack?
     - Do the coupons expire?
     - How does my partner redeem a coupon?
     - How do I gift a pack to my partner?

### Footer
- Pages: Home, About, Blog
- Packs: Romance, Acts of Service, Memories
- Legal: Privacy, Terms

---

## 3. COUPON PACKS

### Pack Types (20 coupons each, AUD$25)

#### 1. Romance Pack
**Sample Coupons:**
- Candlelit Dinner
- Sunset Stroll
- Role-Playing Fantasy Night
- Paint the Town Red (cocktail bar/restaurant night)
- Breakfast in Bed
- Sexy Outfit Reveal

#### 2. Acts of Service Pack
**Sample Coupons:**
- Home cooked dinner date
- Picnic in park
- Short stories (write together)
- (Additional coupons not visible in screenshots)

#### 3. Making Memories Pack
**Sample Coupons:**
- (Coupons focus on experiences and creating lasting memories)

#### 4. Mother's Day Pack (Seasonal - Limited)
- Special pricing: AUD$20
- "More love, for less <3"
- 20 coupons per pack
- Breakfast in Bed
- Massage Session
- Theme: "Time, care, and spoiling"

---

## 4. KEY FEATURES & FUNCTIONALITY

### Purchase Flow
1. User selects a pack from listing page
2. Views pack details and sample coupons
3. Clicks "Buy now"
4. **Checkout process** (needs detail - likely Stripe):
   - Enter personal details
   - Enter partner's name
   - Write personalized message
   - Choose delivery method (email or PDF)
   - Payment processing

### Digital Delivery System
1. **Email delivery**:
   - Personalized message from buyer
   - Unique access link
   - Access code
   
2. **PDF Card**:
   - Printable card design
   - "Let's make memories" header
   - Personalized message
   - QR code for quick access
   - Access code (e.g., "DOC7NN")
   - Branded footer with logo

### Coupon Redemption System
1. Partner receives pack via email/PDF
2. Clicks link or scans QR code
3. Enters access code
4. Views all 20 coupons in their pack
5. Clicks "Redeem" on chosen coupon
6. **Redemption triggers notification to gifter**
7. Gifter receives email: "Your partner redeemed [Coupon Name]"
8. Coupon status changes (redeemed/used)

### Notification System
- Email to gifter when coupon is redeemed
- Reminder emails (optional)
- Tips/guidance for fulfilling each coupon

---

## 5. DATABASE SCHEMA

### Current Bubble Architecture Summary

**Key Insight:** No user authentication system. All data stored in Orders and Coupon(User). User table was only for admin access.

**Core Data Flow:**
```
1. CouponPack (template) contains List of CouponTemplates
2. On purchase, create Order with all buyer/receiver info
3. Loop through pack's templates, create Coupon(User) instances
4. Attach all Coupon(User)s to Order
5. Send emails via Postmark
```

---

### Simplified Schema (No Auth Required)

Since there's no user authentication, we can simplify significantly:

```sql
-- Coupon Packs (Templates) - The 3 main packs
CREATE TABLE coupon_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL, -- "Romance", "Acts of Service", "Making Memories"
  title VARCHAR(200),
  tagline VARCHAR(200),
  description TEXT,
  icon_url TEXT,
  price_aud DECIMAL(10, 2) NOT NULL DEFAULT 25.00,
  price_usd DECIMAL(10, 2),
  price_eur DECIMAL(10, 2),
  price_gbp DECIMAL(10, 2),
  currency_symbol VARCHAR(5) DEFAULT '

#### User
```
- activated (yes/no)
- avatar (image)
- Currency (text)
- firstName (text)
- fullName (text)
- invited (date)
- lastName (text)
- OAuth (yes/no)
- phone (text)
- suspended (yes/no)
- userType (User Types) // Default: "User"
- email (text) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Order
```
- Buyer email (text)
- Buyer Name (text)
- Code (text) // Access code, e.g., "GRLOK0"
- Coupon Pack (→ Coupon Pack)
- Coupons (List of Coupon(User)s) // Individual redeemable instances
- Currency (text)
- Custom message (text) // Personal message from buyer
- encoded_pdf (text) // Base64 or URL
- Pack Name (text)
- Pack Price (number)
- Payment status (text)
- pdf_url (text) // URL to generated PDF card
- PromoCode (text) // Applied promo code
- QR_code (image) // Generated QR code
- Receiver name (text) // Partner's name
- Status (text)
- Stripe session ID (text)
- url (text) // Unique access URL
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Coupon Pack (Template)
```
- Baseprice (number)
- Coupons (List of CouponTemplates) // 20 template coupons
- currency_symbol (text)
- Description (text)
- icon (image) // Pack icon (feather, heart, camera)
- message (text)
- Pack_Name (text) // "Romance", "Acts of Service", "Making Memories"
- pirce_eu (number) // Pricing for different currencies
- price_au (number)
- price_uk (number)
- price_us (number)
- Tagline (text) // "Spark the romance, ignite the love"
- Title (text)
- Whatsincluded (List of texts) // Bullet points for pack detail page
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### CouponTemplate (Master Coupons)
```
- Description (text) // "Let's enjoy a romantic dinner..."
- Icon (image) // Feather illustration
- Order (text) // Sort order? (unclear)
- Redeem status (yes/no) // This shouldn't be here (templates don't get redeemed)
- Tip (text) // Tips for fulfilling the coupon
- Title (text) // "Candlelit Dinner"
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Coupon(User) (Instance - Redeemable)
```
- Description (text) // Copied from template
- Icon (image) // Copied from template
- Order (→ Order) // Which order this belongs to
- Status (yes/no) // Redeemed or not
- Tip (text) // Copied from template
- Title (text) // Copied from template
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field (used as redemption date)
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### PromoCodes
```
- Code (text) // "CC100"
- Key (text) // Description or discount value
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Subscribers (Newsletter)
```
- Email (Email)
- Emails (text) // Unclear - duplicate?
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### FAQ
```
- Answer (text)
- Question (text)
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Blog
```
- article_content (text)
- Date (date)
- img (image)
- short_description (text)
- Title (text)
- url_title (text) // Slug for URL
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Email (Template Builder)
```
- body (text)
- bodySecondary (text)
- buttonLink (text)
- ButtonText (text)
- color (text)
- font-family (text)
- footer-text (text)
- header (text)
- headerSecondary (text)
- html (text)
- image (text)
- links (List of Email Footer Links)
- logo (text)
- name (text)
- subject (text)
- vars (text)
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### CurrencyMapping (For International Pricing)
```
- Code (text) // "AUD", "USD", "EUR", "GBP"
- Countries (List of texts)
- Currency (text) // "Australian Dollar"
- Price (number) // Base price in this currency
- Region_Name (text) // "Australia"
- Symbol (text) // "$", "€", "£"
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

---

### Improved Schema for Rebuild (PostgreSQL)

**Key Changes:**
1. Separate Template data from Instance data clearly
2. Add proper relationships and foreign keys
3. Remove unused fields
4. Add indexes for performance
5. Better naming conventions
6. Add status enums

```sql
-- Users table (simplified - use NextAuth or Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  full_name VARCHAR(200) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  avatar_url TEXT,
  phone VARCHAR(20),
  currency_code VARCHAR(3) DEFAULT 'AUD',
  user_type VARCHAR(20) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  is_suspended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Packs (Templates)
CREATE TABLE coupon_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200),
  tagline VARCHAR(200),
  description TEXT,
  icon_url TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  price_aud DECIMAL(10, 2),
  price_usd DECIMAL(10, 2),
  price_eur DECIMAL(10, 2),
  price_gbp DECIMAL(10, 2),
  currency_symbol VARCHAR(5) DEFAULT '

---

## 6. USER FLOWS

### Flow 1: Purchase & Gift
```
1. Buyer visits homepage
2. Explores "Coupon Packs" dropdown or clicks "Buy now"
3. Browses available packs
4. Selects pack → Views details & preview
5. Clicks "Buy now"
6. Checkout:
   - Enters personal info
   - Enters partner's name
   - Writes personal message
   - Chooses delivery (email/PDF)
   - Completes payment
7. Receives confirmation email with PDF
8. Partner receives gift email/PDF with access link + code
```

### Flow 2: Redemption & Notification
```
1. Partner opens email or PDF
2. Clicks link or scans QR code
3. Enters access code
4. Views digital coupon pack (20 coupons)
5. Browses coupons
6. Selects coupon to redeem
7. Clicks "Redeem" button
8. Confirmation shown to partner
9. Notification email sent to gifter
10. Gifter fulfills the coupon/gesture
```

### Flow 3: Content/Newsletter
```
1. User scrolls to footer
2. Enters email in "Subscribe for deals and relationship tips"
3. Clicks "Subscribe"
4. Added to email list
5. Receives welcome email + future content
```

---

## 7. DESIGN SYSTEM

### Brand Colors
- **Primary Red**: #D64933 (buttons, accents)
- **Light Pink/Peach**: #FFE5E0 (backgrounds)
- **Dark Text**: #1A1A1A (headings)
- **Medium Gray**: #6B6B6B (body text)
- **White**: #FFFFFF (cards, backgrounds)

### Typography
- **Headings**: Bold, sans-serif (likely Inter or similar)
- **Body**: Regular sans-serif
- **Script/Handwriting**: Used for "Let's make memories" on PDF card

### UI Components
- **Cards**: White background, rounded corners, subtle shadow
- **Buttons**: 
  - Primary: Red (#D64933), rounded-full, white text
  - Secondary: Red outline, transparent background
- **Icons**: Line-art style illustrations (hearts, feathers, gifts)
- **Illustrations**: Hand-drawn, minimalist style
- **Coupon Cards**: Circular icon background (light peach), centered design

### Responsive Design
- Desktop navigation with dropdown
- Mobile-friendly layouts
- Touch-friendly coupon cards

---

## 8. TECHNICAL REQUIREMENTS

### Frontend Stack (Recommended)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui or custom components
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context or Zustand (if needed)

### Backend & Database
- **Database**: PostgreSQL (Supabase or Neon)
- **ORM**: Prisma or Drizzle
- **API**: Next.js API routes
- **Authentication**: NextAuth.js (optional, for user accounts)

### Third-Party Integrations
- **Payment**: Stripe Checkout
- **Email**: Postmark (transactional emails)
- **Email Marketing**: Mailchimp or ConvertKit (optional, for newsletter)
- **PDF Generation**: 
  - react-pdf or @react-pdf/renderer
  - QR codes: qrcode library
- **File Storage**: 
  - Cloudinary or AWS S3 (for coupon icons, PDFs, QR codes)
- **Analytics**: Google Analytics 4 or Plausible

### Hosting & Deployment
- **Platform**: Vercel
- **Domain**: couplescoupons.com
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Vercel)

---

## 9. MODERN LANDING PAGE DESIGN

### Design Inspiration

**Visual References:**
- Stripe.com - Clean, spacious, professional
- Linear.app - Minimalist, focused, beautiful animations
- Framer.com - Bold typography, smooth interactions
- Vercel.com - Dark/light balance, subtle gradients
- Webflow showcase sites - Creative layouts, bento grids

**Key Principles:**
- Large, confident typography
- Generous whitespace (breathing room)
- Subtle but delightful animations
- Clear visual hierarchy
- Emotional connection through design
- Mobile-first responsive

---

### Homepage Structure

#### 1. **Hero Section** (Above the fold)

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  Logo                      Packs  About  Blog    │
│                                                   │
│  ┌─────────────────┐  ┌───────────────────────┐ │
│  │                 │  │  Floating coupon      │ │
│  │  Romantic       │  │  preview cards        │ │
│  │  gestures and   │  │  (animated)           │ │
│  │  acts of service│  │                       │ │
│  │  for your loved │  │  ┌─────────────────┐ │ │
│  │  one            │  │  │ Home cooked     │ │ │
│  │                 │  │  │ dinner date     │ │ │
│  │  [Buy now]      │  │  └─────────────────┘ │ │
│  │  [How it works] │  │    ┌───────────────┐ │ │
│  │                 │  │    │ Sunset Stroll │ │ │
│  └─────────────────┘  │    └───────────────┘ │ │
│                       └───────────────────────┘ │
└──────────────────────────────────────────────────┘
```

**Code Structure:**
```typescript
<section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-bg-cream via-white to-bg-rose">
  {/* Subtle background pattern */}
  <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5" />
  
  <div className="container mx-auto px-6 py-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left: Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-heading text-display-lg mb-6 tracking-tight">
          Romantic gestures and 
          <span className="block text-primary-500">acts of service</span>
          for your loved one
        </h1>
        
        <p className="text-body-lg text-neutral-600 mb-8 max-w-xl leading-relaxed">
          Digital coupons are ready-to-use vouchers to share with your partner, 
          to show your love and strengthen your relationship.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button size="xl" variant="primary" className="group">
            Buy now
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="xl" variant="outline">
            How it works
          </Button>
        </div>
        
        {/* Social proof */}
        <div className="mt-12 flex items-center gap-8">
          <div>
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`/avatars/${i}.jpg`} className="w-10 h-10 rounded-full border-2 border-white" />
              ))}
            </div>
            <p className="text-sm text-neutral-600 mt-2">Loved by 10,000+ couples</p>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-neutral-600 ml-2">4.9/5</span>
          </div>
        </div>
      </motion.div>
      
      {/* Right: Floating cards */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-[600px]"
      >
        <FloatingCouponCards />
      </motion.div>
    </div>
  </div>
</section>
```

**Floating Cards Animation:**
```typescript
const FloatingCouponCards = () => {
  const cards = [
    { title: "Home cooked dinner date", rotation: -5, delay: 0 },
    { title: "Picnic in park", rotation: 3, delay: 0.2 },
    { title: "Short stories", rotation: -2, delay: 0.4 },
  ];
  
  return (
    <div className="relative w-full h-full">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          animate={{ 
            opacity: 1, 
            y: [0, -10, 0], 
            rotate: card.rotation 
          }}
          transition={{
            opacity: { duration: 0.6, delay: card.delay },
            y: { 
              duration: 3, 
              repeat: Infinity, 
              delay: card.delay 
            }
          }}
          className="absolute inset-0"
          style={{ 
            top: `${i * 120}px`,
            left: `${i * 40}px` 
          }}
        >
          <CouponCard 
            title={card.title}
            icon={<Heart />}
            variant="floating"
          />
        </motion.div>
      ))}
    </div>
  );
};
```

---

#### 2. **How It Works** (Bento Grid Style)

```typescript
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="font-heading text-display-md mb-4">
        How it works
      </h2>
      <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
        Three simple steps to create memorable moments together
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {[
        {
          step: "01",
          title: "You gift it",
          description: "Pick the perfect pack and send via email or PDF card",
          icon: <Gift className="w-12 h-12" />,
          gradient: "from-primary-50 to-primary-100"
        },
        {
          step: "02",
          title: "They redeem it",
          description: "Your partner redeems online using their unique access code",
          icon: <Sparkles className="w-12 h-12" />,
          gradient: "from-accent-coral/20 to-accent-blush/30"
        },
        {
          step: "03",
          title: "You fulfill it",
          description: "Get notified and turn their chosen coupon into reality",
          icon: <Heart className="w-12 h-12" />,
          gradient: "from-bg-rose to-bg-peach"
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Card 
            variant="interactive"
            className={`relative h-full bg-gradient-to-br ${item.gradient} border-none p-8`}
          >
            <div className="text-primary-300 font-heading text-6xl font-bold mb-4">
              {item.step}
            </div>
            <div className="text-primary-500 mb-4">
              {item.icon}
            </div>
            <h3 className="font-heading text-heading-lg mb-3">
              {item.title}
            </h3>
            <p className="text-body-md text-neutral-600">
              {item.description}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

#### 3. **Pack Showcase** (Modern Card Grid)

```typescript
<section className="py-24 bg-gradient-to-b from-white to-bg-cream">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <span className="text-primary-500 font-ui font-semibold tracking-wide uppercase text-sm">
        Choose your pack
      </span>
      <h2 className="font-heading text-display-md mt-3 mb-4">
        Specially curated digital coupon packs
      </h2>
      <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
        Our relationship gurus have put together 20 gesture ideas for you to show your love
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {packs.map((pack, i) => (
        <motion.div
          key={pack.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <Card 
            variant="elevated"
            className="relative overflow-hidden group cursor-pointer h-full"
          >
            {/* Icon background */}
            <div className="absolute top-8 right-8 w-32 h-32 opacity-10 text-primary-500">
              {pack.icon}
            </div>
            
            <div className="relative p-8">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-bg-peach to-bg-rose flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
                {pack.icon}
              </div>
              
              {/* Content */}
              <h3 className="font-heading text-heading-xl mb-2">
                {pack.name}
              </h3>
              <p className="text-body-md text-neutral-600 mb-6">
                {pack.tagline}
              </p>
              
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-heading text-4xl font-bold text-primary-500">
                  AUD$25
                </span>
                <span className="text-sm text-neutral-500">
                  20 coupons
                </span>
              </div>
              
              {/* What's included preview */}
              <ul className="space-y-2 mb-8">
                {pack.preview.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <Button 
                variant="primary" 
                className="w-full group-hover:shadow-primary-lg"
              >
                View pack
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

#### 4. **Features / Benefits** (Alternating Layout)

```typescript
<section className="py-24">
  <div className="container mx-auto px-6">
    {features.map((feature, i) => (
      <div 
        key={i}
        className={`grid lg:grid-cols-2 gap-16 items-center mb-24 last:mb-0 ${
          i % 2 === 1 ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={i % 2 === 1 ? 'lg:order-2' : ''}
        >
          <span className="text-primary-500 font-ui font-semibold text-sm uppercase tracking-wide">
            {feature.label}
          </span>
          <h3 className="font-heading text-display-md mt-3 mb-6">
            {feature.title}
          </h3>
          <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
            {feature.description}
          </p>
          <ul className="space-y-4">
            {feature.points.map((point, j) => (
              <li key={j} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary-500" />
                </div>
                <span className="text-body-md text-neutral-700">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={i % 2 === 1 ? 'lg:order-1' : ''}
        >
          <div className="relative">
            <img 
              src={feature.image} 
              alt={feature.title}
              className="rounded-3xl shadow-2xl"
            />
            {/* Optional: Floating element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl"
            >
              {feature.floatingElement}
            </motion.div>
          </div>
        </motion.div>
      </div>
    ))}
  </div>
</section>
```

---

#### 5. **Social Proof / Testimonials** (Carousel)

```typescript
<section className="py-24 bg-gradient-to-b from-bg-cream to-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="font-heading text-display-md mb-4">
        What our lovers say
      </h2>
      <p className="text-body-lg text-neutral-600">
        Join thousands of couples creating memorable moments
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {testimonials.map((testimonial, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Card variant="elevated" className="h-full p-8">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            {/* Quote */}
            <blockquote className="text-body-md text-neutral-700 mb-6 leading-relaxed">
              "{testimonial.quote}"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-ui font-semibold text-neutral-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-neutral-600">
                  {testimonial.pack}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

#### 6. **FAQ** (Accordion)

```typescript
<section className="py-24">
  <div className="container mx-auto px-6">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-heading text-display-md mb-4">
          Frequently asked questions
        </h2>
      </div>
      
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem 
            key={i} 
            value={`item-${i}`}
            className="bg-white border border-neutral-200 rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="font-ui font-semibold text-left hover:text-primary-500 py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-body-md text-neutral-600 pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>
```

---

#### 7. **CTA Section** (Final Push)

```typescript
<section className="py-32 relative overflow-hidden">
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-coral" />
  
  {/* Pattern overlay */}
  <div className="absolute inset-0 bg-[url('/patterns/hearts.svg')] opacity-10" />
  
  <div className="container mx-auto px-6 relative z-10">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto"
    >
      <h2 className="font-heading text-display-lg text-white mb-6">
        Start your journey
      </h2>
      <p className="text-body-lg text-white/90 mb-10 leading-relaxed">
        Join thousands of couples who've discovered the joy of thoughtful gestures 
        with Couples Coupons. Make your love story unforgettable, one coupon at a time.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          size="xl" 
          variant="secondary"
          className="bg-white text-primary-600 hover:bg-neutral-50 shadow-xl hover:shadow-2xl"
        >
          Browse packs
          <ChevronRight className="ml-2" />
        </Button>
        <Button 
          size="xl" 
          variant="outline"
          className="border-2 border-white text-white hover:bg-white/10"
        >
          Learn more
        </Button>
      </div>
      
      {/* Trust badges */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="text-sm">Instant delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="text-sm">Secure payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="text-sm">10,000+ happy couples</span>
        </div>
      </div>
    </motion.div>
  </div>
</section>
```

---

### Key Design Details

#### Micro-interactions
```typescript
// Hover effects on cards
const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.2 }
};

// Button loading states
<Button disabled={loading}>
  {loading ? (
    <Loader2 className="w-5 h-5 animate-spin" />
  ) : (
    "Buy now"
  )}
</Button>

// Smooth scroll to sections
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};
```

#### Progressive Enhancement
- Content-first approach (works without JS)
- Animations enhance but don't block
- Images lazy-loaded
- Critical CSS inlined

#### Performance Optimizations
- Next.js Image component for all images
- Font display: swap
- Preload critical assets
- Code splitting per route
- Framer Motion lazy-loaded

---

**This landing page design:**
- ✅ Modern, not generic
- ✅ Emotional and romantic (without being cheesy)
- ✅ Clear conversion funnel
- ✅ Mobile-responsive
- ✅ Accessible (WCAG 2.1 AA)
- ✅ Fast (<2s LCP)
- ✅ SEO-optimized
- ✅ Unique brand identity

### Phase 1: MVP (Week 1-2)
**Goal**: Get basic purchase and redemption flow working

**Features**:
- [ ] Homepage with hero + sample coupons
- [ ] Pack listing page (3 packs)
- [ ] Pack detail page with "What's included"
- [ ] Basic Stripe checkout
- [ ] Order confirmation email
- [ ] PDF card generation with QR code + access code
- [ ] Redemption page (access code entry)
- [ ] View coupons page
- [ ] Redeem coupon functionality
- [ ] Email notification to gifter on redemption

**Database**:
- Users (optional for MVP)
- Orders
- Packs
- Coupons (templates)
- UserCoupons (instances)

---

### Phase 2: Enhanced Features (Week 3-4)
**Features**:
- [ ] About page
- [ ] How It Works page
- [ ] FAQ page with accordion
- [ ] Blog setup (simple CMS or markdown)
- [ ] Newsletter signup + integration
- [ ] Pack preview pages (show sample coupons)
- [ ] Custom personalization during checkout
- [ ] Order history page (if user accounts added)
- [ ] Email templates (branded)
- [ ] Seasonal pack system (Mother's Day, etc.)

---

### Phase 3: Polish & Optimization (Week 5-6)
**Features**:
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Google Analytics integration
- [ ] Performance optimization
- [ ] Mobile responsiveness refinement
- [ ] Accessibility improvements (WCAG AA)
- [ ] Admin panel (manage packs, coupons, orders)
- [ ] Coupon usage analytics
- [ ] A/B testing setup
- [ ] Social proof (testimonials page)
- [ ] Refund/support system

---

## 10. COMPLETE COUPON LIST

### Romance Pack (20 coupons)
1. **Candlelit Dinner** - "Let's enjoy a romantic dinner at home with soft music and candles"
2. **Sunset Stroll** - "We can take a walk together during a beautiful sunset and relax on a blanket"
3. **Role-Playing Fantasy Night** - "Let's act out our wildest fantasies with a fun role-play scenario"
4. **Paint the Town Red** - "I'll take you for a night out at your favorite cocktail bar or restaurant"
5. **Breakfast in Bed** - "I'll treat you to breakfast in bed, with a special touch like a mimosa or small flower"
6. **Sexy Outfit Reveal** - "I'll surprise you with a sexy outfit, just for you"
7. **Romantic Photo Shoot** - "I'll plan a mini photo shoot with us, capturing our best moments together"
8. **Movie Night** - "I'll set up a cozy movie night with your favorite films and snacks"
9. **Slow Dance** - "Let's share a slow dance at home to one of our favorite love songs"
10. **Starry Night Date** - "We'll spend the evening stargazing and make a wish together"
11. **Massage Night** - "I'll give you a relaxing massage with scented oils and candles"
12. **Picnic in the Park** - "Let's enjoy a picnic with your favorite snacks in a scenic spot"
13. **Love Jar** - "I'll fill a jar with notes about why I love you, with little surprises"
14. **Handmade Gift** - "I'll make you a thoughtful, handmade gift to show my love"
15. **Personal Chauffeur** - "I'll drive you anywhere you want to go, your personal chauffeur for the day"
16-20. (Additional romance coupons)

### Acts of Service Pack
1. **Home Cooked Dinner Date** - "Candles, background music, and a peaceful meal together"
2. **Picnic in Park** - "Plan a picnic with your partner's favourite snacks"
3. **Short Stories** - "Write a short story together about how you met or favourite memories"
4-20. (Acts of service coupons)

### Making Memories Pack
1-20. (Memory-focused activity coupons)

---

## 11. STRIPE INTEGRATION DETAILS

### Checkout Flow
1. User clicks "Buy now" on pack detail page
2. Redirects to custom checkout page
3. Collect:
   - Buyer email
   - Partner name
   - Personal message (textarea)
   - Delivery preference (email/both)
4. Create Stripe Checkout Session
5. Redirect to Stripe Checkout
6. Handle webhook for successful payment
7. Generate access code + PDF
8. Send emails
9. Redirect to success page

### Products in Stripe
- Romance Pack (AUD$25)
- Acts of Service Pack (AUD$25)
- Making Memories Pack (AUD$25)
- Mother's Day Pack (AUD$20) - seasonal

---

## 12. EMAIL TEMPLATES NEEDED

1. **Gift Delivery Email** (to partner)
   - Subject: "[Name] sent you Couples Coupons! ❤️"
   - Personalized message
   - Access link + code
   - PDF attachment
   - Preview of pack

2. **Order Confirmation** (to buyer)
   - Subject: "Your Couples Coupons order is confirmed!"
   - Order details
   - Copy of PDF
   - Tips for presenting the gift

3. **Redemption Notification** (to gifter)
   - Subject: "[Partner] redeemed: [Coupon Name]! 💕"
   - Coupon details
   - Tips for fulfilling
   - Remaining coupon count

4. **Welcome Newsletter**
   - Subject: "Welcome to Couples Coupons!"
   - Relationship tips
   - Special offers

---

## 13. ADMIN REQUIREMENTS (Future)

### Admin Dashboard Needs
- View all orders
- View redemption rates
- Manage packs (add/edit/disable)
- Manage coupons (add/edit within packs)
- View revenue analytics
- Export customer emails
- Handle refunds/support tickets
- Manage seasonal campaigns
- Edit site content (About, FAQ)

---

## 14. SEO & MARKETING

### Target Keywords
- Digital love coupons
- Couples gift ideas
- Romantic gestures for couples
- Acts of service coupons
- Valentine's Day gift
- Anniversary gift for couples
- Long distance relationship gifts

### Meta Data
- Homepage: "Digital Couples Coupons | Romantic Gestures & Acts of Service"
- Pack pages: "[Pack Name] - Digital Coupon Pack for Couples | AUD$25"

### Blog Content Ideas
- "101 Acts of Service for Your Partner"
- "How to Keep Romance Alive in Long-Term Relationships"
- "The 5 Love Languages: Which One is Yours?"
- "Creative Date Night Ideas for Couples"

---

## 15. CRITICAL TECHNICAL DECISIONS

### Access Code System
- Generate unique 6-character codes (alphanumeric)
- Format: ABC123, DOC7NN
- Must be memorable and easy to type
- Check for profanity/confusing characters

### QR Code Implementation
- Generate QR code pointing to: `https://couplescoupons.com/redeem?code=ABC123`
- Embed in PDF card
- Size: 2x2 inches on card
- Error correction: Medium (M)

### PDF Generation
- Use react-pdf or similar
- Generate on order completion
- Include: Logo, personalized message, QR code, access code, branding
- Store PDFs temporarily or in S3
- Email as attachment

### Security
- Access codes should be single-use links (once accessed, tied to IP/session)
- Rate limiting on redemption endpoint
- CSRF protection on all forms
- Secure payment handling (PCI compliance via Stripe)

---

## 16. SUCCESS METRICS

### KPIs to Track
- Conversion rate (visitor → purchase)
- Average order value
- Redemption rate (% of coupons redeemed)
- Time to first redemption
- Customer acquisition cost
- Lifetime value
- Email open/click rates
- Blog traffic
- Social media engagement

### Initial Goals (3 months)
- 100 orders/month
- 70%+ redemption rate
- 500 email subscribers
- 5,000 monthly visitors

---

## 17. KNOWN EDGE CASES

1. **Lost access code**: Provide "resend email" option
2. **Partner doesn't have email**: PDF card with QR code
3. **Expired special offers**: Clear messaging on seasonal packs
4. **Refund requests**: 24-hour refund policy (if not accessed)
5. **Coupon not fulfilled**: Support system for disputes
6. **Multiple redemptions**: Prevent via database check
7. **Gifter doesn't fulfill**: Can't technically enforce, but tips help

---

---

## 21. UX IMPROVEMENTS & FEATURE ENHANCEMENTS

### Priority Improvements for Rebuild

#### 1. **Customizable Coupon Packs** ⭐ HIGH PRIORITY
**Problem**: Users are locked into pre-made packs of 20 coupons
**Solution**: Add "Build Your Own Pack" feature

**Implementation:**
- New page: `/packs/custom`
- User flow:
  1. Click "Create Custom Pack" on homepage/pack listing
  2. Select desired number of coupons (10, 20, 30, 40)
  3. Browse all available coupons across all categories
  4. Add/remove coupons to build custom pack
  5. See price calculate dynamically (e.g., $1.50/coupon)
  6. Preview pack before purchase
  7. Name custom pack (optional)
  8. Proceed to checkout

**UI Components Needed:**
- Coupon browser with category filters
- Shopping cart sidebar showing selected coupons
- Drag-and-drop interface (optional, nice-to-have)
- Counter showing coupons selected (e.g., "15/20 selected")
- "Add to Pack" / "Remove" buttons on each coupon card

**Pricing Strategy:**
- Standard packs: $25 for 20 coupons
- Custom packs: 
  - 10 coupons: $15
  - 20 coupons: $25
  - 30 coupons: $35
  - 40 coupons: $45
  - Or: $1.25-$1.50 per coupon

**Technical Considerations:**
- Database: Add `is_custom` boolean to Packs table
- Store custom coupon selections in JSON field or junction table
- Generate unique pack preview for custom orders

---

#### 2. **Improved Redemption Experience**
**Current State**: Simple "Redeem" button, no visual feedback
**Enhancements:**

**A. Redemption Confirmation Modal**
- Click "Redeem" → Modal appears
- Modal content:
  - "Are you sure you want to redeem this coupon?"
  - Coupon title and description
  - "Yes, Redeem" / "Cancel" buttons
- Prevents accidental redemptions

**B. Post-Redemption State**
- Button changes to: "Redeemed ✓" (disabled, gray)
- Show redemption date below coupon
- Add "Tips for fulfilling" section (expandable)
- Optional: Add photos after fulfillment

**C. Redemption History**
- New page: `/my-pack/[code]/history`
- Shows all redeemed coupons with dates
- Timeline view of redemptions
- Stats: "You've redeemed 8/20 coupons"

---

#### 3. **Enhanced Pack Preview**
**Current**: Grid of 6 sample coupons
**Improvements:**

**A. View All Coupons Before Purchase**
- "View all 20 coupons" button on pack detail page
- Opens modal or new page showing complete list
- Helps users make informed decisions

**B. Sample Pack Demo**
- "Try Demo Pack" feature
- Generate temporary access code for demo
- Shows full redemption flow
- Watermarked coupons (not redeemable)
- Converts users by showing actual experience

---

#### 4. **Gift Delivery Options**
**Current**: Instant email only
**Add:**

**A. Scheduled Delivery**
- Choose delivery date/time during checkout
- Use case: Order now, deliver on anniversary/birthday
- Timezone selection

**B. Gift Message Preview**
- Show preview of email/PDF before purchase
- Edit personalization in real-time
- See exactly what partner will receive

**C. Multiple Delivery Methods**
- Email only (current)
- Email + Physical card (shipped, +$5)
- Just PDF for self-printing
- SMS delivery option

---

#### 5. **Social Proof & Testimonials**
**Add to Homepage:**
- Video testimonials section (already visible in screenshot)
- Star ratings aggregate
- "Join [X] couples who've..." social proof
- Instagram feed integration (@CouplesCoupons)
- Before/After stories: "We were stuck in a rut → Now we have date night every week"

---

#### 6. **Progress Tracking for Gifters**
**New Feature: Gifter Dashboard**
- Access via email link or account
- See which coupons have been redeemed
- Track redemption dates
- Redemption rate: "75% redeemed (15/20)"
- Reminder to fulfill unredeemed coupons
- Add notes after fulfilling each coupon

---

#### 7. **Mobile App Features**
**Future: Native Mobile App**
- Push notifications when coupon redeemed
- Quick coupon browsing
- Camera integration for custom photo coupons
- Share fulfilled coupon photos
- In-app redemption

---

#### 8. **Subscription Model**
**"Monthly Surprise" Subscription**
- $10/month
- Receive 5 new surprise coupons monthly
- Themed each month (e.g., "Adventure Month", "Cozy Month")
- Cancel anytime
- Great for long-term relationships

---

#### 9. **Couple Challenges**
**Gamification Feature**
- "30-Day Romance Challenge"
- "Acts of Service Streak"
- Track consecutive weeks with redeemed coupons
- Badges and achievements
- Shareable progress cards for social media

---

#### 10. **Improved Content & SEO**

**Blog Enhancements:**
- Weekly relationship tips
- "Coupon of the Week" spotlight
- User-submitted stories
- Expert relationship advice column
- Video content (YouTube integration)

**Email Sequences:**
- Welcome series (5 emails)
- Post-purchase: "How to present your gift"
- Weekly: "Don't forget to redeem!"
- Re-engagement: "It's been a while..."
- Winback: "We miss you"

---

#### 11. **Referral Program**
**"Share the Love" Program**
- Give $5, Get $5 credit
- Unique referral code for each customer
- Track referrals in dashboard
- Shareable social cards
- Affiliate program for bloggers

---

#### 12. **Analytics Dashboard (Admin)**
**Key Metrics to Track:**
- Conversion rate by pack type
- Redemption rates (overall and by pack)
- Average time to first redemption
- Most popular coupons
- Drop-off points in checkout
- Revenue by channel
- Customer lifetime value
- Email open/click rates

---

#### 13. **Accessibility Improvements**
**WCAG 2.1 AA Compliance:**
- Keyboard navigation for all interactions
- Screen reader optimization
- Color contrast fixes
- Focus indicators
- Alt text for all images
- Captions for video testimonials
- Skip to content links

---

#### 14. **Performance Optimizations**
**Speed Improvements:**
- Image optimization (WebP format)
- Lazy loading for coupon cards
- Code splitting
- CDN for static assets
- Route prefetching
- Lighthouse score: 90+ on all metrics

---

#### 15. **International Expansion**
**Multi-Currency Support:**
- Auto-detect user location
- Support: AUD, USD, GBP, EUR, CAD
- Currency switcher in header

**Multi-Language:**
- English (default)
- Spanish
- French
- German
- Localized coupon content

---

### Implementation Roadmap

**Phase 1 (Week 1-2): Core Rebuild**
- Replicate existing functionality
- Modern tech stack
- Improved performance

**Phase 2 (Week 3-4): Quick Wins**
- ✅ Customizable packs (build your own)
- ✅ Scheduled delivery
- ✅ Improved redemption UX
- ✅ Pack preview enhancements

**Phase 3 (Week 5-6): Growth Features**
- Referral program
- Social proof integration
- Blog setup
- Email sequences

**Phase 4 (Month 2-3): Advanced**
- Subscription model
- Mobile app planning
- Gamification
- Analytics dashboard

**Phase 5 (Ongoing): Optimization**
- A/B testing
- SEO optimization
- Content marketing
- Performance monitoring

---

### Quick Code-Level Improvements for Claude Code

#### Better Form Validation
```typescript
// Current: Basic required field validation
// Improved: Real-time validation with helpful errors

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  giftReceiverName: z.string().min(2, "Receiver name required"),
  personalMessage: z.string().max(500, "Message too long (max 500 chars)").optional(),
  promoCode: z.string().optional()
});
```

#### Smart Promotional Code System
```typescript
// Flexible promo code types:
// - Percentage off (e.g., "SAVE20" = 20% off)
// - Fixed amount (e.g., "5OFF" = $5 off)
// - Free shipping (future)
// - Buy one get one
// - First-time customer only
```

#### Coupon Redemption Lock
```typescript
// Prevent accidental double-redemption
// Add confirmation step
// Add "undo" within 5 minutes
```

#### Email Template System
```typescript
// Use React Email for better templates
// Dynamic content based on pack type
// Personalization tokens
// A/B testing support
```

---

### User Feedback Integration Plan

**Collect Feedback:**
- Post-purchase survey (after 7 days)
- Net Promoter Score (NPS)
- Feature request form
- Live chat support (Intercom/Crisp)
- Social media listening

**Iterate Based On:**
- Most requested features
- Common pain points
- Drop-off analysis
- Competitor analysis
- Market trends

---

**These improvements will transform CoupleCoupons from a simple digital product into a comprehensive relationship platform, driving higher conversions, better user retention, and increased customer lifetime value.**

---

## 19. CONTENT PAGES

### About Page Content
*"At Couples Coupons, we believe that the little things matter most in a relationship. Whether it's a heartfelt gesture, a fun surprise, or a simple reminder that says, 'I care,' our mission is to bring couples closer together in meaningful and memorable ways.*

*Our thoughtfully designed coupons are more than just pieces of paper—they're an invitation to create moments that strengthen your bond. From breakfast in bed to spontaneous date nights, each coupon is a spark for love, laughter, and connection.*

*We started Couples Coupons because we know life gets busy, and sometimes it's easy to overlook those small but meaningful acts of love. That's where we come in! Our goal is to make it easy for couples to show appreciation and keep the romance alive, no matter how hectic life gets."*

### How It Works
1. **You gift it** - Pick the perfect pack of thoughtful, romantic, or fun coupons and send it to your partner via email or a printable PDF card
2. **They redeem it** - Your partner redeems coupons online using their unique access link and code whenever they choose
3. **You fulfill it** - You'll get notified so you can turn their chosen coupon into reality! Make the gesture, create the memory, and enjoy the moment together

---

## 20. FINAL NOTES FOR CLAUDE CODE

### Project Setup Command
```bash
npx create-next-app@latest couplescoupons --typescript --tailwind --app
cd couplescoupons
npm install @stripe/stripe-js stripe prisma @prisma/client
npm install react-hook-form zod @hookform/resolvers
npm install nodemailer qrcode react-pdf
npm install lucide-react
```

### Environment Variables Needed
```
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
SENDGRID_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

### Folder Structure
```
/app
  /(marketing)
    /page.tsx (homepage)
    /about/page.tsx
    /how-it-works/page.tsx
    /blog/page.tsx
  /packs
    /page.tsx (listing)
    /[slug]/page.tsx (detail)
  /checkout/[packId]/page.tsx
  /redeem/page.tsx
  /api
    /checkout/route.ts
    /webhooks/stripe/route.ts
    /redeem/route.ts
/components
  /ui (shadcn components)
  /coupon-card.tsx
  /pack-card.tsx
  /navbar.tsx
  /footer.tsx
/lib
  /db.ts (Prisma client)
  /stripe.ts
  /email.ts
  /pdf.ts
/prisma
  /schema.prisma
```

### Design Tokens
```css
:root {
  --primary: #D64933;
  --background: #FFE5E0;
  --card: #FFFFFF;
  --text: #1A1A1A;
  --text-muted: #6B6B6B;
}
```

---

**This PRD is ready for Claude Code. Provide this document along with the screenshots and any additional Bubble editor screenshots for database schema, workflows, and custom states.**
,
  is_active BOOLEAN DEFAULT true,
  is_seasonal BOOLEAN DEFAULT false,
  whats_included TEXT[], -- Array of bullet points
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Templates (Master coupons that belong to packs)
CREATE TABLE coupon_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id UUID NOT NULL REFERENCES coupon_packs(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  tip TEXT, -- Tips for fulfilling this coupon
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- Human-readable order ID
  access_code VARCHAR(10) UNIQUE NOT NULL, -- e.g., "GRLOK0"
  access_url TEXT UNIQUE NOT NULL,
  
  -- Buyer information
  buyer_email VARCHAR(255) NOT NULL,
  buyer_name VARCHAR(200) NOT NULL,
  
  -- Recipient information
  receiver_name VARCHAR(200) NOT NULL,
  custom_message TEXT,
  
  -- Pack information
  pack_id UUID NOT NULL REFERENCES coupon_packs(id),
  pack_name VARCHAR(100) NOT NULL, -- Denormalized for history
  pack_price DECIMAL(10, 2) NOT NULL,
  currency_code VARCHAR(3) DEFAULT 'AUD',
  
  -- Payment
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  promo_code VARCHAR(50),
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  final_amount DECIMAL(10, 2) NOT NULL,
  status order_status DEFAULT 'pending',
  
  -- PDF generation
  pdf_url TEXT,
  qr_code_url TEXT,
  pdf_generated_at TIMESTAMP WITH TIME ZONE,
  
  -- Delivery
  email_sent_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Coupons (Redeemable instances)
CREATE TABLE user_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  coupon_template_id UUID NOT NULL REFERENCES coupon_templates(id),
  
  -- Denormalized data (snapshot at purchase time)
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  tip TEXT,
  
  -- Redemption tracking
  is_redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(order_id, coupon_template_id)
);

-- Promo Codes
CREATE TYPE promo_type AS ENUM ('percentage', 'fixed_amount', 'free');

CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type promo_type NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL, -- 20 for 20%, or 5 for $5 off
  max_uses INTEGER, -- NULL = unlimited
  times_used INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  short_description TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  published_date DATE,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Currency Mappings
CREATE TABLE currency_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(3) UNIQUE NOT NULL, -- "AUD", "USD"
  name VARCHAR(100) NOT NULL, -- "Australian Dollar"
  symbol VARCHAR(5) NOT NULL, -- "$"
  region VARCHAR(100), -- "Australia"
  countries TEXT[], -- ["Australia", "Kiribati"]
  exchange_rate DECIMAL(10, 4) DEFAULT 1.00, -- Relative to base currency
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_access_code ON orders(access_code);
CREATE INDEX idx_orders_buyer_email ON orders(buyer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_user_coupons_order_id ON user_coupons(order_id);
CREATE INDEX idx_user_coupons_redeemed ON user_coupons(is_redeemed);
CREATE INDEX idx_coupon_templates_pack_id ON coupon_templates(pack_id);
```

---

### Data Migration Notes

**Bubble → PostgreSQL Migration:**
1. Export all data from Bubble (CSV or API)
2. Map old field names to new schema
3. Handle Bubble's weird "List of X" relationships
4. Generate missing fields (order_number, proper slugs)
5. Validate data integrity

**Key Transformations:**
- `Code` → `access_code`
- `Receiver name` → `receiver_name`
- `Coupon(User)` → `user_coupons`
- `CouponTemplate` → `coupon_templates`
- `Status (yes/no)` → `is_redeemed (boolean)`
- Lists → Proper foreign key relationships

---

## 6. USER FLOWS

### Flow 1: Purchase & Gift
```
1. Buyer visits homepage
2. Explores "Coupon Packs" dropdown or clicks "Buy now"
3. Browses available packs
4. Selects pack → Views details & preview
5. Clicks "Buy now"
6. Checkout:
   - Enters personal info
   - Enters partner's name
   - Writes personal message
   - Chooses delivery (email/PDF)
   - Completes payment
7. Receives confirmation email with PDF
8. Partner receives gift email/PDF with access link + code
```

### Flow 2: Redemption & Notification
```
1. Partner opens email or PDF
2. Clicks link or scans QR code
3. Enters access code
4. Views digital coupon pack (20 coupons)
5. Browses coupons
6. Selects coupon to redeem
7. Clicks "Redeem" button
8. Confirmation shown to partner
9. Notification email sent to gifter
10. Gifter fulfills the coupon/gesture
```

### Flow 3: Content/Newsletter
```
1. User scrolls to footer
2. Enters email in "Subscribe for deals and relationship tips"
3. Clicks "Subscribe"
4. Added to email list
5. Receives welcome email + future content
```

---

## 7. DESIGN SYSTEM

### Brand Colors
- **Primary Red**: #D64933 (buttons, accents)
- **Light Pink/Peach**: #FFE5E0 (backgrounds)
- **Dark Text**: #1A1A1A (headings)
- **Medium Gray**: #6B6B6B (body text)
- **White**: #FFFFFF (cards, backgrounds)

### Typography
- **Headings**: Bold, sans-serif (likely Inter or similar)
- **Body**: Regular sans-serif
- **Script/Handwriting**: Used for "Let's make memories" on PDF card

### UI Components
- **Cards**: White background, rounded corners, subtle shadow
- **Buttons**: 
  - Primary: Red (#D64933), rounded-full, white text
  - Secondary: Red outline, transparent background
- **Icons**: Line-art style illustrations (hearts, feathers, gifts)
- **Illustrations**: Hand-drawn, minimalist style
- **Coupon Cards**: Circular icon background (light peach), centered design

### Responsive Design
- Desktop navigation with dropdown
- Mobile-friendly layouts
- Touch-friendly coupon cards

---

## 8. TECHNICAL REQUIREMENTS

### Frontend Stack (Recommended)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui or custom components
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context or Zustand (if needed)

### Backend & Database
- **Database**: PostgreSQL (Supabase or Neon)
- **ORM**: Prisma or Drizzle
- **API**: Next.js API routes
- **Authentication**: NextAuth.js (optional, for user accounts)

### Third-Party Integrations
- **Payment**: Stripe Checkout
- **Email**: 
  - Transactional: SendGrid or Resend
  - Marketing: Mailchimp or ConvertKit
- **PDF Generation**: 
  - react-pdf or pdf-lib
  - Generate QR codes: qrcode library
- **File Storage**: 
  - Cloudinary or AWS S3 (for coupon images)
- **Analytics**: Google Analytics 4

### Hosting & Deployment
- **Platform**: Vercel
- **Domain**: couplescoupons.com
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Vercel)

---

## 9. IMPLEMENTATION PHASES

### Phase 1: MVP (Week 1-2)
**Goal**: Get basic purchase and redemption flow working

**Features**:
- [ ] Homepage with hero + sample coupons
- [ ] Pack listing page (3 packs)
- [ ] Pack detail page with "What's included"
- [ ] Basic Stripe checkout
- [ ] Order confirmation email
- [ ] PDF card generation with QR code + access code
- [ ] Redemption page (access code entry)
- [ ] View coupons page
- [ ] Redeem coupon functionality
- [ ] Email notification to gifter on redemption

**Database**:
- Users (optional for MVP)
- Orders
- Packs
- Coupons (templates)
- UserCoupons (instances)

---

### Phase 2: Enhanced Features (Week 3-4)
**Features**:
- [ ] About page
- [ ] How It Works page
- [ ] FAQ page with accordion
- [ ] Blog setup (simple CMS or markdown)
- [ ] Newsletter signup + integration
- [ ] Pack preview pages (show sample coupons)
- [ ] Custom personalization during checkout
- [ ] Order history page (if user accounts added)
- [ ] Email templates (branded)
- [ ] Seasonal pack system (Mother's Day, etc.)

---

### Phase 3: Polish & Optimization (Week 5-6)
**Features**:
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Google Analytics integration
- [ ] Performance optimization
- [ ] Mobile responsiveness refinement
- [ ] Accessibility improvements (WCAG AA)
- [ ] Admin panel (manage packs, coupons, orders)
- [ ] Coupon usage analytics
- [ ] A/B testing setup
- [ ] Social proof (testimonials page)
- [ ] Refund/support system

---

## 10. COMPLETE COUPON LIST

### Romance Pack (20 coupons)
1. **Candlelit Dinner** - "Let's enjoy a romantic dinner at home with soft music and candles"
2. **Sunset Stroll** - "We can take a walk together during a beautiful sunset and relax on a blanket"
3. **Role-Playing Fantasy Night** - "Let's act out our wildest fantasies with a fun role-play scenario"
4. **Paint the Town Red** - "I'll take you for a night out at your favorite cocktail bar or restaurant"
5. **Breakfast in Bed** - "I'll treat you to breakfast in bed, with a special touch like a mimosa or small flower"
6. **Sexy Outfit Reveal** - "I'll surprise you with a sexy outfit, just for you"
7. **Romantic Photo Shoot** - "I'll plan a mini photo shoot with us, capturing our best moments together"
8. **Movie Night** - "I'll set up a cozy movie night with your favorite films and snacks"
9. **Slow Dance** - "Let's share a slow dance at home to one of our favorite love songs"
10. **Starry Night Date** - "We'll spend the evening stargazing and make a wish together"
11. **Massage Night** - "I'll give you a relaxing massage with scented oils and candles"
12. **Picnic in the Park** - "Let's enjoy a picnic with your favorite snacks in a scenic spot"
13. **Love Jar** - "I'll fill a jar with notes about why I love you, with little surprises"
14. **Handmade Gift** - "I'll make you a thoughtful, handmade gift to show my love"
15. **Personal Chauffeur** - "I'll drive you anywhere you want to go, your personal chauffeur for the day"
16-20. (Additional romance coupons)

### Acts of Service Pack
1. **Home Cooked Dinner Date** - "Candles, background music, and a peaceful meal together"
2. **Picnic in Park** - "Plan a picnic with your partner's favourite snacks"
3. **Short Stories** - "Write a short story together about how you met or favourite memories"
4-20. (Acts of service coupons)

### Making Memories Pack
1-20. (Memory-focused activity coupons)

---

## 11. STRIPE INTEGRATION DETAILS

### Checkout Flow
1. User clicks "Buy now" on pack detail page
2. Redirects to custom checkout page
3. Collect:
   - Buyer email
   - Partner name
   - Personal message (textarea)
   - Delivery preference (email/both)
4. Create Stripe Checkout Session
5. Redirect to Stripe Checkout
6. Handle webhook for successful payment
7. Generate access code + PDF
8. Send emails
9. Redirect to success page

### Products in Stripe
- Romance Pack (AUD$25)
- Acts of Service Pack (AUD$25)
- Making Memories Pack (AUD$25)
- Mother's Day Pack (AUD$20) - seasonal

---

## 12. EMAIL TEMPLATES NEEDED

1. **Gift Delivery Email** (to partner)
   - Subject: "[Name] sent you Couples Coupons! ❤️"
   - Personalized message
   - Access link + code
   - PDF attachment
   - Preview of pack

2. **Order Confirmation** (to buyer)
   - Subject: "Your Couples Coupons order is confirmed!"
   - Order details
   - Copy of PDF
   - Tips for presenting the gift

3. **Redemption Notification** (to gifter)
   - Subject: "[Partner] redeemed: [Coupon Name]! 💕"
   - Coupon details
   - Tips for fulfilling
   - Remaining coupon count

4. **Welcome Newsletter**
   - Subject: "Welcome to Couples Coupons!"
   - Relationship tips
   - Special offers

---

## 13. ADMIN REQUIREMENTS (Future)

### Admin Dashboard Needs
- View all orders
- View redemption rates
- Manage packs (add/edit/disable)
- Manage coupons (add/edit within packs)
- View revenue analytics
- Export customer emails
- Handle refunds/support tickets
- Manage seasonal campaigns
- Edit site content (About, FAQ)

---

## 14. SEO & MARKETING

### Target Keywords
- Digital love coupons
- Couples gift ideas
- Romantic gestures for couples
- Acts of service coupons
- Valentine's Day gift
- Anniversary gift for couples
- Long distance relationship gifts

### Meta Data
- Homepage: "Digital Couples Coupons | Romantic Gestures & Acts of Service"
- Pack pages: "[Pack Name] - Digital Coupon Pack for Couples | AUD$25"

### Blog Content Ideas
- "101 Acts of Service for Your Partner"
- "How to Keep Romance Alive in Long-Term Relationships"
- "The 5 Love Languages: Which One is Yours?"
- "Creative Date Night Ideas for Couples"

---

## 15. CRITICAL TECHNICAL DECISIONS

### Access Code System
- Generate unique 6-character codes (alphanumeric)
- Format: ABC123, DOC7NN
- Must be memorable and easy to type
- Check for profanity/confusing characters

### QR Code Implementation
- Generate QR code pointing to: `https://couplescoupons.com/redeem?code=ABC123`
- Embed in PDF card
- Size: 2x2 inches on card
- Error correction: Medium (M)

### PDF Generation
- Use react-pdf or similar
- Generate on order completion
- Include: Logo, personalized message, QR code, access code, branding
- Store PDFs temporarily or in S3
- Email as attachment

### Security
- Access codes should be single-use links (once accessed, tied to IP/session)
- Rate limiting on redemption endpoint
- CSRF protection on all forms
- Secure payment handling (PCI compliance via Stripe)

---

## 16. SUCCESS METRICS

### KPIs to Track
- Conversion rate (visitor → purchase)
- Average order value
- Redemption rate (% of coupons redeemed)
- Time to first redemption
- Customer acquisition cost
- Lifetime value
- Email open/click rates
- Blog traffic
- Social media engagement

### Initial Goals (3 months)
- 100 orders/month
- 70%+ redemption rate
- 500 email subscribers
- 5,000 monthly visitors

---

## 17. KNOWN EDGE CASES

1. **Lost access code**: Provide "resend email" option
2. **Partner doesn't have email**: PDF card with QR code
3. **Expired special offers**: Clear messaging on seasonal packs
4. **Refund requests**: 24-hour refund policy (if not accessed)
5. **Coupon not fulfilled**: Support system for disputes
6. **Multiple redemptions**: Prevent via database check
7. **Gifter doesn't fulfill**: Can't technically enforce, but tips help

---

---

## 21. UX IMPROVEMENTS & FEATURE ENHANCEMENTS

### Priority Improvements for Rebuild

#### 1. **Customizable Coupon Packs** ⭐ HIGH PRIORITY
**Problem**: Users are locked into pre-made packs of 20 coupons
**Solution**: Add "Build Your Own Pack" feature

**Implementation:**
- New page: `/packs/custom`
- User flow:
  1. Click "Create Custom Pack" on homepage/pack listing
  2. Select desired number of coupons (10, 20, 30, 40)
  3. Browse all available coupons across all categories
  4. Add/remove coupons to build custom pack
  5. See price calculate dynamically (e.g., $1.50/coupon)
  6. Preview pack before purchase
  7. Name custom pack (optional)
  8. Proceed to checkout

**UI Components Needed:**
- Coupon browser with category filters
- Shopping cart sidebar showing selected coupons
- Drag-and-drop interface (optional, nice-to-have)
- Counter showing coupons selected (e.g., "15/20 selected")
- "Add to Pack" / "Remove" buttons on each coupon card

**Pricing Strategy:**
- Standard packs: $25 for 20 coupons
- Custom packs: 
  - 10 coupons: $15
  - 20 coupons: $25
  - 30 coupons: $35
  - 40 coupons: $45
  - Or: $1.25-$1.50 per coupon

**Technical Considerations:**
- Database: Add `is_custom` boolean to Packs table
- Store custom coupon selections in JSON field or junction table
- Generate unique pack preview for custom orders

---

#### 2. **Improved Redemption Experience**
**Current State**: Simple "Redeem" button, no visual feedback
**Enhancements:**

**A. Redemption Confirmation Modal**
- Click "Redeem" → Modal appears
- Modal content:
  - "Are you sure you want to redeem this coupon?"
  - Coupon title and description
  - "Yes, Redeem" / "Cancel" buttons
- Prevents accidental redemptions

**B. Post-Redemption State**
- Button changes to: "Redeemed ✓" (disabled, gray)
- Show redemption date below coupon
- Add "Tips for fulfilling" section (expandable)
- Optional: Add photos after fulfillment

**C. Redemption History**
- New page: `/my-pack/[code]/history`
- Shows all redeemed coupons with dates
- Timeline view of redemptions
- Stats: "You've redeemed 8/20 coupons"

---

#### 3. **Enhanced Pack Preview**
**Current**: Grid of 6 sample coupons
**Improvements:**

**A. View All Coupons Before Purchase**
- "View all 20 coupons" button on pack detail page
- Opens modal or new page showing complete list
- Helps users make informed decisions

**B. Sample Pack Demo**
- "Try Demo Pack" feature
- Generate temporary access code for demo
- Shows full redemption flow
- Watermarked coupons (not redeemable)
- Converts users by showing actual experience

---

#### 4. **Gift Delivery Options**
**Current**: Instant email only
**Add:**

**A. Scheduled Delivery**
- Choose delivery date/time during checkout
- Use case: Order now, deliver on anniversary/birthday
- Timezone selection

**B. Gift Message Preview**
- Show preview of email/PDF before purchase
- Edit personalization in real-time
- See exactly what partner will receive

**C. Multiple Delivery Methods**
- Email only (current)
- Email + Physical card (shipped, +$5)
- Just PDF for self-printing
- SMS delivery option

---

#### 5. **Social Proof & Testimonials**
**Add to Homepage:**
- Video testimonials section (already visible in screenshot)
- Star ratings aggregate
- "Join [X] couples who've..." social proof
- Instagram feed integration (@CouplesCoupons)
- Before/After stories: "We were stuck in a rut → Now we have date night every week"

---

#### 6. **Progress Tracking for Gifters**
**New Feature: Gifter Dashboard**
- Access via email link or account
- See which coupons have been redeemed
- Track redemption dates
- Redemption rate: "75% redeemed (15/20)"
- Reminder to fulfill unredeemed coupons
- Add notes after fulfilling each coupon

---

#### 7. **Mobile App Features**
**Future: Native Mobile App**
- Push notifications when coupon redeemed
- Quick coupon browsing
- Camera integration for custom photo coupons
- Share fulfilled coupon photos
- In-app redemption

---

#### 8. **Subscription Model**
**"Monthly Surprise" Subscription**
- $10/month
- Receive 5 new surprise coupons monthly
- Themed each month (e.g., "Adventure Month", "Cozy Month")
- Cancel anytime
- Great for long-term relationships

---

#### 9. **Couple Challenges**
**Gamification Feature**
- "30-Day Romance Challenge"
- "Acts of Service Streak"
- Track consecutive weeks with redeemed coupons
- Badges and achievements
- Shareable progress cards for social media

---

#### 10. **Improved Content & SEO**

**Blog Enhancements:**
- Weekly relationship tips
- "Coupon of the Week" spotlight
- User-submitted stories
- Expert relationship advice column
- Video content (YouTube integration)

**Email Sequences:**
- Welcome series (5 emails)
- Post-purchase: "How to present your gift"
- Weekly: "Don't forget to redeem!"
- Re-engagement: "It's been a while..."
- Winback: "We miss you"

---

#### 11. **Referral Program**
**"Share the Love" Program**
- Give $5, Get $5 credit
- Unique referral code for each customer
- Track referrals in dashboard
- Shareable social cards
- Affiliate program for bloggers

---

#### 12. **Analytics Dashboard (Admin)**
**Key Metrics to Track:**
- Conversion rate by pack type
- Redemption rates (overall and by pack)
- Average time to first redemption
- Most popular coupons
- Drop-off points in checkout
- Revenue by channel
- Customer lifetime value
- Email open/click rates

---

#### 13. **Accessibility Improvements**
**WCAG 2.1 AA Compliance:**
- Keyboard navigation for all interactions
- Screen reader optimization
- Color contrast fixes
- Focus indicators
- Alt text for all images
- Captions for video testimonials
- Skip to content links

---

#### 14. **Performance Optimizations**
**Speed Improvements:**
- Image optimization (WebP format)
- Lazy loading for coupon cards
- Code splitting
- CDN for static assets
- Route prefetching
- Lighthouse score: 90+ on all metrics

---

#### 15. **International Expansion**
**Multi-Currency Support:**
- Auto-detect user location
- Support: AUD, USD, GBP, EUR, CAD
- Currency switcher in header

**Multi-Language:**
- English (default)
- Spanish
- French
- German
- Localized coupon content

---

### Implementation Roadmap

**Phase 1 (Week 1-2): Core Rebuild**
- Replicate existing functionality
- Modern tech stack
- Improved performance

**Phase 2 (Week 3-4): Quick Wins**
- ✅ Customizable packs (build your own)
- ✅ Scheduled delivery
- ✅ Improved redemption UX
- ✅ Pack preview enhancements

**Phase 3 (Week 5-6): Growth Features**
- Referral program
- Social proof integration
- Blog setup
- Email sequences

**Phase 4 (Month 2-3): Advanced**
- Subscription model
- Mobile app planning
- Gamification
- Analytics dashboard

**Phase 5 (Ongoing): Optimization**
- A/B testing
- SEO optimization
- Content marketing
- Performance monitoring

---

### Quick Code-Level Improvements for Claude Code

#### Better Form Validation
```typescript
// Current: Basic required field validation
// Improved: Real-time validation with helpful errors

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  giftReceiverName: z.string().min(2, "Receiver name required"),
  personalMessage: z.string().max(500, "Message too long (max 500 chars)").optional(),
  promoCode: z.string().optional()
});
```

#### Smart Promotional Code System
```typescript
// Flexible promo code types:
// - Percentage off (e.g., "SAVE20" = 20% off)
// - Fixed amount (e.g., "5OFF" = $5 off)
// - Free shipping (future)
// - Buy one get one
// - First-time customer only
```

#### Coupon Redemption Lock
```typescript
// Prevent accidental double-redemption
// Add confirmation step
// Add "undo" within 5 minutes
```

#### Email Template System
```typescript
// Use React Email for better templates
// Dynamic content based on pack type
// Personalization tokens
// A/B testing support
```

---

### User Feedback Integration Plan

**Collect Feedback:**
- Post-purchase survey (after 7 days)
- Net Promoter Score (NPS)
- Feature request form
- Live chat support (Intercom/Crisp)
- Social media listening

**Iterate Based On:**
- Most requested features
- Common pain points
- Drop-off analysis
- Competitor analysis
- Market trends

---

**These improvements will transform CoupleCoupons from a simple digital product into a comprehensive relationship platform, driving higher conversions, better user retention, and increased customer lifetime value.**

---

## 19. CONTENT PAGES

### About Page Content
*"At Couples Coupons, we believe that the little things matter most in a relationship. Whether it's a heartfelt gesture, a fun surprise, or a simple reminder that says, 'I care,' our mission is to bring couples closer together in meaningful and memorable ways.*

*Our thoughtfully designed coupons are more than just pieces of paper—they're an invitation to create moments that strengthen your bond. From breakfast in bed to spontaneous date nights, each coupon is a spark for love, laughter, and connection.*

*We started Couples Coupons because we know life gets busy, and sometimes it's easy to overlook those small but meaningful acts of love. That's where we come in! Our goal is to make it easy for couples to show appreciation and keep the romance alive, no matter how hectic life gets."*

### How It Works
1. **You gift it** - Pick the perfect pack of thoughtful, romantic, or fun coupons and send it to your partner via email or a printable PDF card
2. **They redeem it** - Your partner redeems coupons online using their unique access link and code whenever they choose
3. **You fulfill it** - You'll get notified so you can turn their chosen coupon into reality! Make the gesture, create the memory, and enjoy the moment together

---

## 20. FINAL NOTES FOR CLAUDE CODE

### Project Setup Command
```bash
npx create-next-app@latest couplescoupons --typescript --tailwind --app
cd couplescoupons
npm install @stripe/stripe-js stripe prisma @prisma/client
npm install react-hook-form zod @hookform/resolvers
npm install nodemailer qrcode react-pdf
npm install lucide-react
```

### Environment Variables Needed
```
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
SENDGRID_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

### Folder Structure
```
/app
  /(marketing)
    /page.tsx (homepage)
    /about/page.tsx
    /how-it-works/page.tsx
    /blog/page.tsx
  /packs
    /page.tsx (listing)
    /[slug]/page.tsx (detail)
  /checkout/[packId]/page.tsx
  /redeem/page.tsx
  /api
    /checkout/route.ts
    /webhooks/stripe/route.ts
    /redeem/route.ts
/components
  /ui (shadcn components)
  /coupon-card.tsx
  /pack-card.tsx
  /navbar.tsx
  /footer.tsx
/lib
  /db.ts (Prisma client)
  /stripe.ts
  /email.ts
  /pdf.ts
/prisma
  /schema.prisma
```

### Design Tokens
```css
:root {
  --primary: #D64933;
  --background: #FFE5E0;
  --card: #FFFFFF;
  --text: #1A1A1A;
  --text-muted: #6B6B6B;
}
```

---

**This PRD is ready for Claude Code. Provide this document along with the screenshots and any additional Bubble editor screenshots for database schema, workflows, and custom states.**
,
  is_active BOOLEAN DEFAULT true,
  is_seasonal BOOLEAN DEFAULT false,
  whats_included TEXT[], -- ["Personalized message", "Unique weblink", ...]
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Templates (20 per pack)
CREATE TABLE coupon_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id UUID NOT NULL REFERENCES coupon_packs(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL, -- "Candlelit Dinner"
  description TEXT NOT NULL, -- "Let's enjoy a romantic dinner..."
  icon_url TEXT, -- Feather illustration
  tip TEXT, -- "Set the mood with candles and soft music"
  display_order INTEGER DEFAULT 0, -- Order within pack (1-20)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders (contains ALL buyer/receiver data - no user accounts)
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., "1759832123507x584259723588010000"
  access_code VARCHAR(10) UNIQUE NOT NULL, -- e.g., "GRLOK0"
  access_url TEXT UNIQUE NOT NULL, -- https://couplescoupons.com/redeem?code=GRLOK0
  
  -- Buyer information (no user account, just order data)
  buyer_email VARCHAR(255) NOT NULL,
  buyer_name VARCHAR(200) NOT NULL,
  
  -- Recipient information
  receiver_name VARCHAR(200) NOT NULL,
  custom_message TEXT,
  
  -- Pack information (denormalized for order history)
  pack_id UUID NOT NULL REFERENCES coupon_packs(id),
  pack_name VARCHAR(100) NOT NULL,
  pack_price DECIMAL(10, 2) NOT NULL,
  currency_code VARCHAR(3) DEFAULT 'AUD',
  
  -- Payment via Stripe
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  promo_code VARCHAR(50),
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  final_amount DECIMAL(10, 2) NOT NULL,
  status order_status DEFAULT 'pending',
  
  -- PDF card generation
  pdf_url TEXT,
  qr_code_url TEXT,
  pdf_generated_at TIMESTAMP WITH TIME ZONE,
  
  -- Email delivery (via Postmark)
  confirmation_email_sent_at TIMESTAMP WITH TIME ZONE,
  gift_email_sent_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Coupons (redeemable instances tied to orders)
CREATE TABLE user_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  coupon_template_id UUID NOT NULL REFERENCES coupon_templates(id),
  
  -- Snapshot at purchase (denormalized so template changes don't affect old orders)
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  tip TEXT,
  
  -- Redemption tracking
  is_redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(order_id, coupon_template_id) -- Can't duplicate coupons in same order
);

-- Promo Codes
CREATE TYPE promo_type AS ENUM ('percentage', 'fixed_amount', 'free_shipping');

CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- "CC100"
  description TEXT,
  discount_type promo_type NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL, -- 100 for 100%, or 5 for $5 off
  max_uses INTEGER, -- NULL = unlimited
  times_used INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers (from footer signup)
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ (managed via CMS or admin)
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts (optional, for SEO)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  short_description TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  published_date DATE,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Currency Mappings (for international pricing)
CREATE TABLE currency_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(3) UNIQUE NOT NULL, -- "AUD", "USD", "EUR", "GBP"
  name VARCHAR(100) NOT NULL, -- "Australian Dollar"
  symbol VARCHAR(5) NOT NULL, -- "$"
  region VARCHAR(100), -- "Australia"
  countries TEXT[], -- ["Australia", "Kiribati"]
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_access_code ON orders(access_code);
CREATE INDEX idx_orders_buyer_email ON orders(buyer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_user_coupons_order_id ON user_coupons(order_id);
CREATE INDEX idx_user_coupons_redeemed ON user_coupons(is_redeemed);
CREATE INDEX idx_user_coupons_redeemed_at ON user_coupons(redeemed_at);
CREATE INDEX idx_coupon_templates_pack_id ON coupon_templates(pack_id);
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
```

---

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model CouponPack {
  id             String   @id @default(uuid())
  slug           String   @unique
  name           String
  title          String?
  tagline        String?
  description    String?
  iconUrl        String?  @map("icon_url")
  priceAud       Decimal  @default(25.00) @map("price_aud") @db.Decimal(10, 2)
  priceUsd       Decimal? @map("price_usd") @db.Decimal(10, 2)
  priceEur       Decimal? @map("price_eur") @db.Decimal(10, 2)
  priceGbp       Decimal? @map("price_gbp") @db.Decimal(10, 2)
  currencySymbol String   @default("$") @map("currency_symbol")
  isActive       Boolean  @default(true) @map("is_active")
  isSeasonal     Boolean  @default(false) @map("is_seasonal")
  whatsIncluded  String[] @map("whats_included")
  displayOrder   Int      @default(0) @map("display_order")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  coupons CouponTemplate[]
  orders  Order[]

  @@map("coupon_packs")
}

model CouponTemplate {
  id           String   @id @default(uuid())
  packId       String   @map("pack_id")
  title        String
  description  String
  iconUrl      String?  @map("icon_url")
  tip          String?
  displayOrder Int      @default(0) @map("display_order")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  pack        CouponPack  @relation(fields: [packId], references: [id], onDelete: Cascade)
  userCoupons UserCoupon[]

  @@map("coupon_templates")
}

enum OrderStatus {
  pending
  paid
  failed
  refunded
}

model Order {
  id                        String      @id @default(uuid())
  orderNumber               String      @unique @map("order_number")
  accessCode                String      @unique @map("access_code")
  accessUrl                 String      @unique @map("access_url")
  buyerEmail                String      @map("buyer_email")
  buyerName                 String      @map("buyer_name")
  receiverName              String      @map("receiver_name")
  customMessage             String?     @map("custom_message")
  packId                    String      @map("pack_id")
  packName                  String      @map("pack_name")
  packPrice                 Decimal     @map("pack_price") @db.Decimal(10, 2)
  currencyCode              String      @default("AUD") @map("currency_code")
  stripeSessionId           String?     @map("stripe_session_id")
  stripePaymentIntentId     String?     @map("stripe_payment_intent_id")
  promoCode                 String?     @map("promo_code")
  discountAmount            Decimal     @default(0) @map("discount_amount") @db.Decimal(10, 2)
  finalAmount               Decimal     @map("final_amount") @db.Decimal(10, 2)
  status                    OrderStatus @default(pending)
  pdfUrl                    String?     @map("pdf_url")
  qrCodeUrl                 String?     @map("qr_code_url")
  pdfGeneratedAt            DateTime?   @map("pdf_generated_at")
  confirmationEmailSentAt   DateTime?   @map("confirmation_email_sent_at")
  giftEmailSentAt           DateTime?   @map("gift_email_sent_at")
  createdAt                 DateTime    @default(now()) @map("created_at")
  updatedAt                 DateTime    @updatedAt @map("updated_at")

  pack        CouponPack   @relation(fields: [packId], references: [id])
  userCoupons UserCoupon[]

  @@index([accessCode])
  @@index([buyerEmail])
  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@map("orders")
}

model UserCoupon {
  id                String    @id @default(uuid())
  orderId           String    @map("order_id")
  couponTemplateId  String    @map("coupon_template_id")
  title             String
  description       String
  iconUrl           String?   @map("icon_url")
  tip               String?
  isRedeemed        Boolean   @default(false) @map("is_redeemed")
  redeemedAt        DateTime? @map("redeemed_at")
  displayOrder      Int       @default(0) @map("display_order")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  order           Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  couponTemplate  CouponTemplate @relation(fields: [couponTemplateId], references: [id])

  @@unique([orderId, couponTemplateId])
  @@index([orderId])
  @@index([isRedeemed])
  @@index([redeemedAt])
  @@map("user_coupons")
}

enum PromoType {
  percentage
  fixed_amount
  free_shipping
}

model PromoCode {
  id            String    @id @default(uuid())
  code          String    @unique
  description   String?
  discountType  PromoType @map("discount_type")
  discountValue Decimal   @map("discount_value") @db.Decimal(10, 2)
  maxUses       Int?      @map("max_uses")
  timesUsed     Int       @default(0) @map("times_used")
  validFrom     DateTime? @map("valid_from")
  validUntil    DateTime? @map("valid_until")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  @@index([code])
  @@map("promo_codes")
}

model Subscriber {
  id             String    @id @default(uuid())
  email          String    @unique
  isSubscribed   Boolean   @default(true) @map("is_subscribed")
  subscribedAt   DateTime  @default(now()) @map("subscribed_at")
  unsubscribedAt DateTime? @map("unsubscribed_at")
  createdAt      DateTime  @default(now()) @map("created_at")

  @@map("subscribers")
}

model Faq {
  id           String   @id @default(uuid())
  question     String
  answer       String
  displayOrder Int      @default(0) @map("display_order")
  isPublished  Boolean  @default(true) @map("is_published")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("faqs")
}

model BlogPost {
  id                String    @id @default(uuid())
  slug              String    @unique
  title             String
  shortDescription  String?   @map("short_description")
  content           String
  featuredImageUrl  String?   @map("featured_image_url")
  publishedDate     DateTime? @map("published_date") @db.Date
  isPublished       Boolean   @default(false) @map("is_published")
  views             Int       @default(0)
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@index([slug])
  @@map("blog_posts")
}

model CurrencyMapping {
  id        String   @id @default(uuid())
  code      String   @unique
  name      String
  symbol    String
  region    String?
  countries String[]
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("currency_mappings")
}
```

---

### Key Schema Decisions

✅ **No User Authentication**
- All data in Orders and UserCoupons
- No login required for buyers or recipients
- Admin panel can be separate (or use Prisma Studio)

✅ **20 Coupons Per Pack** (confirmed)

✅ **Email via Postmark** (no Email template table needed)

✅ **Removed Unused Fields:**
- No User table (except for future admin)
- No Email template builder
- No OAuth, invited, suspended fields
- CouponTemplate has no Redeem status

✅ **Denormalization Strategy:**
- Pack name/price stored in Order (historical record)
- Coupon details stored in UserCoupon (snapshot at purchase)

---

### Data Relationships

```
coupon_packs (3 packs)
    ↓ has many
coupon_templates (20 per pack = 60 total)
    ↓ referenced by
user_coupons (20 per order)
    ↑ belongs to
orders (1 per purchase)
```

#### User
```
- activated (yes/no)
- avatar (image)
- Currency (text)
- firstName (text)
- fullName (text)
- invited (date)
- lastName (text)
- OAuth (yes/no)
- phone (text)
- suspended (yes/no)
- userType (User Types) // Default: "User"
- email (text) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Order
```
- Buyer email (text)
- Buyer Name (text)
- Code (text) // Access code, e.g., "GRLOK0"
- Coupon Pack (→ Coupon Pack)
- Coupons (List of Coupon(User)s) // Individual redeemable instances
- Currency (text)
- Custom message (text) // Personal message from buyer
- encoded_pdf (text) // Base64 or URL
- Pack Name (text)
- Pack Price (number)
- Payment status (text)
- pdf_url (text) // URL to generated PDF card
- PromoCode (text) // Applied promo code
- QR_code (image) // Generated QR code
- Receiver name (text) // Partner's name
- Status (text)
- Stripe session ID (text)
- url (text) // Unique access URL
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Coupon Pack (Template)
```
- Baseprice (number)
- Coupons (List of CouponTemplates) // 20 template coupons
- currency_symbol (text)
- Description (text)
- icon (image) // Pack icon (feather, heart, camera)
- message (text)
- Pack_Name (text) // "Romance", "Acts of Service", "Making Memories"
- pirce_eu (number) // Pricing for different currencies
- price_au (number)
- price_uk (number)
- price_us (number)
- Tagline (text) // "Spark the romance, ignite the love"
- Title (text)
- Whatsincluded (List of texts) // Bullet points for pack detail page
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### CouponTemplate (Master Coupons)
```
- Description (text) // "Let's enjoy a romantic dinner..."
- Icon (image) // Feather illustration
- Order (text) // Sort order? (unclear)
- Redeem status (yes/no) // This shouldn't be here (templates don't get redeemed)
- Tip (text) // Tips for fulfilling the coupon
- Title (text) // "Candlelit Dinner"
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Coupon(User) (Instance - Redeemable)
```
- Description (text) // Copied from template
- Icon (image) // Copied from template
- Order (→ Order) // Which order this belongs to
- Status (yes/no) // Redeemed or not
- Tip (text) // Copied from template
- Title (text) // Copied from template
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field (used as redemption date)
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### PromoCodes
```
- Code (text) // "CC100"
- Key (text) // Description or discount value
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Subscribers (Newsletter)
```
- Email (Email)
- Emails (text) // Unclear - duplicate?
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### FAQ
```
- Answer (text)
- Question (text)
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Blog
```
- article_content (text)
- Date (date)
- img (image)
- short_description (text)
- Title (text)
- url_title (text) // Slug for URL
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### Email (Template Builder)
```
- body (text)
- bodySecondary (text)
- buttonLink (text)
- ButtonText (text)
- color (text)
- font-family (text)
- footer-text (text)
- header (text)
- headerSecondary (text)
- html (text)
- image (text)
- links (List of Email Footer Links)
- logo (text)
- name (text)
- subject (text)
- vars (text)
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

#### CurrencyMapping (For International Pricing)
```
- Code (text) // "AUD", "USD", "EUR", "GBP"
- Countries (List of texts)
- Currency (text) // "Australian Dollar"
- Price (number) // Base price in this currency
- Region_Name (text) // "Australia"
- Symbol (text) // "$", "€", "£"
- Creator (→ User) // Built-in field
- Modified Date (date) // Built-in field
- Created Date (date) // Built-in field
- Slug (text) // Built-in field
```

---

### Improved Schema for Rebuild (PostgreSQL)

**Key Changes:**
1. Separate Template data from Instance data clearly
2. Add proper relationships and foreign keys
3. Remove unused fields
4. Add indexes for performance
5. Better naming conventions
6. Add status enums

```sql
-- Users table (simplified - use NextAuth or Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  full_name VARCHAR(200) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  avatar_url TEXT,
  phone VARCHAR(20),
  currency_code VARCHAR(3) DEFAULT 'AUD',
  user_type VARCHAR(20) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  is_suspended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Packs (Templates)
CREATE TABLE coupon_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200),
  tagline VARCHAR(200),
  description TEXT,
  icon_url TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  price_aud DECIMAL(10, 2),
  price_usd DECIMAL(10, 2),
  price_eur DECIMAL(10, 2),
  price_gbp DECIMAL(10, 2),
  currency_symbol VARCHAR(5) DEFAULT '

---

## 6. USER FLOWS

### Flow 1: Purchase & Gift
```
1. Buyer visits homepage
2. Explores "Coupon Packs" dropdown or clicks "Buy now"
3. Browses available packs
4. Selects pack → Views details & preview
5. Clicks "Buy now"
6. Checkout:
   - Enters personal info
   - Enters partner's name
   - Writes personal message
   - Chooses delivery (email/PDF)
   - Completes payment
7. Receives confirmation email with PDF
8. Partner receives gift email/PDF with access link + code
```

### Flow 2: Redemption & Notification
```
1. Partner opens email or PDF
2. Clicks link or scans QR code
3. Enters access code
4. Views digital coupon pack (20 coupons)
5. Browses coupons
6. Selects coupon to redeem
7. Clicks "Redeem" button
8. Confirmation shown to partner
9. Notification email sent to gifter
10. Gifter fulfills the coupon/gesture
```

### Flow 3: Content/Newsletter
```
1. User scrolls to footer
2. Enters email in "Subscribe for deals and relationship tips"
3. Clicks "Subscribe"
4. Added to email list
5. Receives welcome email + future content
```

---

## 7. DESIGN SYSTEM

### Brand Colors
- **Primary Red**: #D64933 (buttons, accents)
- **Light Pink/Peach**: #FFE5E0 (backgrounds)
- **Dark Text**: #1A1A1A (headings)
- **Medium Gray**: #6B6B6B (body text)
- **White**: #FFFFFF (cards, backgrounds)

### Typography
- **Headings**: Bold, sans-serif (likely Inter or similar)
- **Body**: Regular sans-serif
- **Script/Handwriting**: Used for "Let's make memories" on PDF card

### UI Components
- **Cards**: White background, rounded corners, subtle shadow
- **Buttons**: 
  - Primary: Red (#D64933), rounded-full, white text
  - Secondary: Red outline, transparent background
- **Icons**: Line-art style illustrations (hearts, feathers, gifts)
- **Illustrations**: Hand-drawn, minimalist style
- **Coupon Cards**: Circular icon background (light peach), centered design

### Responsive Design
- Desktop navigation with dropdown
- Mobile-friendly layouts
- Touch-friendly coupon cards

---

## 8. TECHNICAL REQUIREMENTS

### Frontend Stack (Recommended)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui or custom components
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context or Zustand (if needed)

### Backend & Database
- **Database**: PostgreSQL (Supabase or Neon)
- **ORM**: Prisma or Drizzle
- **API**: Next.js API routes
- **Authentication**: NextAuth.js (optional, for user accounts)

### Third-Party Integrations
- **Payment**: Stripe Checkout
- **Email**: 
  - Transactional: SendGrid or Resend
  - Marketing: Mailchimp or ConvertKit
- **PDF Generation**: 
  - react-pdf or pdf-lib
  - Generate QR codes: qrcode library
- **File Storage**: 
  - Cloudinary or AWS S3 (for coupon images)
- **Analytics**: Google Analytics 4

### Hosting & Deployment
- **Platform**: Vercel
- **Domain**: couplescoupons.com
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Vercel)

---

## 9. IMPLEMENTATION PHASES

### Phase 1: MVP (Week 1-2)
**Goal**: Get basic purchase and redemption flow working

**Features**:
- [ ] Homepage with hero + sample coupons
- [ ] Pack listing page (3 packs)
- [ ] Pack detail page with "What's included"
- [ ] Basic Stripe checkout
- [ ] Order confirmation email
- [ ] PDF card generation with QR code + access code
- [ ] Redemption page (access code entry)
- [ ] View coupons page
- [ ] Redeem coupon functionality
- [ ] Email notification to gifter on redemption

**Database**:
- Users (optional for MVP)
- Orders
- Packs
- Coupons (templates)
- UserCoupons (instances)

---

### Phase 2: Enhanced Features (Week 3-4)
**Features**:
- [ ] About page
- [ ] How It Works page
- [ ] FAQ page with accordion
- [ ] Blog setup (simple CMS or markdown)
- [ ] Newsletter signup + integration
- [ ] Pack preview pages (show sample coupons)
- [ ] Custom personalization during checkout
- [ ] Order history page (if user accounts added)
- [ ] Email templates (branded)
- [ ] Seasonal pack system (Mother's Day, etc.)

---

### Phase 3: Polish & Optimization (Week 5-6)
**Features**:
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Google Analytics integration
- [ ] Performance optimization
- [ ] Mobile responsiveness refinement
- [ ] Accessibility improvements (WCAG AA)
- [ ] Admin panel (manage packs, coupons, orders)
- [ ] Coupon usage analytics
- [ ] A/B testing setup
- [ ] Social proof (testimonials page)
- [ ] Refund/support system

---

## 10. COMPLETE COUPON LIST

### Romance Pack (20 coupons)
1. **Candlelit Dinner** - "Let's enjoy a romantic dinner at home with soft music and candles"
2. **Sunset Stroll** - "We can take a walk together during a beautiful sunset and relax on a blanket"
3. **Role-Playing Fantasy Night** - "Let's act out our wildest fantasies with a fun role-play scenario"
4. **Paint the Town Red** - "I'll take you for a night out at your favorite cocktail bar or restaurant"
5. **Breakfast in Bed** - "I'll treat you to breakfast in bed, with a special touch like a mimosa or small flower"
6. **Sexy Outfit Reveal** - "I'll surprise you with a sexy outfit, just for you"
7. **Romantic Photo Shoot** - "I'll plan a mini photo shoot with us, capturing our best moments together"
8. **Movie Night** - "I'll set up a cozy movie night with your favorite films and snacks"
9. **Slow Dance** - "Let's share a slow dance at home to one of our favorite love songs"
10. **Starry Night Date** - "We'll spend the evening stargazing and make a wish together"
11. **Massage Night** - "I'll give you a relaxing massage with scented oils and candles"
12. **Picnic in the Park** - "Let's enjoy a picnic with your favorite snacks in a scenic spot"
13. **Love Jar** - "I'll fill a jar with notes about why I love you, with little surprises"
14. **Handmade Gift** - "I'll make you a thoughtful, handmade gift to show my love"
15. **Personal Chauffeur** - "I'll drive you anywhere you want to go, your personal chauffeur for the day"
16-20. (Additional romance coupons)

### Acts of Service Pack
1. **Home Cooked Dinner Date** - "Candles, background music, and a peaceful meal together"
2. **Picnic in Park** - "Plan a picnic with your partner's favourite snacks"
3. **Short Stories** - "Write a short story together about how you met or favourite memories"
4-20. (Acts of service coupons)

### Making Memories Pack
1-20. (Memory-focused activity coupons)

---

## 11. STRIPE INTEGRATION DETAILS

### Checkout Flow
1. User clicks "Buy now" on pack detail page
2. Redirects to custom checkout page
3. Collect:
   - Buyer email
   - Partner name
   - Personal message (textarea)
   - Delivery preference (email/both)
4. Create Stripe Checkout Session
5. Redirect to Stripe Checkout
6. Handle webhook for successful payment
7. Generate access code + PDF
8. Send emails
9. Redirect to success page

### Products in Stripe
- Romance Pack (AUD$25)
- Acts of Service Pack (AUD$25)
- Making Memories Pack (AUD$25)
- Mother's Day Pack (AUD$20) - seasonal

---

## 12. EMAIL TEMPLATES NEEDED

1. **Gift Delivery Email** (to partner)
   - Subject: "[Name] sent you Couples Coupons! ❤️"
   - Personalized message
   - Access link + code
   - PDF attachment
   - Preview of pack

2. **Order Confirmation** (to buyer)
   - Subject: "Your Couples Coupons order is confirmed!"
   - Order details
   - Copy of PDF
   - Tips for presenting the gift

3. **Redemption Notification** (to gifter)
   - Subject: "[Partner] redeemed: [Coupon Name]! 💕"
   - Coupon details
   - Tips for fulfilling
   - Remaining coupon count

4. **Welcome Newsletter**
   - Subject: "Welcome to Couples Coupons!"
   - Relationship tips
   - Special offers

---

## 13. ADMIN REQUIREMENTS (Future)

### Admin Dashboard Needs
- View all orders
- View redemption rates
- Manage packs (add/edit/disable)
- Manage coupons (add/edit within packs)
- View revenue analytics
- Export customer emails
- Handle refunds/support tickets
- Manage seasonal campaigns
- Edit site content (About, FAQ)

---

## 14. SEO & MARKETING

### Target Keywords
- Digital love coupons
- Couples gift ideas
- Romantic gestures for couples
- Acts of service coupons
- Valentine's Day gift
- Anniversary gift for couples
- Long distance relationship gifts

### Meta Data
- Homepage: "Digital Couples Coupons | Romantic Gestures & Acts of Service"
- Pack pages: "[Pack Name] - Digital Coupon Pack for Couples | AUD$25"

### Blog Content Ideas
- "101 Acts of Service for Your Partner"
- "How to Keep Romance Alive in Long-Term Relationships"
- "The 5 Love Languages: Which One is Yours?"
- "Creative Date Night Ideas for Couples"

---

## 15. CRITICAL TECHNICAL DECISIONS

### Access Code System
- Generate unique 6-character codes (alphanumeric)
- Format: ABC123, DOC7NN
- Must be memorable and easy to type
- Check for profanity/confusing characters

### QR Code Implementation
- Generate QR code pointing to: `https://couplescoupons.com/redeem?code=ABC123`
- Embed in PDF card
- Size: 2x2 inches on card
- Error correction: Medium (M)

### PDF Generation
- Use react-pdf or similar
- Generate on order completion
- Include: Logo, personalized message, QR code, access code, branding
- Store PDFs temporarily or in S3
- Email as attachment

### Security
- Access codes should be single-use links (once accessed, tied to IP/session)
- Rate limiting on redemption endpoint
- CSRF protection on all forms
- Secure payment handling (PCI compliance via Stripe)

---

## 16. SUCCESS METRICS

### KPIs to Track
- Conversion rate (visitor → purchase)
- Average order value
- Redemption rate (% of coupons redeemed)
- Time to first redemption
- Customer acquisition cost
- Lifetime value
- Email open/click rates
- Blog traffic
- Social media engagement

### Initial Goals (3 months)
- 100 orders/month
- 70%+ redemption rate
- 500 email subscribers
- 5,000 monthly visitors

---

## 17. KNOWN EDGE CASES

1. **Lost access code**: Provide "resend email" option
2. **Partner doesn't have email**: PDF card with QR code
3. **Expired special offers**: Clear messaging on seasonal packs
4. **Refund requests**: 24-hour refund policy (if not accessed)
5. **Coupon not fulfilled**: Support system for disputes
6. **Multiple redemptions**: Prevent via database check
7. **Gifter doesn't fulfill**: Can't technically enforce, but tips help

---

---

## 21. UX IMPROVEMENTS & FEATURE ENHANCEMENTS

### Priority Improvements for Rebuild

#### 1. **Customizable Coupon Packs** ⭐ HIGH PRIORITY
**Problem**: Users are locked into pre-made packs of 20 coupons
**Solution**: Add "Build Your Own Pack" feature

**Implementation:**
- New page: `/packs/custom`
- User flow:
  1. Click "Create Custom Pack" on homepage/pack listing
  2. Select desired number of coupons (10, 20, 30, 40)
  3. Browse all available coupons across all categories
  4. Add/remove coupons to build custom pack
  5. See price calculate dynamically (e.g., $1.50/coupon)
  6. Preview pack before purchase
  7. Name custom pack (optional)
  8. Proceed to checkout

**UI Components Needed:**
- Coupon browser with category filters
- Shopping cart sidebar showing selected coupons
- Drag-and-drop interface (optional, nice-to-have)
- Counter showing coupons selected (e.g., "15/20 selected")
- "Add to Pack" / "Remove" buttons on each coupon card

**Pricing Strategy:**
- Standard packs: $25 for 20 coupons
- Custom packs: 
  - 10 coupons: $15
  - 20 coupons: $25
  - 30 coupons: $35
  - 40 coupons: $45
  - Or: $1.25-$1.50 per coupon

**Technical Considerations:**
- Database: Add `is_custom` boolean to Packs table
- Store custom coupon selections in JSON field or junction table
- Generate unique pack preview for custom orders

---

#### 2. **Improved Redemption Experience**
**Current State**: Simple "Redeem" button, no visual feedback
**Enhancements:**

**A. Redemption Confirmation Modal**
- Click "Redeem" → Modal appears
- Modal content:
  - "Are you sure you want to redeem this coupon?"
  - Coupon title and description
  - "Yes, Redeem" / "Cancel" buttons
- Prevents accidental redemptions

**B. Post-Redemption State**
- Button changes to: "Redeemed ✓" (disabled, gray)
- Show redemption date below coupon
- Add "Tips for fulfilling" section (expandable)
- Optional: Add photos after fulfillment

**C. Redemption History**
- New page: `/my-pack/[code]/history`
- Shows all redeemed coupons with dates
- Timeline view of redemptions
- Stats: "You've redeemed 8/20 coupons"

---

#### 3. **Enhanced Pack Preview**
**Current**: Grid of 6 sample coupons
**Improvements:**

**A. View All Coupons Before Purchase**
- "View all 20 coupons" button on pack detail page
- Opens modal or new page showing complete list
- Helps users make informed decisions

**B. Sample Pack Demo**
- "Try Demo Pack" feature
- Generate temporary access code for demo
- Shows full redemption flow
- Watermarked coupons (not redeemable)
- Converts users by showing actual experience

---

#### 4. **Gift Delivery Options**
**Current**: Instant email only
**Add:**

**A. Scheduled Delivery**
- Choose delivery date/time during checkout
- Use case: Order now, deliver on anniversary/birthday
- Timezone selection

**B. Gift Message Preview**
- Show preview of email/PDF before purchase
- Edit personalization in real-time
- See exactly what partner will receive

**C. Multiple Delivery Methods**
- Email only (current)
- Email + Physical card (shipped, +$5)
- Just PDF for self-printing
- SMS delivery option

---

#### 5. **Social Proof & Testimonials**
**Add to Homepage:**
- Video testimonials section (already visible in screenshot)
- Star ratings aggregate
- "Join [X] couples who've..." social proof
- Instagram feed integration (@CouplesCoupons)
- Before/After stories: "We were stuck in a rut → Now we have date night every week"

---

#### 6. **Progress Tracking for Gifters**
**New Feature: Gifter Dashboard**
- Access via email link or account
- See which coupons have been redeemed
- Track redemption dates
- Redemption rate: "75% redeemed (15/20)"
- Reminder to fulfill unredeemed coupons
- Add notes after fulfilling each coupon

---

#### 7. **Mobile App Features**
**Future: Native Mobile App**
- Push notifications when coupon redeemed
- Quick coupon browsing
- Camera integration for custom photo coupons
- Share fulfilled coupon photos
- In-app redemption

---

#### 8. **Subscription Model**
**"Monthly Surprise" Subscription**
- $10/month
- Receive 5 new surprise coupons monthly
- Themed each month (e.g., "Adventure Month", "Cozy Month")
- Cancel anytime
- Great for long-term relationships

---

#### 9. **Couple Challenges**
**Gamification Feature**
- "30-Day Romance Challenge"
- "Acts of Service Streak"
- Track consecutive weeks with redeemed coupons
- Badges and achievements
- Shareable progress cards for social media

---

#### 10. **Improved Content & SEO**

**Blog Enhancements:**
- Weekly relationship tips
- "Coupon of the Week" spotlight
- User-submitted stories
- Expert relationship advice column
- Video content (YouTube integration)

**Email Sequences:**
- Welcome series (5 emails)
- Post-purchase: "How to present your gift"
- Weekly: "Don't forget to redeem!"
- Re-engagement: "It's been a while..."
- Winback: "We miss you"

---

#### 11. **Referral Program**
**"Share the Love" Program**
- Give $5, Get $5 credit
- Unique referral code for each customer
- Track referrals in dashboard
- Shareable social cards
- Affiliate program for bloggers

---

#### 12. **Analytics Dashboard (Admin)**
**Key Metrics to Track:**
- Conversion rate by pack type
- Redemption rates (overall and by pack)
- Average time to first redemption
- Most popular coupons
- Drop-off points in checkout
- Revenue by channel
- Customer lifetime value
- Email open/click rates

---

#### 13. **Accessibility Improvements**
**WCAG 2.1 AA Compliance:**
- Keyboard navigation for all interactions
- Screen reader optimization
- Color contrast fixes
- Focus indicators
- Alt text for all images
- Captions for video testimonials
- Skip to content links

---

#### 14. **Performance Optimizations**
**Speed Improvements:**
- Image optimization (WebP format)
- Lazy loading for coupon cards
- Code splitting
- CDN for static assets
- Route prefetching
- Lighthouse score: 90+ on all metrics

---

#### 15. **International Expansion**
**Multi-Currency Support:**
- Auto-detect user location
- Support: AUD, USD, GBP, EUR, CAD
- Currency switcher in header

**Multi-Language:**
- English (default)
- Spanish
- French
- German
- Localized coupon content

---

### Implementation Roadmap

**Phase 1 (Week 1-2): Core Rebuild**
- Replicate existing functionality
- Modern tech stack
- Improved performance

**Phase 2 (Week 3-4): Quick Wins**
- ✅ Customizable packs (build your own)
- ✅ Scheduled delivery
- ✅ Improved redemption UX
- ✅ Pack preview enhancements

**Phase 3 (Week 5-6): Growth Features**
- Referral program
- Social proof integration
- Blog setup
- Email sequences

**Phase 4 (Month 2-3): Advanced**
- Subscription model
- Mobile app planning
- Gamification
- Analytics dashboard

**Phase 5 (Ongoing): Optimization**
- A/B testing
- SEO optimization
- Content marketing
- Performance monitoring

---

### Quick Code-Level Improvements for Claude Code

#### Better Form Validation
```typescript
// Current: Basic required field validation
// Improved: Real-time validation with helpful errors

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  giftReceiverName: z.string().min(2, "Receiver name required"),
  personalMessage: z.string().max(500, "Message too long (max 500 chars)").optional(),
  promoCode: z.string().optional()
});
```

#### Smart Promotional Code System
```typescript
// Flexible promo code types:
// - Percentage off (e.g., "SAVE20" = 20% off)
// - Fixed amount (e.g., "5OFF" = $5 off)
// - Free shipping (future)
// - Buy one get one
// - First-time customer only
```

#### Coupon Redemption Lock
```typescript
// Prevent accidental double-redemption
// Add confirmation step
// Add "undo" within 5 minutes
```

#### Email Template System
```typescript
// Use React Email for better templates
// Dynamic content based on pack type
// Personalization tokens
// A/B testing support
```

---

### User Feedback Integration Plan

**Collect Feedback:**
- Post-purchase survey (after 7 days)
- Net Promoter Score (NPS)
- Feature request form
- Live chat support (Intercom/Crisp)
- Social media listening

**Iterate Based On:**
- Most requested features
- Common pain points
- Drop-off analysis
- Competitor analysis
- Market trends

---

**These improvements will transform CoupleCoupons from a simple digital product into a comprehensive relationship platform, driving higher conversions, better user retention, and increased customer lifetime value.**

---

## 19. CONTENT PAGES

### About Page Content
*"At Couples Coupons, we believe that the little things matter most in a relationship. Whether it's a heartfelt gesture, a fun surprise, or a simple reminder that says, 'I care,' our mission is to bring couples closer together in meaningful and memorable ways.*

*Our thoughtfully designed coupons are more than just pieces of paper—they're an invitation to create moments that strengthen your bond. From breakfast in bed to spontaneous date nights, each coupon is a spark for love, laughter, and connection.*

*We started Couples Coupons because we know life gets busy, and sometimes it's easy to overlook those small but meaningful acts of love. That's where we come in! Our goal is to make it easy for couples to show appreciation and keep the romance alive, no matter how hectic life gets."*

### How It Works
1. **You gift it** - Pick the perfect pack of thoughtful, romantic, or fun coupons and send it to your partner via email or a printable PDF card
2. **They redeem it** - Your partner redeems coupons online using their unique access link and code whenever they choose
3. **You fulfill it** - You'll get notified so you can turn their chosen coupon into reality! Make the gesture, create the memory, and enjoy the moment together

---

## 20. FINAL NOTES FOR CLAUDE CODE

### Project Setup Command
```bash
npx create-next-app@latest couplescoupons --typescript --tailwind --app
cd couplescoupons
npm install @stripe/stripe-js stripe prisma @prisma/client
npm install react-hook-form zod @hookform/resolvers
npm install nodemailer qrcode react-pdf
npm install lucide-react
```

### Environment Variables Needed
```
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
SENDGRID_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

### Folder Structure
```
/app
  /(marketing)
    /page.tsx (homepage)
    /about/page.tsx
    /how-it-works/page.tsx
    /blog/page.tsx
  /packs
    /page.tsx (listing)
    /[slug]/page.tsx (detail)
  /checkout/[packId]/page.tsx
  /redeem/page.tsx
  /api
    /checkout/route.ts
    /webhooks/stripe/route.ts
    /redeem/route.ts
/components
  /ui (shadcn components)
  /coupon-card.tsx
  /pack-card.tsx
  /navbar.tsx
  /footer.tsx
/lib
  /db.ts (Prisma client)
  /stripe.ts
  /email.ts
  /pdf.ts
/prisma
  /schema.prisma
```

### Design Tokens
```css
:root {
  --primary: #D64933;
  --background: #FFE5E0;
  --card: #FFFFFF;
  --text: #1A1A1A;
  --text-muted: #6B6B6B;
}
```

---

**This PRD is ready for Claude Code. Provide this document along with the screenshots and any additional Bubble editor screenshots for database schema, workflows, and custom states.**
,
  is_active BOOLEAN DEFAULT true,
  is_seasonal BOOLEAN DEFAULT false,
  whats_included TEXT[], -- Array of bullet points
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Templates (Master coupons that belong to packs)
CREATE TABLE coupon_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id UUID NOT NULL REFERENCES coupon_packs(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  tip TEXT, -- Tips for fulfilling this coupon
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- Human-readable order ID
  access_code VARCHAR(10) UNIQUE NOT NULL, -- e.g., "GRLOK0"
  access_url TEXT UNIQUE NOT NULL,
  
  -- Buyer information
  buyer_email VARCHAR(255) NOT NULL,
  buyer_name VARCHAR(200) NOT NULL,
  
  -- Recipient information
  receiver_name VARCHAR(200) NOT NULL,
  custom_message TEXT,
  
  -- Pack information
  pack_id UUID NOT NULL REFERENCES coupon_packs(id),
  pack_name VARCHAR(100) NOT NULL, -- Denormalized for history
  pack_price DECIMAL(10, 2) NOT NULL,
  currency_code VARCHAR(3) DEFAULT 'AUD',
  
  -- Payment
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  promo_code VARCHAR(50),
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  final_amount DECIMAL(10, 2) NOT NULL,
  status order_status DEFAULT 'pending',
  
  -- PDF generation
  pdf_url TEXT,
  qr_code_url TEXT,
  pdf_generated_at TIMESTAMP WITH TIME ZONE,
  
  -- Delivery
  email_sent_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Coupons (Redeemable instances)
CREATE TABLE user_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  coupon_template_id UUID NOT NULL REFERENCES coupon_templates(id),
  
  -- Denormalized data (snapshot at purchase time)
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  tip TEXT,
  
  -- Redemption tracking
  is_redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(order_id, coupon_template_id)
);

-- Promo Codes
CREATE TYPE promo_type AS ENUM ('percentage', 'fixed_amount', 'free');

CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type promo_type NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL, -- 20 for 20%, or 5 for $5 off
  max_uses INTEGER, -- NULL = unlimited
  times_used INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  short_description TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  published_date DATE,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Currency Mappings
CREATE TABLE currency_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(3) UNIQUE NOT NULL, -- "AUD", "USD"
  name VARCHAR(100) NOT NULL, -- "Australian Dollar"
  symbol VARCHAR(5) NOT NULL, -- "$"
  region VARCHAR(100), -- "Australia"
  countries TEXT[], -- ["Australia", "Kiribati"]
  exchange_rate DECIMAL(10, 4) DEFAULT 1.00, -- Relative to base currency
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_access_code ON orders(access_code);
CREATE INDEX idx_orders_buyer_email ON orders(buyer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_user_coupons_order_id ON user_coupons(order_id);
CREATE INDEX idx_user_coupons_redeemed ON user_coupons(is_redeemed);
CREATE INDEX idx_coupon_templates_pack_id ON coupon_templates(pack_id);
```

---

### Data Migration Notes

**Bubble → PostgreSQL Migration:**
1. Export all data from Bubble (CSV or API)
2. Map old field names to new schema
3. Handle Bubble's weird "List of X" relationships
4. Generate missing fields (order_number, proper slugs)
5. Validate data integrity

**Key Transformations:**
- `Code` → `access_code`
- `Receiver name` → `receiver_name`
- `Coupon(User)` → `user_coupons`
- `CouponTemplate` → `coupon_templates`
- `Status (yes/no)` → `is_redeemed (boolean)`
- Lists → Proper foreign key relationships

---

## 6. USER FLOWS

### Flow 1: Purchase & Gift
```
1. Buyer visits homepage
2. Explores "Coupon Packs" dropdown or clicks "Buy now"
3. Browses available packs
4. Selects pack → Views details & preview
5. Clicks "Buy now"
6. Checkout:
   - Enters personal info
   - Enters partner's name
   - Writes personal message
   - Chooses delivery (email/PDF)
   - Completes payment
7. Receives confirmation email with PDF
8. Partner receives gift email/PDF with access link + code
```

### Flow 2: Redemption & Notification
```
1. Partner opens email or PDF
2. Clicks link or scans QR code
3. Enters access code
4. Views digital coupon pack (20 coupons)
5. Browses coupons
6. Selects coupon to redeem
7. Clicks "Redeem" button
8. Confirmation shown to partner
9. Notification email sent to gifter
10. Gifter fulfills the coupon/gesture
```

### Flow 3: Content/Newsletter
```
1. User scrolls to footer
2. Enters email in "Subscribe for deals and relationship tips"
3. Clicks "Subscribe"
4. Added to email list
5. Receives welcome email + future content
```

---

## 7. DESIGN SYSTEM

### Brand Colors
- **Primary Red**: #D64933 (buttons, accents)
- **Light Pink/Peach**: #FFE5E0 (backgrounds)
- **Dark Text**: #1A1A1A (headings)
- **Medium Gray**: #6B6B6B (body text)
- **White**: #FFFFFF (cards, backgrounds)

### Typography
- **Headings**: Bold, sans-serif (likely Inter or similar)
- **Body**: Regular sans-serif
- **Script/Handwriting**: Used for "Let's make memories" on PDF card

### UI Components
- **Cards**: White background, rounded corners, subtle shadow
- **Buttons**: 
  - Primary: Red (#D64933), rounded-full, white text
  - Secondary: Red outline, transparent background
- **Icons**: Line-art style illustrations (hearts, feathers, gifts)
- **Illustrations**: Hand-drawn, minimalist style
- **Coupon Cards**: Circular icon background (light peach), centered design

### Responsive Design
- Desktop navigation with dropdown
- Mobile-friendly layouts
- Touch-friendly coupon cards

---

## 8. TECHNICAL REQUIREMENTS

### Frontend Stack (Recommended)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui or custom components
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context or Zustand (if needed)

### Backend & Database
- **Database**: PostgreSQL (Supabase or Neon)
- **ORM**: Prisma or Drizzle
- **API**: Next.js API routes
- **Authentication**: NextAuth.js (optional, for user accounts)

### Third-Party Integrations
- **Payment**: Stripe Checkout
- **Email**: 
  - Transactional: SendGrid or Resend
  - Marketing: Mailchimp or ConvertKit
- **PDF Generation**: 
  - react-pdf or pdf-lib
  - Generate QR codes: qrcode library
- **File Storage**: 
  - Cloudinary or AWS S3 (for coupon images)
- **Analytics**: Google Analytics 4

### Hosting & Deployment
- **Platform**: Vercel
- **Domain**: couplescoupons.com
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Vercel)

---

## 9. IMPLEMENTATION PHASES

### Phase 1: MVP (Week 1-2)
**Goal**: Get basic purchase and redemption flow working

**Features**:
- [ ] Homepage with hero + sample coupons
- [ ] Pack listing page (3 packs)
- [ ] Pack detail page with "What's included"
- [ ] Basic Stripe checkout
- [ ] Order confirmation email
- [ ] PDF card generation with QR code + access code
- [ ] Redemption page (access code entry)
- [ ] View coupons page
- [ ] Redeem coupon functionality
- [ ] Email notification to gifter on redemption

**Database**:
- Users (optional for MVP)
- Orders
- Packs
- Coupons (templates)
- UserCoupons (instances)

---

### Phase 2: Enhanced Features (Week 3-4)
**Features**:
- [ ] About page
- [ ] How It Works page
- [ ] FAQ page with accordion
- [ ] Blog setup (simple CMS or markdown)
- [ ] Newsletter signup + integration
- [ ] Pack preview pages (show sample coupons)
- [ ] Custom personalization during checkout
- [ ] Order history page (if user accounts added)
- [ ] Email templates (branded)
- [ ] Seasonal pack system (Mother's Day, etc.)

---

### Phase 3: Polish & Optimization (Week 5-6)
**Features**:
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Google Analytics integration
- [ ] Performance optimization
- [ ] Mobile responsiveness refinement
- [ ] Accessibility improvements (WCAG AA)
- [ ] Admin panel (manage packs, coupons, orders)
- [ ] Coupon usage analytics
- [ ] A/B testing setup
- [ ] Social proof (testimonials page)
- [ ] Refund/support system

---

## 10. COMPLETE COUPON LIST

### Romance Pack (20 coupons)
1. **Candlelit Dinner** - "Let's enjoy a romantic dinner at home with soft music and candles"
2. **Sunset Stroll** - "We can take a walk together during a beautiful sunset and relax on a blanket"
3. **Role-Playing Fantasy Night** - "Let's act out our wildest fantasies with a fun role-play scenario"
4. **Paint the Town Red** - "I'll take you for a night out at your favorite cocktail bar or restaurant"
5. **Breakfast in Bed** - "I'll treat you to breakfast in bed, with a special touch like a mimosa or small flower"
6. **Sexy Outfit Reveal** - "I'll surprise you with a sexy outfit, just for you"
7. **Romantic Photo Shoot** - "I'll plan a mini photo shoot with us, capturing our best moments together"
8. **Movie Night** - "I'll set up a cozy movie night with your favorite films and snacks"
9. **Slow Dance** - "Let's share a slow dance at home to one of our favorite love songs"
10. **Starry Night Date** - "We'll spend the evening stargazing and make a wish together"
11. **Massage Night** - "I'll give you a relaxing massage with scented oils and candles"
12. **Picnic in the Park** - "Let's enjoy a picnic with your favorite snacks in a scenic spot"
13. **Love Jar** - "I'll fill a jar with notes about why I love you, with little surprises"
14. **Handmade Gift** - "I'll make you a thoughtful, handmade gift to show my love"
15. **Personal Chauffeur** - "I'll drive you anywhere you want to go, your personal chauffeur for the day"
16-20. (Additional romance coupons)

### Acts of Service Pack
1. **Home Cooked Dinner Date** - "Candles, background music, and a peaceful meal together"
2. **Picnic in Park** - "Plan a picnic with your partner's favourite snacks"
3. **Short Stories** - "Write a short story together about how you met or favourite memories"
4-20. (Acts of service coupons)

### Making Memories Pack
1-20. (Memory-focused activity coupons)

---

## 11. STRIPE INTEGRATION DETAILS

### Checkout Flow
1. User clicks "Buy now" on pack detail page
2. Redirects to custom checkout page
3. Collect:
   - Buyer email
   - Partner name
   - Personal message (textarea)
   - Delivery preference (email/both)
4. Create Stripe Checkout Session
5. Redirect to Stripe Checkout
6. Handle webhook for successful payment
7. Generate access code + PDF
8. Send emails
9. Redirect to success page

### Products in Stripe
- Romance Pack (AUD$25)
- Acts of Service Pack (AUD$25)
- Making Memories Pack (AUD$25)
- Mother's Day Pack (AUD$20) - seasonal

---

## 12. EMAIL TEMPLATES NEEDED

1. **Gift Delivery Email** (to partner)
   - Subject: "[Name] sent you Couples Coupons! ❤️"
   - Personalized message
   - Access link + code
   - PDF attachment
   - Preview of pack

2. **Order Confirmation** (to buyer)
   - Subject: "Your Couples Coupons order is confirmed!"
   - Order details
   - Copy of PDF
   - Tips for presenting the gift

3. **Redemption Notification** (to gifter)
   - Subject: "[Partner] redeemed: [Coupon Name]! 💕"
   - Coupon details
   - Tips for fulfilling
   - Remaining coupon count

4. **Welcome Newsletter**
   - Subject: "Welcome to Couples Coupons!"
   - Relationship tips
   - Special offers

---

## 13. ADMIN REQUIREMENTS (Future)

### Admin Dashboard Needs
- View all orders
- View redemption rates
- Manage packs (add/edit/disable)
- Manage coupons (add/edit within packs)
- View revenue analytics
- Export customer emails
- Handle refunds/support tickets
- Manage seasonal campaigns
- Edit site content (About, FAQ)

---

## 14. SEO & MARKETING

### Target Keywords
- Digital love coupons
- Couples gift ideas
- Romantic gestures for couples
- Acts of service coupons
- Valentine's Day gift
- Anniversary gift for couples
- Long distance relationship gifts

### Meta Data
- Homepage: "Digital Couples Coupons | Romantic Gestures & Acts of Service"
- Pack pages: "[Pack Name] - Digital Coupon Pack for Couples | AUD$25"

### Blog Content Ideas
- "101 Acts of Service for Your Partner"
- "How to Keep Romance Alive in Long-Term Relationships"
- "The 5 Love Languages: Which One is Yours?"
- "Creative Date Night Ideas for Couples"

---

## 15. CRITICAL TECHNICAL DECISIONS

### Access Code System
- Generate unique 6-character codes (alphanumeric)
- Format: ABC123, DOC7NN
- Must be memorable and easy to type
- Check for profanity/confusing characters

### QR Code Implementation
- Generate QR code pointing to: `https://couplescoupons.com/redeem?code=ABC123`
- Embed in PDF card
- Size: 2x2 inches on card
- Error correction: Medium (M)

### PDF Generation
- Use react-pdf or similar
- Generate on order completion
- Include: Logo, personalized message, QR code, access code, branding
- Store PDFs temporarily or in S3
- Email as attachment

### Security
- Access codes should be single-use links (once accessed, tied to IP/session)
- Rate limiting on redemption endpoint
- CSRF protection on all forms
- Secure payment handling (PCI compliance via Stripe)

---

## 16. SUCCESS METRICS

### KPIs to Track
- Conversion rate (visitor → purchase)
- Average order value
- Redemption rate (% of coupons redeemed)
- Time to first redemption
- Customer acquisition cost
- Lifetime value
- Email open/click rates
- Blog traffic
- Social media engagement

### Initial Goals (3 months)
- 100 orders/month
- 70%+ redemption rate
- 500 email subscribers
- 5,000 monthly visitors

---

## 17. KNOWN EDGE CASES

1. **Lost access code**: Provide "resend email" option
2. **Partner doesn't have email**: PDF card with QR code
3. **Expired special offers**: Clear messaging on seasonal packs
4. **Refund requests**: 24-hour refund policy (if not accessed)
5. **Coupon not fulfilled**: Support system for disputes
6. **Multiple redemptions**: Prevent via database check
7. **Gifter doesn't fulfill**: Can't technically enforce, but tips help

---

---

## 21. UX IMPROVEMENTS & FEATURE ENHANCEMENTS

### Priority Improvements for Rebuild

#### 1. **Customizable Coupon Packs** ⭐ HIGH PRIORITY
**Problem**: Users are locked into pre-made packs of 20 coupons
**Solution**: Add "Build Your Own Pack" feature

**Implementation:**
- New page: `/packs/custom`
- User flow:
  1. Click "Create Custom Pack" on homepage/pack listing
  2. Select desired number of coupons (10, 20, 30, 40)
  3. Browse all available coupons across all categories
  4. Add/remove coupons to build custom pack
  5. See price calculate dynamically (e.g., $1.50/coupon)
  6. Preview pack before purchase
  7. Name custom pack (optional)
  8. Proceed to checkout

**UI Components Needed:**
- Coupon browser with category filters
- Shopping cart sidebar showing selected coupons
- Drag-and-drop interface (optional, nice-to-have)
- Counter showing coupons selected (e.g., "15/20 selected")
- "Add to Pack" / "Remove" buttons on each coupon card

**Pricing Strategy:**
- Standard packs: $25 for 20 coupons
- Custom packs: 
  - 10 coupons: $15
  - 20 coupons: $25
  - 30 coupons: $35
  - 40 coupons: $45
  - Or: $1.25-$1.50 per coupon

**Technical Considerations:**
- Database: Add `is_custom` boolean to Packs table
- Store custom coupon selections in JSON field or junction table
- Generate unique pack preview for custom orders

---

#### 2. **Improved Redemption Experience**
**Current State**: Simple "Redeem" button, no visual feedback
**Enhancements:**

**A. Redemption Confirmation Modal**
- Click "Redeem" → Modal appears
- Modal content:
  - "Are you sure you want to redeem this coupon?"
  - Coupon title and description
  - "Yes, Redeem" / "Cancel" buttons
- Prevents accidental redemptions

**B. Post-Redemption State**
- Button changes to: "Redeemed ✓" (disabled, gray)
- Show redemption date below coupon
- Add "Tips for fulfilling" section (expandable)
- Optional: Add photos after fulfillment

**C. Redemption History**
- New page: `/my-pack/[code]/history`
- Shows all redeemed coupons with dates
- Timeline view of redemptions
- Stats: "You've redeemed 8/20 coupons"

---

#### 3. **Enhanced Pack Preview**
**Current**: Grid of 6 sample coupons
**Improvements:**

**A. View All Coupons Before Purchase**
- "View all 20 coupons" button on pack detail page
- Opens modal or new page showing complete list
- Helps users make informed decisions

**B. Sample Pack Demo**
- "Try Demo Pack" feature
- Generate temporary access code for demo
- Shows full redemption flow
- Watermarked coupons (not redeemable)
- Converts users by showing actual experience

---

#### 4. **Gift Delivery Options**
**Current**: Instant email only
**Add:**

**A. Scheduled Delivery**
- Choose delivery date/time during checkout
- Use case: Order now, deliver on anniversary/birthday
- Timezone selection

**B. Gift Message Preview**
- Show preview of email/PDF before purchase
- Edit personalization in real-time
- See exactly what partner will receive

**C. Multiple Delivery Methods**
- Email only (current)
- Email + Physical card (shipped, +$5)
- Just PDF for self-printing
- SMS delivery option

---

#### 5. **Social Proof & Testimonials**
**Add to Homepage:**
- Video testimonials section (already visible in screenshot)
- Star ratings aggregate
- "Join [X] couples who've..." social proof
- Instagram feed integration (@CouplesCoupons)
- Before/After stories: "We were stuck in a rut → Now we have date night every week"

---

#### 6. **Progress Tracking for Gifters**
**New Feature: Gifter Dashboard**
- Access via email link or account
- See which coupons have been redeemed
- Track redemption dates
- Redemption rate: "75% redeemed (15/20)"
- Reminder to fulfill unredeemed coupons
- Add notes after fulfilling each coupon

---

#### 7. **Mobile App Features**
**Future: Native Mobile App**
- Push notifications when coupon redeemed
- Quick coupon browsing
- Camera integration for custom photo coupons
- Share fulfilled coupon photos
- In-app redemption

---

#### 8. **Subscription Model**
**"Monthly Surprise" Subscription**
- $10/month
- Receive 5 new surprise coupons monthly
- Themed each month (e.g., "Adventure Month", "Cozy Month")
- Cancel anytime
- Great for long-term relationships

---

#### 9. **Couple Challenges**
**Gamification Feature**
- "30-Day Romance Challenge"
- "Acts of Service Streak"
- Track consecutive weeks with redeemed coupons
- Badges and achievements
- Shareable progress cards for social media

---

#### 10. **Improved Content & SEO**

**Blog Enhancements:**
- Weekly relationship tips
- "Coupon of the Week" spotlight
- User-submitted stories
- Expert relationship advice column
- Video content (YouTube integration)

**Email Sequences:**
- Welcome series (5 emails)
- Post-purchase: "How to present your gift"
- Weekly: "Don't forget to redeem!"
- Re-engagement: "It's been a while..."
- Winback: "We miss you"

---

#### 11. **Referral Program**
**"Share the Love" Program**
- Give $5, Get $5 credit
- Unique referral code for each customer
- Track referrals in dashboard
- Shareable social cards
- Affiliate program for bloggers

---

#### 12. **Analytics Dashboard (Admin)**
**Key Metrics to Track:**
- Conversion rate by pack type
- Redemption rates (overall and by pack)
- Average time to first redemption
- Most popular coupons
- Drop-off points in checkout
- Revenue by channel
- Customer lifetime value
- Email open/click rates

---

#### 13. **Accessibility Improvements**
**WCAG 2.1 AA Compliance:**
- Keyboard navigation for all interactions
- Screen reader optimization
- Color contrast fixes
- Focus indicators
- Alt text for all images
- Captions for video testimonials
- Skip to content links

---

#### 14. **Performance Optimizations**
**Speed Improvements:**
- Image optimization (WebP format)
- Lazy loading for coupon cards
- Code splitting
- CDN for static assets
- Route prefetching
- Lighthouse score: 90+ on all metrics

---

#### 15. **International Expansion**
**Multi-Currency Support:**
- Auto-detect user location
- Support: AUD, USD, GBP, EUR, CAD
- Currency switcher in header

**Multi-Language:**
- English (default)
- Spanish
- French
- German
- Localized coupon content

---

### Implementation Roadmap

**Phase 1 (Week 1-2): Core Rebuild**
- Replicate existing functionality
- Modern tech stack
- Improved performance

**Phase 2 (Week 3-4): Quick Wins**
- ✅ Customizable packs (build your own)
- ✅ Scheduled delivery
- ✅ Improved redemption UX
- ✅ Pack preview enhancements

**Phase 3 (Week 5-6): Growth Features**
- Referral program
- Social proof integration
- Blog setup
- Email sequences

**Phase 4 (Month 2-3): Advanced**
- Subscription model
- Mobile app planning
- Gamification
- Analytics dashboard

**Phase 5 (Ongoing): Optimization**
- A/B testing
- SEO optimization
- Content marketing
- Performance monitoring

---

### Quick Code-Level Improvements for Claude Code

#### Better Form Validation
```typescript
// Current: Basic required field validation
// Improved: Real-time validation with helpful errors

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  giftReceiverName: z.string().min(2, "Receiver name required"),
  personalMessage: z.string().max(500, "Message too long (max 500 chars)").optional(),
  promoCode: z.string().optional()
});
```

#### Smart Promotional Code System
```typescript
// Flexible promo code types:
// - Percentage off (e.g., "SAVE20" = 20% off)
// - Fixed amount (e.g., "5OFF" = $5 off)
// - Free shipping (future)
// - Buy one get one
// - First-time customer only
```

#### Coupon Redemption Lock
```typescript
// Prevent accidental double-redemption
// Add confirmation step
// Add "undo" within 5 minutes
```

#### Email Template System
```typescript
// Use React Email for better templates
// Dynamic content based on pack type
// Personalization tokens
// A/B testing support
```

---

### User Feedback Integration Plan

**Collect Feedback:**
- Post-purchase survey (after 7 days)
- Net Promoter Score (NPS)
- Feature request form
- Live chat support (Intercom/Crisp)
- Social media listening

**Iterate Based On:**
- Most requested features
- Common pain points
- Drop-off analysis
- Competitor analysis
- Market trends

---

**These improvements will transform CoupleCoupons from a simple digital product into a comprehensive relationship platform, driving higher conversions, better user retention, and increased customer lifetime value.**

---

## 19. CONTENT PAGES

### About Page Content
*"At Couples Coupons, we believe that the little things matter most in a relationship. Whether it's a heartfelt gesture, a fun surprise, or a simple reminder that says, 'I care,' our mission is to bring couples closer together in meaningful and memorable ways.*

*Our thoughtfully designed coupons are more than just pieces of paper—they're an invitation to create moments that strengthen your bond. From breakfast in bed to spontaneous date nights, each coupon is a spark for love, laughter, and connection.*

*We started Couples Coupons because we know life gets busy, and sometimes it's easy to overlook those small but meaningful acts of love. That's where we come in! Our goal is to make it easy for couples to show appreciation and keep the romance alive, no matter how hectic life gets."*

### How It Works
1. **You gift it** - Pick the perfect pack of thoughtful, romantic, or fun coupons and send it to your partner via email or a printable PDF card
2. **They redeem it** - Your partner redeems coupons online using their unique access link and code whenever they choose
3. **You fulfill it** - You'll get notified so you can turn their chosen coupon into reality! Make the gesture, create the memory, and enjoy the moment together

---

## 20. FINAL NOTES FOR CLAUDE CODE

### Project Setup Command
```bash
npx create-next-app@latest couplescoupons --typescript --tailwind --app
cd couplescoupons
npm install @stripe/stripe-js stripe prisma @prisma/client
npm install react-hook-form zod @hookform/resolvers
npm install nodemailer qrcode react-pdf
npm install lucide-react
```

### Environment Variables Needed
```
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
SENDGRID_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

### Folder Structure
```
/app
  /(marketing)
    /page.tsx (homepage)
    /about/page.tsx
    /how-it-works/page.tsx
    /blog/page.tsx
  /packs
    /page.tsx (listing)
    /[slug]/page.tsx (detail)
  /checkout/[packId]/page.tsx
  /redeem/page.tsx
  /api
    /checkout/route.ts
    /webhooks/stripe/route.ts
    /redeem/route.ts
/components
  /ui (shadcn components)
  /coupon-card.tsx
  /pack-card.tsx
  /navbar.tsx
  /footer.tsx
/lib
  /db.ts (Prisma client)
  /stripe.ts
  /email.ts
  /pdf.ts
/prisma
  /schema.prisma
```

### Design Tokens
```css
:root {
  --primary: #D64933;
  --background: #FFE5E0;
  --card: #FFFFFF;
  --text: #1A1A1A;
  --text-muted: #6B6B6B;
}
```

---

**This PRD is ready for Claude Code. Provide this document along with the screenshots and any additional Bubble editor screenshots for database schema, workflows, and custom states.**
