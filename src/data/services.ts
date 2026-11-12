export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  heroKicker: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  statHighlight: {
    value: string;
    label: string;
  };
  whatsIncluded: {
    title: string;
    description: string;
    items: string[];
  }[];
  processSteps: ServiceProcessStep[];
  deliverables: string[];
  faqs: ServiceFAQ[];
  idealFor: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "social-media-management",
    slug: "social-media-management",
    title: "Social Media Management",
    heroKicker: "Organic Reach & Community Velocity",
    tagline: "Build cultural relevance, active community loyalty, and predictable organic lead flow.",
    shortDescription: "Strategic content calendars, community management, trend hijacking, and daily brand publishing on Instagram, TikTok, and LinkedIn.",
    fullDescription: "In modern consumer markets, social media is your storefront and frontline reputation. We build holistic social ecosystems that transform casual scrollers into paying, loyal brand advocates. From high-retention reel scripts and daily stories to active DM lead triage, our team runs your channels with relentless consistency.",
    iconName: "Share2",
    statHighlight: {
      value: "4.2x",
      label: "Average Organic Engagement Lift"
    },
    whatsIncluded: [
      {
        title: "Content Calendar & Editorial Rhythm",
        description: "Monthly content mapping structured around brand narratives, product launches, customer education, and viral cultural moments.",
        items: [
          "16–24 high-retention posts & short-form video reels per month",
          "Daily active story programming with engagement polls & quizzes",
          "Scriptwriting tailored to South Asian and international consumer hooks",
          "Strategic hashtag & SEO discoverability architecture"
        ]
      },
      {
        title: "Community Growth & Social Triage",
        description: "Fast-response community interaction that turns post comments and DMs into qualified sales inquiries.",
        items: [
          "Direct message response protocols within 15–30 minutes during business hours",
          "Proactive outbound engagement with complementary brands and target micro-influencers",
          "Comment moderation and brand sentiment monitoring",
          "WhatsApp lead handoff routing for direct inquiries"
        ]
      },
      {
        title: "Analytics, Attribution & Strategy Iteration",
        description: "Weekly data review loops tracking reach velocity, profile visit rates, follower quality, and website conversion clicks.",
        items: [
          "Bi-weekly live performance check-ins via Google Meet",
          "Transparent monthly dashboard highlighting audience retention curves",
          "Creative winner replication frameworks",
          "Competitor positioning teardowns"
        ]
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Brand Voice & Visual Tone Extraction",
        description: "We audit your past performance, analyze top competitor blind spots, and craft a distinct brand voice guideline and visual aesthetic system."
      },
      {
        step: "02",
        title: "Content Matrix & Production Roadmap",
        description: "We architect an 8-pillar content grid covering social proof, founder storytelling, objections teardown, and product spotlight reels."
      },
      {
        step: "03",
        title: "Publishing, Testing & Live Community Nurturing",
        description: "Our team handles scheduling, caption copywriting, sound selection, and frontline comment engagement with zero friction for you."
      },
      {
        step: "04",
        title: "Retention Analytics & Monthly Growth Sprint",
        description: "We dissect data every 30 days to double down on winning creative formats and discard lagging hooks."
      }
    ],
    deliverables: [
      "Monthly Content Calendar (Google Sheets / Notion)",
      "16–24 Custom Produced Graphics & Video Reels",
      "Daily Story Graphics & Engagement Templates",
      "Comprehensive Monthly Performance & Attribution Report",
      "Dedicated Slack / WhatsApp Communication Channel"
    ],
    faqs: [
      {
        question: "Do you shoot the content in Lahore or do we provide footage?",
        answer: "We offer both! For Lahore-based brands, our in-house production crew comes directly to your store, warehouse, clinic, or restaurant with cinema cameras, lighting, and audio gear. For remote and overseas clients, we direct your team or work with sent products."
      },
      {
        question: "How long before we see noticeable growth in follower count and engagement?",
        answer: "Most clients notice an immediate jump in engagement rate and video reach within the first 3 weeks. Sustained compounding follower growth and organic conversions typically solidify in Months 2 through 3 as the algorithms index consistent content."
      },
      {
        question: "Can we review and approve posts before they go live?",
        answer: "Yes, 100%. We submit the entire month's content plan with graphics, video cuts, and captions 5–7 days prior to scheduling. You have full sign-off control."
      },
      {
        question: "Which platforms do you manage?",
        answer: "Our primary expertise is Instagram, TikTok, LinkedIn, and Facebook, with tailored YouTube Shorts syndication where applicable."
      }
    ],
    idealFor: [
      "Direct-to-consumer fashion, beauty, and lifestyle brands",
      "Hospitality venues, cafes, and restaurant concepts",
      "Professional service firms and founders building personal authority",
      "Healthcare, aesthetic clinics, and wellness centers"
    ]
  },
  {
    id: "content-creation",
    slug: "content-creation",
    title: "Content Creation & Studio",
    heroKicker: "Cinema-Grade Visual Storytelling",
    tagline: "High-production product photography, vertical video, and brand documentaries that stop the scroll.",
    shortDescription: "End-to-end creative direction, 4K product shoots, cinematic brand films, and high-volume short-form video reels produced in our studio.",
    fullDescription: "Average stock footage and amateur smartphone clips no longer cut through the noise. NOSHLANE operates a dedicated creative production studio equipped with cinema cameras, studio strobe setups, gimbal rigs, and seasoned editors. We build visual assets that command luxury pricing and skyrocket conversion rates.",
    iconName: "Video",
    statHighlight: {
      value: "18M+",
      label: "Views Generated on In-House Shoots"
    },
    whatsIncluded: [
      {
        title: "Commercial Product & Editorial Photography",
        description: "Pristine studio and lifestyle photoshoots designed for e-commerce stores, billboards, and high-impact digital ads.",
        items: [
          "Studio macro product photography with custom texture backdrops",
          "On-location lifestyle & model shoots in Lahore's most architectural spaces",
          "High-end retouching, color grading, and asset formatting for all devices",
          "Full commercial licensing rights included"
        ]
      },
      {
        title: "Short-Form Video & Viral UGC Engineering",
        description: "Scroll-stopping vertical video designed for Meta Reels, TikTok, and YouTube Shorts that capture consumer attention within 1.5 seconds.",
        items: [
          "Hook-driven scriptwriting with tested behavioral triggers",
          "Professional lighting, crystal clear lavalier audio, and 4K capture",
          "Dynamic editing with sound design, kinetic captions, and motion graphics",
          "Batched sprint shoots delivering 20+ ready-to-run video assets in a single day"
        ]
      },
      {
        title: "Brand Films & Founder Stories",
        description: "Documentary-style brand manifestos that anchor your about page and build lifelong emotional trust with customers.",
        items: [
          "Creative treatment and narrative storyboard drafting",
          "Director-led interview capture and behind-the-scenes cinematography",
          "Custom music composition licensing and theatrical sound design",
          "Cutdowns for YouTube pre-roll and event presentations"
        ]
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Creative Treatment & Visual Moodboard",
        description: "We assemble moodboards, lighting references, talent casting briefs, and narrative shot-lists aligned with your product identity."
      },
      {
        step: "02",
        title: "Production Sprint (Studio / Location)",
        description: "Our directors, cinematographers, stylists, and gaffers execute the shoot with strict fidelity to the approved shot-list."
      },
      {
        step: "03",
        title: "Post-Production, Color Grading & Sound Design",
        description: "We edit in DaVinci Resolve and Premiere Pro, applying custom color LUTs, punchy kinetic captions, and licensed soundscapes."
      },
      {
        step: "04",
        title: "Master Delivery & Ad Asset Formatting",
        description: "You receive organized cloud folders with 9:16, 16:9, 1:1, and 4:5 exports optimized for web, social, and ad managers."
      }
    ],
    deliverables: [
      "High-Resolution Edited Photo Masters (TIFF / WebP / JPEG)",
      "Color-Graded 4K Video Cuts (Reels, Feed, Stories)",
      "Raw Footage Archive upon request",
      "Full Commercial & Advertising Usage Rights",
      "Organized Cloud Storage Access (Dropbox / Drive)"
    ],
    faqs: [
      {
        question: "Can we ship products to your Lahore studio if we are located outside Lahore?",
        answer: "Absolutely. Many of our clients from Karachi, Islamabad, Dubai, and London ship their apparel, packaged goods, or skincare products directly to our Gulberg studio. We execute the shoots and ship the items back."
      },
      {
        question: "Do you hire models, stylists, and makeup artists?",
        answer: "Yes, we have an extensive roster of professional commercial models, fashion stylists, and makeup artists in Lahore to fit your brand aesthetic and budget."
      },
      {
        question: "What is your turnaround time for post-production?",
        answer: "Standard turnaround for video reels and edited photo batches is 5 to 7 business days following the shoot date. Expedited 48-hour delivery is available for urgent campaigns."
      },
      {
        question: "Do you provide video concepts and scripts or do we write them?",
        answer: "We write all scripts and creative hooks from scratch. We study what is converting in your niche and pitch verified concepts for your approval."
      }
    ],
    idealFor: [
      "E-commerce brands requiring high-converting product showcases",
      "Apparel, jewelry, and luxury consumer goods",
      "Real estate developers and architectural practices",
      "Food, beverage, and cloud kitchen enterprises"
    ]
  },
  {
    id: "paid-ads",
    slug: "paid-ads",
    title: "Paid Ads & Performance Marketing",
    heroKicker: "Data-Driven Capital Allocation",
    tagline: "Scale profitable customer acquisition across Meta, Google Search, YouTube, and TikTok Ads.",
    shortDescription: "Disciplined media buying, creative fatigue testing, attribution tracking, and conversion rate optimization that drives verifiable revenue.",
    fullDescription: "Throwing ad money at broad audiences and hoping for the best is how brands burn capital. NOSHLANE treats your ad budget like an investment portfolio. We run rigorous creative testing matrices, optimize for high purchase intent, and implement rock-solid Server-Side Conversion APIs so you know the exact ROI of every rupee spent.",
    iconName: "TrendingUp",
    statHighlight: {
      value: "4.4x",
      label: "Average Return on Ad Spend (ROAS)"
    },
    whatsIncluded: [
      {
        title: "Meta & TikTok Ads Scaling Engine",
        description: "Full-funnel paid social architectures engineered to find new buyers at scale while aggressively retargeting warm audiences.",
        items: [
          "Account restructuring with Advantage+ and manual bidding strategies",
          "Dynamic creative testing (DCT) cycling 10+ new hooks and angles weekly",
          "Audience segmentation (Cold Prospecting, Middle-of-Funnel Nurture, VIP Retargeting)",
          "Exclusion architectures to prevent wasting budget on existing customers"
        ]
      },
      {
        title: "Google Ads & Intent-Driven Search",
        description: "Capture high-intent buyers the exact moment they search for your service or product in Lahore, across Pakistan, or worldwide.",
        items: [
          "High-intent Google Search campaigns with negative keyword negative walls",
          "Google Performance Max (PMax) optimized for highest-margin product SKUs",
          "YouTube video action campaigns driving qualified B2B leads",
          "Google Merchant Center feed optimization and error remediation"
        ]
      },
      {
        title: "Attribution & Server-Side Tracking (CAPI)",
        description: "Bypass iOS tracking restrictions with bulletproof first-party data capture.",
        items: [
          "Meta Conversions API (CAPI) and Google Tag Manager server-side implementation",
          "Triple-attribution cross-referencing Shopify/WooCommerce backend with ad dashboards",
          "UTM taxonomy architecture for clean Google Analytics 4 reporting",
          "Weekly ad spend vs. real cash-collected reconciliation"
        ]
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Account Deep Audit & Tracking Validation",
        description: "We audit your historical ad account, fix broken tracking pixels, verify domain integrations, and install server-side CAPI."
      },
      {
        step: "02",
        title: "Creative Matrix & Testing Sandbox",
        description: "We launch structured testing ad sets testing multiple hooks, angles, and formats to identify statistical winners without burning cash."
      },
      {
        step: "03",
        title: "Budget Consolidation & Profitable Scaling",
        description: "Winning ad creatives are graduated into consolidated scaling campaigns with incremental budget increases of 15–20% every 48 hours."
      },
      {
        step: "04",
        title: "Landing Page CRO & Retargeting Loops",
        description: "We optimize post-click landing pages, add sticky checkout CTAs, and run customized offer bundles to lift average order value."
      }
    ],
    deliverables: [
      "Custom Live Performance Dashboard (Looker Studio / Notion)",
      "Weekly Ad Creative Iterations & Copy Variations",
      "Pixel & Conversions API Setup with 9.0+ Event Quality Match Rate",
      "Bi-Weekly Strategy & Media Allocation Calls",
      "Daily Ad Spend & Bid Management"
    ],
    faqs: [
      {
        question: "What is the minimum ad spend required to work together?",
        answer: "We recommend a minimum monthly media spend of PKR 250,000 for local Pakistani campaigns or $2,500 USD for international campaigns to allow enough conversion data for algorithm learning and statistically valid testing."
      },
      {
        question: "Who pays for the advertising budget?",
        answer: "Ad spend is paid directly to Meta, Google, or TikTok via your company's credit/debit card on file in your ad account. You retain 100% ownership of your accounts and intellectual property."
      },
      {
        question: "Do you supply the ad graphics and videos as well?",
        answer: "Yes! Our paid ads management package includes graphic design, video cutdowns, hook testing iterations, and persuasive ad copywriting from our in-house creative team."
      },
      {
        question: "How do you handle currency fluctuations and bank tax limits in Pakistan?",
        answer: "We advise our Pakistani clients on optimizing bank corporate cards, navigating international transaction quotas, and structuring local ad payment methods efficiently."
      }
    ],
    idealFor: [
      "E-commerce stores wanting to scale beyond PKR 5M–50M monthly revenue",
      "B2B service providers seeking high-intent consultation bookings",
      "Real estate developers targeting overseas Pakistani investors",
      "Education institutions and certification programs"
    ]
  },
  {
    id: "branding",
    slug: "branding",
    title: "Brand Strategy & Visual Identity",
    heroKicker: "Unforgettable Brand Equity",
    tagline: "Position your brand above the commodity price trap with timeless identity systems.",
    shortDescription: "Strategic positioning, logo design, typography systems, packaging design, and comprehensive brand guideline guidelines.",
    fullDescription: "A great brand doesn't compete on price; it commands devotion. NOSHLANE builds comprehensive visual identity systems rooted in commercial positioning. We dive into market psychology, competitive white space, and cultural nuances to design identities that feel instantly iconic and scale seamlessly from packaging boxes to digital mobile screens.",
    iconName: "Palette",
    statHighlight: {
      value: "60+",
      label: "Brand Identities Created"
    },
    whatsIncluded: [
      {
        title: "Strategic Brand Positioning & Archetype",
        description: "Define the core philosophy, tone of voice, customer archetype, and value differentiators before drawing a single line.",
        items: [
          "Target audience persona mapping and psychological pain-point teardowns",
          "Competitive landscape benchmarking and white-space differentiation strategy",
          "Brand mission, manifesto, and verbal tone of voice playbook",
          "Tagline and brand vocabulary guidelines"
        ]
      },
      {
        title: "Complete Visual Identity System",
        description: "A cohesive, multi-format design suite that looks cohesive whether printed on luxury retail bags or rendered as an app icon.",
        items: [
          "Primary, secondary, and sub-mark logo variations",
          "Curated typography hierarchy with licensed font pairings",
          "Intentional color palette with CMYK, RGB, and Pantone codes",
          "Custom iconography, graphic pattern motifs, and photographic style guides"
        ]
      },
      {
        title: "Packaging & Collateral Execution",
        description: "Physical and digital brand touchpoints that create an unforgettable unboxing experience.",
        items: [
          "Product packaging, custom unboxing boxes, sleeves, and tissue paper design",
          "Stationery suite, corporate business cards, invoice templates, and email signatures",
          "Social media launch kit with profile avatars, banner headers, and highlight covers",
          "Comprehensive 60+ page Brand Bible PDF"
        ]
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Market White-Space Research",
        description: "We conduct in-depth founder interviews, study customer sentiment, and analyze international competitors to uncover unique brand positioning."
      },
      {
        step: "02",
        title: "Creative Directions & Conceptual Moodboards",
        description: "We present 2 distinct, fully thought-out visual directions showcasing logos, color theories, and simulated real-world applications."
      },
      {
        step: "03",
        title: "Refinement & Touchpoint Expansion",
        description: "Once your chosen concept is selected, we refine the geometry, test readability across all sizes, and design packaging and collateral."
      },
      {
        step: "04",
        title: "The Brand Bible & Master Asset Delivery",
        description: "You receive organized vector master files (AI, EPS, SVG, PNG) and a detailed Brand Bible detailing exact implementation rules."
      }
    ],
    deliverables: [
      "Vector Master Logo Suite (Color, Monochrome, Inverted)",
      "Comprehensive Brand Guidelines Book (PDF)",
      "Curated Font Files & Digital Color Swatches",
      "Ready-to-Print Packaging Diellines (AI / PDF)",
      "Digital Social Launch Kit"
    ],
    faqs: [
      {
        question: "How long does a complete branding project take?",
        answer: "A complete brand strategy and visual identity project typically takes 3 to 4 weeks from discovery kickoff to final asset handoff."
      },
      {
        question: "Do you also handle printing for packaging in Lahore?",
        answer: "Yes, we work closely with high-end packaging printers and die-makers across Lahore to oversee paper stock selection, foil stamping, embossing tests, and print quality checks."
      },
      {
        question: "Can we rebrand our existing business without losing brand equity?",
        answer: "Yes. Brand evolution and legacy modernization is one of our core specialties. We preserve the recognizable elements your customers trust while elevating the modern aesthetic and market readiness."
      },
      {
        question: "Do we get full trademark and copyright ownership?",
        answer: "Yes, upon project completion and final payment, 100% intellectual property ownership and commercial usage rights transfer entirely to you."
      }
    ],
    idealFor: [
      "New startups preparing for market launch",
      "Established businesses suffering from outdated visuals",
      "D2C brands expanding from local markets to international export",
      "Boutique hospitality, architecture, and luxury retail"
    ]
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development & E-Commerce",
    heroKicker: "Lightning-Fast Conversion Architecture",
    tagline: "Custom web applications and high-conversion Shopify stores built for speed and sales.",
    shortDescription: "Ultra-fast custom React/Next.js web applications, headless e-commerce, custom Shopify Plus setups, and frictionless checkout funnels.",
    fullDescription: "Your website is your ultimate digital salesman. If it loads in 4 seconds or confuses mobile shoppers, you're leaking half your potential revenue. We engineer custom web platforms and e-commerce stores designed for 95+ Google PageSpeed scores, intuitive UX, seamless local payment gateway integration (JazzCash, EasyPaisa, PayFast, Stripe), and maximum conversion rates.",
    iconName: "Code",
    statHighlight: {
      value: "95+",
      label: "Google PageSpeed Performance Score"
    },
    whatsIncluded: [
      {
        title: "Custom Shopify & E-Commerce Stores",
        description: "High-converting online stores engineered for friction-free purchasing, mobile thumb navigation, and high average order values.",
        items: [
          "Custom Shopify theme development with zero bloated apps",
          "Optimized 1-page checkout flows with post-purchase upsell mechanics",
          "Pakistani payment gateway integrations (JazzCash, EasyPaisa, PayFast, Alfa, COD)",
          "Real-time courier inventory sync (Trax, Call Courier, Leopards, PostEx, DHL)"
        ]
      },
      {
        title: "Custom Modern Web Applications (React / Next.js)",
        description: "Bespoke digital platforms, agency portals, interactive calculators, and corporate websites built with cutting-edge tech stacks.",
        items: [
          "Modern component-driven architectures (React, Next.js, TypeScript, Tailwind)",
          "Server-side rendering (SSR) and edge caching for sub-second page loads",
          "Interactive client dashboards, booking engines, and dynamic filtering",
          "Clean, maintainable codebases with zero legacy technical debt"
        ]
      },
      {
        title: "SEO Foundation & Conversion Optimization",
        description: "Technical SEO and speed optimization that guarantees top search ranking and prevents mobile drop-off.",
        items: [
          "Core Web Vitals green compliance (LCP < 1.8s, CLS < 0.05)",
          "Schema.org rich snippet structured data for Google product and local agency cards",
          "Automated image compression (WebP / AVIF) and lazy loading",
          "Mobile-first responsive layout tested across 20+ viewport resolutions"
        ]
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Information Architecture & Wireframing",
        description: "We map out user journey flows, click hierarchies, and low-fidelity wireframes prioritizing conversion paths."
      },
      {
        step: "02",
        title: "High-Fidelity UI/UX Prototyping",
        description: "We design every desktop and mobile screen state with interactive hover states and micro-interactions."
      },
      {
        step: "03",
        title: "Clean Frontend & Backend Engineering",
        description: "We code the solution with semantic HTML5, modern React/TypeScript, clean API integrations, and robust database layers."
      },
      {
        step: "04",
        title: "Quality Assurance, Speed Testing & Launch",
        description: "We run cross-browser testing, load stress tests, payment sandbox validations, and execute zero-downtime DNS deployments."
      }
    ],
    deliverables: [
      "Fully Responsive, Production-Ready Website / Store",
      "Complete Source Code Repository Access",
      "Payment Gateway & Courier API Configurations",
      "Technical SEO & Google Analytics 4 Setup",
      "30-Day Post-Launch Warranty & Video Training Walkthroughs"
    ],
    faqs: [
      {
        question: "Which platform do you recommend: Shopify or a Custom React/Next.js build?",
        answer: "For consumer e-commerce brands with standard catalogs and inventory needs, we recommend custom-engineered Shopify setups for reliability and easy catalog updates. For B2B platforms, SaaS, luxury agencies, or bespoke calculation tools, a custom Next.js/React web app provides superior speed, security, and design freedom."
      },
      {
        question: "Can you integrate local Pakistani payment gateways like JazzCash, EasyPaisa, and Bank Alfalah?",
        answer: "Yes, we have extensive experience integrating PayFast, JazzCash, EasyPaisa, Bank Alfalah IPG, Safepay, and international gateways like Stripe and PayPal."
      },
      {
        question: "Will my website be mobile-friendly and fast?",
        answer: "Yes. In Pakistan and the Middle East, over 80% of traffic originates from mobile devices. We design and optimize every single interface mobile-first with sub-2 second load times."
      },
      {
        question: "Do you provide hosting and ongoing technical maintenance?",
        answer: "Yes, we offer ongoing maintenance, security updates, server backups, and continuous speed monitoring packages."
      }
    ],
    idealFor: [
      "Direct-to-consumer e-commerce retailers",
      "B2B corporations requiring credible web presence",
      "High-ticket service firms and consultants",
      "Tech startups and digital platforms"
    ]
  }
];
