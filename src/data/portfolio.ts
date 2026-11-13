export interface ProjectMetric {
  value: string;
  label: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: "Social Media" | "Content Creation" | "Paid Ads" | "Branding" | "Web Development";
  categories: string[];
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  heroSnippet: string;
  keyMetric: string;
  challenge: string;
  solution: string;
  strategyHighlights: string[];
  results: ProjectMetric[];
  testimonialQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "aurora-specialty-coffee",
    slug: "aurora-specialty-coffee",
    title: "Aurora Coffee Roasters",
    client: "Aurora Roastery & Cafe",
    year: "2025",
    category: "Branding",
    categories: ["Branding", "Social Media"],
    featured: true,
    coverImage: "/assets/images/case_artisan_coffee_1794498361836.jpg",
    galleryImages: [
      "/assets/images/case_artisan_coffee_1794498361836.jpg",
      "/assets/images/hero_nohslane_studio_1794498361737.jpg"
    ],
    heroSnippet: "How a Lahore specialty roastery scaled from a quiet cafe to nationwide e-commerce dominance with +310% online sales.",
    keyMetric: "+310% D2C Online Sales",
    challenge: "Despite serving some of the finest single-origin pour-overs in Lahore's Gulberg district, Aurora was viewed merely as a local neighborhood spot. Their packaging looked generic, their Instagram had low engagement, and their online subscription coffee bean sales were virtually stagnant at less than 40 bags per month.",
    solution: "NOSHLANE orchestrated a complete brand rebirth. We redesigned their visual identity with dark minimalist matte packaging accented by refined copper foil typography. Simultaneously, we launched an educational 'Art of the Brew' short-form video series demystifying bean origins, paired with targeted Meta engagement campaigns that drove coffee lovers to their new high-speed e-commerce portal.",
    strategyHighlights: [
      "Custom unboxing packaging suite engineered for tactile luxury and postal durability",
      "Organic TikTok and Instagram Reels educating Pakistani urban youth on specialty brewing",
      "Automated WhatsApp notification sequence for roast day dispatch and repeat orders",
      "DHA & Gulberg local geo-targeted ad campaigns targeting high-income specialty hobbyists"
    ],
    results: [
      { value: "+310%", label: "Increase in Monthly Online D2C Bean Orders" },
      { value: "4.2x", label: "Lift in Organic Instagram Engagement Rate" },
      { value: "1,200+", label: "Active Monthly Coffee Club Subscribers" },
      { value: "2.1x", label: "Average Order Value Increase" }
    ],
    testimonialQuote: {
      text: "NOSHLANE turned our brand into a cultural movement in Lahore. People don't just drink Aurora; they proudly display the bags in their kitchens.",
      author: "Hamza Tariq",
      role: "Founder & Head Roaster"
    }
  },
  {
    id: "nexus-fintech-pakistan",
    slug: "nexus-fintech-pakistan",
    title: "Nexus Financial Technologies",
    client: "Nexus Finance Group",
    year: "2025",
    category: "Paid Ads",
    categories: ["Paid Ads", "Web Development"],
    featured: true,
    coverImage: "/assets/images/case_fintech_growth_1794498363266.jpg",
    galleryImages: [
      "/assets/images/case_fintech_growth_1794498363266.jpg",
      "/assets/images/about_agency_culture_1794498364495.jpg"
    ],
    heroSnippet: "Scaling customer acquisition for a mobile financial platform with 4.8x ROAS and 45,000+ verified app installs at 38% lower CAC.",
    keyMetric: "4.8x ROAS / 45k Installs",
    challenge: "Nexus launched a powerful digital wallet and invoicing tool for Pakistani freelancers and SMEs, but high customer acquisition costs ($4.20 per KYC-verified user) were burning venture capital faster than runway projections permitted.",
    solution: "We restructured their entire paid acquisition funnel across Meta and Google Search. By shifting creative strategy from dry corporate UI screenshots to pain-point storytelling ('How to get paid from US clients in 5 minutes without high bank deductions'), we created high-retention video hooks. We also engineered a dedicated sub-second web onboarding flow that slashed signup drop-offs.",
    strategyHighlights: [
      "Rapid creative testing matrix deploying 12 localized Urdu & English ad variations weekly",
      "Full server-side Meta Conversions API (CAPI) implementation tracking verified KYC completions",
      "Google Search intent harvesting for terms like 'fastest USD payout in Pakistan'",
      "Interactive freelancer fee calculator built as a viral top-of-funnel lead magnet"
    ],
    results: [
      { value: "4.8x", label: "Return on Ad Spend Across Performance Channels" },
      { value: "-38%", label: "Reduction in Cost Per Verified User (CAC)" },
      { value: "45,000+", label: "New App Installs in First 120 Days" },
      { value: "99.2%", label: "Tracking Data Accuracy via Server-Side CAPI" }
    ],
    testimonialQuote: {
      text: "NOSHLANE operates with the financial discipline of a quantitative hedge fund and the creative chops of a top-tier studio.",
      author: "Usman Rafique",
      role: "VP of Growth"
    }
  },
  {
    id: "maya-couture-studio",
    slug: "maya-couture-studio",
    title: "MAYA Contemporary Atelier",
    client: "MAYA Design House",
    year: "2026",
    category: "Content Creation",
    categories: ["Content Creation", "Branding"],
    featured: true,
    coverImage: "/assets/images/case_apparel_brand_1794498363624.jpg",
    galleryImages: [
      "/assets/images/case_apparel_brand_1794498363624.jpg",
      "/assets/images/hero_nohslane_studio_1794498361737.jpg"
    ],
    heroSnippet: "12M+ organic video views and an 85% collection sell-out in under 48 hours for a contemporary Pakistani apparel brand.",
    keyMetric: "12M+ Organic Views & 85% Drop Sellout",
    challenge: "Traditional Pakistani bridal and pret fashion marketing relies heavily on generic lawn billboards and static catalog photos. MAYA wanted to disrupt this paradigm by appealing to a modern, design-literate clientele in Lahore, Karachi, and the diaspora in London and Toronto.",
    solution: "NOSHLANE directed a cinematic editorial campaign shoot in an architectural minimalist space in Lahore. We produced a series of high-contrast fashion films combining raw documentary pacing with high-fashion lighting. We coupled this with an exclusive VIP early-access drop countdown strategy on Instagram Broadcast Channels and WhatsApp.",
    strategyHighlights: [
      "Cinema-grade 4K fashion campaign shot on ARRI Alexa with custom warm color grading",
      "Behind-the-scenes master artisan embroidery documentaries highlighting craft authenticity",
      "VIP early-access drop funnel capturing 8,000+ phone numbers before public release",
      "Global currency-switching Shopify store optimized for UK, US, and Pakistani shoppers"
    ],
    results: [
      { value: "12M+", label: "Organic Reel & TikTok Video Views" },
      { value: "85%", label: "Collection Inventory Sold Out Within 48 Hours" },
      { value: "42%", label: "Sales Generated from UK & North American Overseas Buyers" },
      { value: "+62k", label: "Net New Highly Targeted Instagram Followers" }
    ],
    testimonialQuote: {
      text: "Their vision elevated MAYA to an international standard. Our drops now sell out faster than we can produce.",
      author: "Dr. Ayesha Malik",
      role: "Creative Director & Founder"
    }
  },
  {
    id: "dha-wellness-collective",
    slug: "dha-wellness-collective",
    title: "DHA Wellness & Aesthetics",
    client: "DHA Aesthetic & Longevity Clinic",
    year: "2025",
    category: "Social Media",
    categories: ["Social Media", "Paid Ads"],
    featured: false,
    coverImage: "/assets/images/hero_nohslane_studio_1794498361737.jpg",
    galleryImages: ["/assets/images/hero_nohslane_studio_1794498361737.jpg"],
    heroSnippet: "Transforming medical aesthetic lead generation in Lahore with ethical doctor-led education and high-ticket bookings.",
    keyMetric: "+240% Inbound Qualified Inquiries",
    challenge: "The aesthetics market in Lahore suffers from heavy price-discount wars and consumer skepticism regarding safety and qualifications.",
    solution: "We positioned the clinic's senior dermatologists as authoritative medical educators through high-definition myth-busting reels, transparent treatment procedure walkthroughs, and discreet patient journey chronicles.",
    strategyHighlights: [
      "Doctor Q&A formats directly answering common skin treatment fears and recovery times",
      "Direct-to-WhatsApp concierge appointment routing with automated calendar reminders",
      "Hyper-local paid Meta campaigns targeting high-income zip codes across DHA Lahore"
    ],
    results: [
      { value: "+240%", label: "Increase in Booked Private Consultations" },
      { value: "-45%", label: "No-Show Rate for In-Clinic Appointments" },
      { value: "6.1x", label: "ROI on Monthly Marketing Retainer" }
    ]
  },
  {
    id: "vortex-logistics-portal",
    slug: "vortex-logistics-portal",
    title: "Vortex Cargo & Logistics",
    client: "Vortex Global Freight Solutions",
    year: "2025",
    category: "Web Development",
    categories: ["Web Development"],
    featured: false,
    coverImage: "/assets/images/case_fintech_growth_1794498363266.jpg",
    galleryImages: ["/assets/images/case_fintech_growth_1794498363266.jpg"],
    heroSnippet: "Engineering a sub-second logistics tracking platform and quote calculator handling 50,000+ monthly shipments.",
    keyMetric: "99.98% Uptime & 2.1s Load Speed",
    challenge: "Vortex was losing major multinational corporate logistics contracts because their legacy 2012 PHP website was slow, broken on mobile devices, and lacked real-time container tracking.",
    solution: "We built an enterprise-grade React web platform with automated rate calculators, instant tracking number status lookups, and WhatsApp dispatch alerts.",
    strategyHighlights: [
      "Sub-second React frontend with instantaneous route calculations",
      "Integration with container shipping APIs for real-time customs clearance alerts",
      "Corporate inquiry wizard qualifying container volumes before routing to sales executives"
    ],
    results: [
      { value: "-64%", label: "Reduction in Routine Customer Support Phone Calls" },
      { value: "+180%", label: "Increase in Inbound Corporate Freight Quotes" },
      { value: "99.98%", label: "Operational Platform Uptime" }
    ]
  },
  {
    id: "zayn-gourmet-eats",
    slug: "zayn-gourmet-eats",
    title: "Zayn Artisanal Eatery",
    client: "Zayn Hospitality Group",
    year: "2025",
    category: "Content Creation",
    categories: ["Content Creation", "Social Media"],
    featured: false,
    coverImage: "/assets/images/about_agency_culture_1794498364495.jpg",
    galleryImages: ["/assets/images/about_agency_culture_1794498364495.jpg"],
    heroSnippet: "Driving packed weekend dinner tables in Lahore through sensory culinary cinematography and micro-creator tastings.",
    keyMetric: "+180% Weekend Foot Traffic",
    challenge: "Opening a high-concept artisanal sourdough and wood-fired bistro in Lahore's hyper-competitive dining sector required immediate buzz without cheap discounts.",
    solution: "We created mouthwatering macro food cinematography showing wood-fire ovens, bubbling cheese pulls, and artisan dough fermentation, orchestrating a private VIP preview night for Lahore's top culinary influencers.",
    strategyHighlights: [
      "Sensory ASMR culinary reels focusing on ingredient quality and craft preparation",
      "Curated invite-only tasting evening generating 45+ organic story tags on launch day",
      "Google Maps local optimization capturing 'best dinner in Gulberg' search intent"
    ],
    results: [
      { value: "+180%", label: "Increase in Weekend Walk-In Table Foot Traffic" },
      { value: "5.4M+", label: "Viral Impressions Across Lahore Food Communities" },
      { value: "4.9/5", label: "Average Google Reviews Rating from 800+ Verified Diners" }
    ]
  }
];
