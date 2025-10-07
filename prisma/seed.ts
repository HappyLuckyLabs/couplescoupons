import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (for development)
  await prisma.userCoupon.deleteMany();
  await prisma.order.deleteMany();
  await prisma.couponTemplate.deleteMany();
  await prisma.couponPack.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.currencyMapping.deleteMany();

  console.log("✅ Cleared existing data");

  // ============================================================
  // CURRENCY MAPPINGS
  // ============================================================
  await prisma.currencyMapping.createMany({
    data: [
      {
        code: "AUD",
        name: "Australian Dollar",
        symbol: "$",
        region: "Australia",
        countries: ["Australia", "Kiribati", "Nauru"],
        isActive: true,
      },
      {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        region: "United States",
        countries: ["United States", "Ecuador", "El Salvador"],
        isActive: true,
      },
      {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        region: "Europe",
        countries: ["Germany", "France", "Spain", "Italy"],
        isActive: true,
      },
      {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        region: "United Kingdom",
        countries: ["United Kingdom"],
        isActive: true,
      },
    ],
  });

  console.log("✅ Created currency mappings");

  // ============================================================
  // ROMANCE PACK
  // ============================================================
  const romancePack = await prisma.couponPack.create({
    data: {
      slug: "romance",
      name: "Romance Pack",
      title: "Romance Pack",
      tagline: "Spark the romance, ignite the love",
      description:
        "20 romantic gestures to show your partner how much you care. From candlelit dinners to stargazing dates, these coupons are designed to create unforgettable moments of connection and passion.",
      priceAud: 25.0,
      priceUsd: 17.0,
      priceEur: 15.0,
      priceGbp: 13.0,
      currencySymbol: "$",
      isActive: true,
      isSeasonal: false,
      displayOrder: 1,
      whatsIncluded: [
        "Personalized message",
        "Unique secure weblink",
        "PDF card with QR code + access code",
        "Email notifications when redeemed",
        "Tips for each coupon",
        "20x digital coupons",
      ],
    },
  });

  const romanceCoupons = [
    {
      title: "Candlelit Dinner",
      description:
        "Let's enjoy a romantic dinner at home with soft music and candles. I'll cook your favorite meal and we'll dine like we're at a fancy restaurant.",
      tip: "Set the mood with candles, soft music, and your partner's favorite meal. Dress up to make it extra special!",
    },
    {
      title: "Sunset Stroll",
      description:
        "We can take a walk together during a beautiful sunset and relax on a blanket. Let's watch the colors change and talk about our dreams.",
      tip: "Find a scenic spot with a great view. Bring a blanket, some snacks, and enjoy the moment together.",
    },
    {
      title: "Role-Playing Fantasy Night",
      description:
        "Let's act out our wildest fantasies with a fun role-play scenario. Whatever you've been dreaming of, tonight we make it reality.",
      tip: "Communication is key! Discuss boundaries beforehand and have fun exploring new sides of each other.",
    },
    {
      title: "Paint the Town Red",
      description:
        "I'll take you for a night out at your favorite cocktail bar or restaurant. Dress to impress and let's celebrate us!",
      tip: "Make a reservation at their favorite spot. Surprise them by ordering their favorite drink or dish.",
    },
    {
      title: "Breakfast in Bed",
      description:
        "I'll treat you to breakfast in bed, with a special touch like a mimosa or small flower. Sleep in and I'll take care of everything.",
      tip: "Prepare their favorite breakfast. Add a fresh flower or handwritten note for extra romance.",
    },
    {
      title: "Sexy Outfit Reveal",
      description:
        "I'll surprise you with a sexy outfit, just for you. Get ready for a private fashion show you won't forget.",
      tip: "Choose something you feel confident in. Confidence is the sexiest thing you can wear!",
    },
    {
      title: "Romantic Photo Shoot",
      description:
        "I'll plan a mini photo shoot with us, capturing our best moments together. Let's create beautiful memories we can look back on.",
      tip: "Choose a meaningful location. Use a tripod with timer or ask a friend to help capture the moments.",
    },
    {
      title: "Movie Night",
      description:
        "I'll set up a cozy movie night with your favorite films and snacks. Blankets, popcorn, and cuddles included.",
      tip: "Create a cozy atmosphere with blankets and pillows. Let them choose the movie and prepare their favorite snacks.",
    },
    {
      title: "Slow Dance",
      description:
        "Let's share a slow dance at home to one of our favorite love songs. No occasion needed, just you and me.",
      tip: "Create a playlist of meaningful songs. Dim the lights and hold each other close.",
    },
    {
      title: "Starry Night Date",
      description:
        "We'll spend the evening stargazing and make a wish together. Let's find a quiet spot and get lost in the cosmos.",
      tip: "Check the weather forecast. Bring a blanket, download a stargazing app, and find a spot away from city lights.",
    },
    {
      title: "Massage Night",
      description:
        "I'll give you a relaxing massage with scented oils and candles. Let me help you unwind and feel pampered.",
      tip: "Create a spa-like atmosphere. Warm the oil, play relaxing music, and take your time.",
    },
    {
      title: "Picnic in the Park",
      description:
        "Let's enjoy a picnic with your favorite snacks in a scenic spot. Fresh air, good food, and great company.",
      tip: "Pack their favorite foods. Bring a blanket, maybe some wine, and choose a beautiful outdoor location.",
    },
    {
      title: "Love Jar",
      description:
        "I'll fill a jar with notes about why I love you, with little surprises. One note for every reason you're amazing.",
      tip: "Write at least 30 notes. Include specific memories, qualities you admire, and reasons why you're grateful for them.",
    },
    {
      title: "Handmade Gift",
      description:
        "I'll make you a thoughtful, handmade gift to show my love. Something created with my own hands, just for you.",
      tip: "Think about their interests. It could be art, a photo album, a playlist, or something you craft yourself.",
    },
    {
      title: "Personal Chauffeur",
      description:
        "I'll drive you anywhere you want to go, your personal chauffeur for the day. Relax and enjoy the ride.",
      tip: "Let them pick the destination. Play their favorite music and make the journey as enjoyable as the destination.",
    },
    {
      title: "Love Letter",
      description:
        "I'll write you a heartfelt love letter expressing my deepest feelings. A handwritten note you can keep forever.",
      tip: "Be genuine and specific. Write about what you love, memorable moments, and your hopes for the future together.",
    },
    {
      title: "Bubble Bath",
      description:
        "I'll prepare a luxurious bubble bath with candles and your favorite music. Pure relaxation awaits you.",
      tip: "Prepare the bath with bubbles, candles, rose petals if possible. Have a towel warming nearby.",
    },
    {
      title: "Dance Lesson",
      description:
        "Let's learn a new dance together. Whether it's salsa, tango, or just silly moves, we'll have fun trying.",
      tip: "Find online tutorials or take a class together. Don't worry about perfection - laugh and enjoy learning together!",
    },
    {
      title: "Sunrise Coffee Date",
      description:
        "I'll wake up early with you to watch the sunrise over coffee. A peaceful start to a beautiful day together.",
      tip: "Set an alarm, prepare their favorite coffee, and find a good spot to watch the sunrise. Bring a blanket!",
    },
    {
      title: "Weekend Getaway Planning",
      description:
        "This coupon is for planning our next romantic weekend getaway. Let's pick a destination and dream together.",
      tip: "Sit down together and browse destinations. Make it a fun planning date with wine and snacks!",
    },
  ];

  for (let i = 0; i < romanceCoupons.length; i++) {
    await prisma.couponTemplate.create({
      data: {
        packId: romancePack.id,
        ...romanceCoupons[i],
        displayOrder: i + 1,
      },
    });
  }

  console.log("✅ Created Romance Pack with 20 coupons");

  // ============================================================
  // ACTS OF SERVICE PACK
  // ============================================================
  const servicesPack = await prisma.couponPack.create({
    data: {
      slug: "acts-of-service",
      name: "Acts of Service Pack",
      title: "Acts of Service",
      tagline: "Actions speak louder than words",
      description:
        "20 thoughtful acts of service that show you care. From home-cooked meals to helping with chores, these coupons demonstrate love through helpful actions.",
      priceAud: 25.0,
      priceUsd: 17.0,
      priceEur: 15.0,
      priceGbp: 13.0,
      currencySymbol: "$",
      isActive: true,
      isSeasonal: false,
      displayOrder: 2,
      whatsIncluded: [
        "Personalized message",
        "Unique secure weblink",
        "PDF card with QR code + access code",
        "Email notifications when redeemed",
        "Tips for each coupon",
        "20x digital coupons",
      ],
    },
  });

  const servicesCoupons = [
    {
      title: "Home Cooked Dinner",
      description:
        "I'll cook your favorite meal from scratch. Candles, background music, and a peaceful meal together.",
      tip: "Find out their favorite dish. Take your time preparing it and set the table nicely.",
    },
    {
      title: "Clean the House",
      description:
        "I'll deep clean the entire house so you can relax. Spotless floors, organized spaces, and fresh everything.",
      tip: "Do a thorough job - vacuum, dust, clean bathrooms. Play music to make it fun!",
    },
    {
      title: "Grocery Shopping",
      description:
        "I'll handle all the grocery shopping this week. You make the list, I'll get everything you need.",
      tip: "Check what's running low. Buy their favorite snacks as a bonus surprise.",
    },
    {
      title: "Car Wash & Detail",
      description:
        "I'll wash and detail your car until it sparkles like new. Inside and out, it'll look amazing.",
      tip: "Vacuum the interior, clean windows, wash and wax the exterior. Maybe add an air freshener!",
    },
    {
      title: "Laundry Day",
      description:
        "I'll do all the laundry - wash, dry, fold, and put away. You won't have to touch a single sock.",
      tip: "Sort properly, use their preferred settings, and fold neatly. Bonus points for ironing!",
    },
    {
      title: "Errand Runner",
      description:
        "I'll run all your errands for the day. Post office, dry cleaning, whatever you need done.",
      tip: "Get a detailed list. Handle everything efficiently so they can truly relax.",
    },
    {
      title: "Tech Support",
      description:
        "I'll help fix that tech problem that's been bugging you. Computer updates, phone issues, whatever it is.",
      tip: "Be patient and thorough. Google any issues you're not sure about. No judgment, just help!",
    },
    {
      title: "Garden Work",
      description:
        "I'll take care of all the gardening - mowing, weeding, watering, trimming. The yard will look perfect.",
      tip: "Do a complete job. Edge the lawn, pull weeds, maybe plant something new as a surprise.",
    },
    {
      title: "Organize a Space",
      description:
        "I'll organize that closet, garage, or room that's been on your mind. Total transformation guaranteed.",
      tip: "Ask where they want help. Label containers, donate unused items, and create functional systems.",
    },
    {
      title: "Breakfast Made",
      description:
        "I'll make you breakfast every morning this week. Start each day with your favorite meal ready.",
      tip: "Find out what they love. Wake up a bit earlier and have it ready when they get up.",
    },
    {
      title: "Pet Care Day",
      description:
        "I'll take care of all pet duties for the day. Walking, feeding, playing - you get a break!",
      tip: "Give pets extra attention. Take the dog for a long walk or play with the cat.",
    },
    {
      title: "Pack Your Lunch",
      description:
        "I'll pack you healthy, delicious lunches for a whole week. No more rushing in the morning!",
      tip: "Make lunches they'll actually enjoy. Include a sweet note for at least one day.",
    },
    {
      title: "Oil Change & Car Maintenance",
      description:
        "I'll take your car for oil change and any needed maintenance. You don't have to think about it.",
      tip: "Schedule an appointment. While you're there, check tire pressure and fluids too.",
    },
    {
      title: "Administrative Tasks",
      description:
        "I'll handle all those annoying administrative tasks - bills, appointments, paperwork. Consider it done.",
      tip: "Get a list of what's been piling up. Tackle it systematically and update them on progress.",
    },
    {
      title: "Dinner Reservation & Planning",
      description:
        "I'll plan an entire date night - reservations, activity, everything. You just show up and enjoy.",
      tip: "Pick somewhere special. Make reservations in advance. Plan a full evening itinerary.",
    },
    {
      title: "Meal Prep Sunday",
      description:
        "I'll meal prep for both of us for the entire week. Healthy, delicious meals ready to go.",
      tip: "Plan a balanced menu. Prep on Sunday. Use proper containers and label everything.",
    },
    {
      title: "Fix That Thing",
      description:
        "I'll finally fix that thing that's been broken forever. The squeaky door, loose handle, whatever it is.",
      tip: "Ask what needs fixing. Get the right tools and materials. Don't rush - do it properly.",
    },
    {
      title: "Deep Clean Kitchen",
      description:
        "I'll deep clean the kitchen - oven, fridge, cabinets, everything. It'll sparkle when I'm done.",
      tip: "Clean out the fridge, degrease the oven, wipe down all surfaces. Don't forget inside cabinets!",
    },
    {
      title: "Kid Duty",
      description:
        "I've got the kids all day. You get a full day of rest and relaxation. Go do something for yourself!",
      tip: "Plan fun activities for the kids. Give your partner true alone time without interruptions.",
    },
    {
      title: "Budget & Finance Check",
      description:
        "I'll handle reviewing our budget and finances this month. Spreadsheets, bills, all organized.",
      tip: "Review all accounts. Create or update budget spreadsheets. Discuss any concerns together afterwards.",
    },
  ];

  for (let i = 0; i < servicesCoupons.length; i++) {
    await prisma.couponTemplate.create({
      data: {
        packId: servicesPack.id,
        ...servicesCoupons[i],
        displayOrder: i + 1,
      },
    });
  }

  console.log("✅ Created Acts of Service Pack with 20 coupons");

  // ============================================================
  // MAKING MEMORIES PACK
  // ============================================================
  const memoriesPack = await prisma.couponPack.create({
    data: {
      slug: "making-memories",
      name: "Making Memories Pack",
      title: "Making Memories",
      tagline: "Cherish moments, create bonds",
      description:
        "20 experiences designed to create lasting memories together. From adventures to quiet moments, these coupons are about building a lifetime of shared stories.",
      priceAud: 25.0,
      priceUsd: 17.0,
      priceEur: 15.0,
      priceGbp: 13.0,
      currencySymbol: "$",
      isActive: true,
      isSeasonal: false,
      displayOrder: 3,
      whatsIncluded: [
        "Personalized message",
        "Unique secure weblink",
        "PDF card with QR code + access code",
        "Email notifications when redeemed",
        "Tips for each coupon",
        "20x digital coupons",
      ],
    },
  });

  const memoriesCoupons = [
    {
      title: "Try a New Restaurant",
      description:
        "Let's explore a cuisine we've never tried before. Adventure on a plate!",
      tip: "Research highly-rated restaurants with cuisines you haven't experienced. Make it a mini adventure.",
    },
    {
      title: "Museum or Gallery Visit",
      description:
        "We'll spend an afternoon getting cultured at a museum or art gallery. Let's discover something new together.",
      tip: "Check for special exhibits. Many museums have free days. Take your time and discuss what you see.",
    },
    {
      title: "Hiking Adventure",
      description:
        "Let's go on a hike to somewhere we've never been. Fresh air, nature, and quality time.",
      tip: "Choose a trail appropriate for both fitness levels. Bring water, snacks, and take photos at the summit!",
    },
    {
      title: "Cooking Class Together",
      description:
        "We'll take a cooking class and learn to make something new. Then we get to eat our creation!",
      tip: "Look for local cooking classes or follow an online tutorial together. Make it fun, not perfect.",
    },
    {
      title: "Road Trip",
      description:
        "Let's take a spontaneous road trip somewhere new. Pack a bag, hit the road, and see where we end up.",
      tip: "Pick a direction and drive. Stop at interesting places along the way. It's about the journey!",
    },
    {
      title: "Concert or Live Show",
      description:
        "I'll get us tickets to see live music or a show you've been wanting to see. Let's experience it together.",
      tip: "Check their favorite artists' tour schedules. Even local bands create great memories!",
    },
    {
      title: "Beach Day",
      description:
        "We'll spend the day at the beach - sun, sand, and sea. Swim, relax, and soak up the sun together.",
      tip: "Bring sunscreen, towels, snacks, and maybe a beach game. Stay for sunset if possible.",
    },
    {
      title: "Game Night Tournament",
      description:
        "Let's have an epic game night tournament. Board games, card games, video games - winner takes all!",
      tip: "Set up a bracket. Have prizes for winners. Make snacks and drinks. Get competitive in a fun way!",
    },
    {
      title: "Volunteer Together",
      description:
        "We'll volunteer together for a cause we care about. Making a difference while making memories.",
      tip: "Choose a cause you both care about. Many organizations need weekend volunteers.",
    },
    {
      title: "Take a Class Together",
      description:
        "Let's learn something new together - pottery, dance, photography, whatever interests us!",
      tip: "Try something neither of you have done before. Being beginners together is bonding!",
    },
    {
      title: "Farmers Market Morning",
      description:
        "We'll explore a farmers market, buy fresh ingredients, then cook a meal together with our finds.",
      tip: "Go early for the best selection. Try samples, talk to vendors, and pick ingredients for a meal.",
    },
    {
      title: "Amusement Park Day",
      description:
        "Let's be kids again at an amusement park. Rides, games, cotton candy, and tons of laughter.",
      tip: "Go on a weekday if possible to avoid crowds. Don't skip the silly photo opportunities!",
    },
    {
      title: "Spa Day Together",
      description:
        "We'll book a couples spa day - massages, relaxation, and pampering together.",
      tip: "Look for spa packages designed for couples. Book in advance and make a day of it.",
    },
    {
      title: "Photography Walk",
      description:
        "Let's go on a photography walk and capture beautiful moments. Phones or cameras, let's see the world through a lens.",
      tip: "Pick a scenic location. Make it a competition or collaboration. Print your favorite shots afterwards.",
    },
    {
      title: "Karaoke Night",
      description:
        "We're doing karaoke together! Whether we're good or terrible, we'll have a blast singing our hearts out.",
      tip: "Choose songs you both know. Don't take it seriously - the worse you are, the more fun it is!",
    },
    {
      title: "Bike Ride Adventure",
      description:
        "Let's go for a bike ride somewhere scenic. Explore new paths and see where the trail takes us.",
      tip: "Plan a route with nice views. Bring water and maybe plan a destination for lunch or coffee.",
    },
    {
      title: "Camping Under Stars",
      description:
        "We'll go camping for a night. Tent, campfire, s'mores, and stars. Back to nature together.",
      tip: "Check weather forecast. If you're new to camping, try car camping or even backyard camping first!",
    },
    {
      title: "Bookstore Date",
      description:
        "Let's spend hours in a bookstore, find books for each other, then grab coffee and share what we found.",
      tip: "Give each other a budget. Pick books you think they'd love. Discuss your choices over coffee.",
    },
    {
      title: "Wine or Brewery Tasting",
      description:
        "We'll visit a winery or brewery for a tasting. Learn about the craft and enjoy sampling together.",
      tip: "Book a tour if available. Take notes on favorites. Buy a bottle to enjoy later and remember the day.",
    },
    {
      title: "Create Time Capsule",
      description:
        "Let's create a time capsule together with mementos from this year. We'll open it in 5 years!",
      tip: "Include photos, letters to future selves, ticket stubs, and small meaningful items. Mark your calendar for the opening!",
    },
  ];

  for (let i = 0; i < memoriesCoupons.length; i++) {
    await prisma.couponTemplate.create({
      data: {
        packId: memoriesPack.id,
        ...memoriesCoupons[i],
        displayOrder: i + 1,
      },
    });
  }

  console.log("✅ Created Making Memories Pack with 20 coupons");

  // ============================================================
  // PROMO CODES
  // ============================================================
  await prisma.promoCode.createMany({
    data: [
      {
        code: "LAUNCH10",
        description: "10% off launch promo",
        discountType: "percentage",
        discountValue: 10,
        maxUses: 100,
        isActive: true,
      },
      {
        code: "WELCOME5",
        description: "$5 off for new customers",
        discountType: "fixed_amount",
        discountValue: 5,
        maxUses: null,
        isActive: true,
      },
      {
        code: "LOVE20",
        description: "20% off for Valentine's Day",
        discountType: "percentage",
        discountValue: 20,
        isActive: false,
      },
    ],
  });

  console.log("✅ Created promo codes");

  // ============================================================
  // FAQs
  // ============================================================
  await prisma.faq.createMany({
    data: [
      {
        question: "How do Couples Coupons work?",
        answer:
          "Purchase a pack of 20 digital coupons, personalize your message, and send it to your partner via email or printable PDF. They can redeem coupons online anytime, and you'll get notified when they do!",
        displayOrder: 1,
      },
      {
        question: "Can I customize my coupon pack?",
        answer:
          "Currently, we offer three curated packs (Romance, Acts of Service, and Making Memories), each with 20 unique coupons. Each pack is thoughtfully designed by relationship experts to cover various ways to show love and appreciation.",
        displayOrder: 2,
      },
      {
        question: "Do the coupons expire?",
        answer:
          "No! Your digital coupons never expire. Redeem them whenever the moment feels right - whether that's next week or next year.",
        displayOrder: 3,
      },
      {
        question: "How does my partner redeem a coupon?",
        answer:
          "Your partner receives a unique access link and code via email (or PDF card). They simply visit the link, enter their code, browse their 20 coupons, and click 'Redeem' on the one they want. You'll receive an instant email notification!",
        displayOrder: 4,
      },
      {
        question: "How do I gift a pack to my partner?",
        answer:
          "After purchase, you'll write a personalized message and provide your partner's name. We'll send them a beautiful email with your message, plus a downloadable PDF card featuring a QR code for easy access. You can also print the PDF card and give it in person!",
        displayOrder: 5,
      },
      {
        question: "What if I lose my access code?",
        answer:
          "No worries! The access code is in your original email. If you can't find it, contact us at support@couplescoupons.com with your order details and we'll help you out.",
        displayOrder: 6,
      },
      {
        question: "Can I purchase multiple packs?",
        answer:
          "Absolutely! Many couples love mixing and matching packs. Each pack comes with its own unique access code and set of 20 coupons.",
        displayOrder: 7,
      },
      {
        question: "What's your refund policy?",
        answer:
          "We offer a full refund within 24 hours of purchase if the coupon pack hasn't been accessed yet. Just email support@couplescoupons.com.",
        displayOrder: 8,
      },
    ],
  });

  console.log("✅ Created FAQs");

  // ============================================================
  // SAMPLE BLOG POSTS
  // ============================================================
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "101-acts-of-service-for-your-partner",
        title: "101 Acts of Service for Your Partner",
        shortDescription:
          "Discover simple yet meaningful ways to show love through helpful actions that make your partner's life easier and happier.",
        content:
          "Acts of service are one of the five love languages, and for many people, actions truly speak louder than words...",
        isPublished: true,
        views: 0,
      },
      {
        slug: "keeping-romance-alive-long-term-relationships",
        title: "How to Keep Romance Alive in Long-Term Relationships",
        shortDescription:
          "Expert tips on maintaining passion, connection, and romance even after years together.",
        content:
          "Long-term relationships are beautiful, but they require effort to keep the spark alive...",
        isPublished: true,
        views: 0,
      },
      {
        slug: "five-love-languages-explained",
        title: "The 5 Love Languages: Which One is Yours?",
        shortDescription:
          "Understanding how you and your partner give and receive love can transform your relationship.",
        content:
          "Dr. Gary Chapman's concept of love languages has helped millions of couples better understand each other...",
        isPublished: true,
        views: 0,
      },
    ],
  });

  console.log("✅ Created sample blog posts");

  console.log("🎉 Database seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
