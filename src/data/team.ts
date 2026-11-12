export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  specialties: string[];
  education: string;
  experience: string;
  image: string;
  tools: string[];
  notableAchievement: string;
  linkedin?: string;
  email?: string;
  avatarInitials: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "zohair-khan",
    name: "Zohair Khan",
    role: "Founder & Head of Strategy",
    department: "Executive Strategy",
    bio: "With over 9 years at the intersection of brand positioning and performance marketing, Zohair founded NOSHLANE to bridge the gap between high-fashion aesthetics and ruthless financial conversion math. He oversees growth architecture for our flagship enterprise accounts.",
    specialties: ["Brand Architecture", "E-Commerce Growth", "Market White-Space Strategy", "Venture Advisory"],
    education: "LUMS (Lahore University of Management Sciences)",
    experience: "9+ Years",
    image: "/src/assets/images/team_zohair_khan_1794501902268.jpg",
    tools: ["Notion", "Figma", "Looker Studio", "Mixpanel"],
    notableAchievement: "Scaled 4 D2C brands past PKR 100M+ in annual revenue",
    linkedin: "https://linkedin.com/in/zohair-noshlane",
    email: "zohair@noshlane.com",
    avatarInitials: "ZK"
  },
  {
    id: "mahnoor-sheikh",
    name: "Mahnoor Sheikh",
    role: "Creative Director & Film Lead",
    department: "Creative Studio",
    bio: "An NCA alumna, Mahnoor directs commercial shoots and brand films with an architectural lens. Her campaigns have accumulated over 40M organic video views across South Asia and the Middle East, transforming heritage labels into modern luxury icons.",
    specialties: ["Cinema Direction", "Art Direction", "Visual Styling", "Editorial Photography"],
    education: "National College of Arts (NCA), Lahore",
    experience: "7+ Years",
    image: "/src/assets/images/team_mahnoor_sheikh_1794501902611.jpg",
    tools: ["DaVinci Resolve", "Adobe Premiere Pro", "Capture One", "Frame.io"],
    notableAchievement: "Directed MAYA fashion films with 12M+ organic views",
    linkedin: "https://linkedin.com/in/mahnoor-noshlane",
    email: "mahnoor@noshlane.com",
    avatarInitials: "MS"
  },
  {
    id: "daniyal-ahmed",
    name: "Daniyal Ahmed",
    role: "Head of Performance Media",
    department: "Paid Acquisition",
    bio: "Daniyal has deployed over PKR 800M in profitable paid ad capital across Meta, Google, and TikTok. He specializes in algorithmic audience discovery, custom CAPI server pipelines, and creative fatigue rotation.",
    specialties: ["Meta Ads Scaling", "Google PMax", "Server-Side CAPI", "Unit Economics & CAC Reduction"],
    education: "IBA Karachi",
    experience: "8+ Years",
    image: "/src/assets/images/team_daniyal_ahmed_1794501903339.jpg",
    tools: ["Meta Ads Manager", "Google Ads", "TikTok For Business", "Triple Whale"],
    notableAchievement: "Achieved 4.8x ROAS while cutting CAC by 38% for Nexus FinTech",
    linkedin: "https://linkedin.com/in/daniyal-noshlane",
    email: "daniyal@noshlane.com",
    avatarInitials: "DA"
  },
  {
    id: "shahmeer-ali",
    name: "Shahmeer Ali",
    role: "Lead Web Architect",
    department: "Web & E-Commerce",
    bio: "Shahmeer architects ultra-fast headless Shopify platforms and custom React web applications. Obsessed with Core Web Vitals, his builds routinely score 95+ on Google PageSpeed tests with sub-second page delivery across Pakistan.",
    specialties: ["React / Next.js", "Shopify Plus", "Payment Gateway Architecture", "Core Web Vitals CRO"],
    education: "FAST-NUCES Lahore",
    experience: "6+ Years",
    image: "/src/assets/images/team_shahmeer_ali_1794501902931.jpg",
    tools: ["Next.js", "TypeScript", "Shopify Liquid", "Tailwind CSS", "Cloudflare"],
    notableAchievement: "Engineered sub-2s mobile checkouts for 15+ top e-commerce stores",
    linkedin: "https://linkedin.com/in/shahmeer-noshlane",
    email: "shahmeer@noshlane.com",
    avatarInitials: "SA"
  },
  {
    id: "sara-qureshi",
    name: "Sara Qureshi",
    role: "Senior Content Producer & Lead Copywriter",
    department: "Content & Copy",
    bio: "Sara transforms complex brand propositions into punchy, hypnotic 3-second video hooks. She leads script development and editorial calendars for our flagship D2C and lifestyle clients across Instagram and TikTok.",
    specialties: ["Short-Form Scripting", "Direct Response Copywriting", "Viral Hook Engineering", "Social Editorial"],
    education: "Kinnaird College, Lahore",
    experience: "5+ Years",
    image: "/src/assets/images/team_sara_qureshi_1794501903782.jpg",
    tools: ["Notion", "CapCut Pro", "Grammarly Business", "Later"],
    notableAchievement: "Authored 300+ viral reel scripts with >45% average retention rates",
    linkedin: "https://linkedin.com/in/sara-noshlane",
    email: "sara@noshlane.com",
    avatarInitials: "SQ"
  }
];

export const AGENCY_VALUES = [
  {
    number: "01",
    title: "Commercial Honesty Over Vanity Metrics",
    description: "Follower counts and meaningless impressions don't pay payroll. We measure our success on cash collected, qualified inbound leads, and true customer acquisition efficiency."
  },
  {
    number: "02",
    title: "Cinema-Grade Craft with Direct-Response Intent",
    description: "We refuse to choose between art and conversion. Every frame, color grade, and headline we produce is crafted to command premium pricing while driving action."
  },
  {
    number: "03",
    title: "Lahore Soul, Global Benchmarks",
    description: "Rooted in the cultural capital of Pakistan, our work blends local emotional resonance with the rigorous technical standards of leading London and New York studios."
  },
  {
    number: "04",
    title: "Speed of Iteration as a Competitive Moat",
    description: "While traditional agencies take 6 weeks to schedule a brainstorm, our sprint-driven workflows launch tested campaigns in days. The brand that tests fastest wins."
  }
];
