export interface AgencyStat {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  metric: string;
  service: string;
  initials: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export const AGENCY_DETAILS = {
  name: "NOSHLANE",
  fullName: "NOSHLANE AGENCY",
  tagline: "High-Velocity Digital Marketing, Content & Brand Architecture",
  shortDescription: "A premier creative performance agency engineered for high-growth brands in Lahore, Pakistan and global markets. Powered by cinema-grade content production, paid media science, and custom web development.",
  foundedYear: 2020,
  yearsActive: "6+",
  logoUrl: "/assets/aistudio/image_9171a724.png",
  location: {
    city: "Lahore",
    country: "Pakistan",
    address: "Floor 4, Tricon Corporate Centre, Main Boulevard, Gulberg II",
    fullAddress: "Floor 4, Tricon Corporate Centre, Main Boulevard, Gulberg II, Lahore, 54660, Pakistan",
    landmark: "Directly opposite Siddiq Trade Centre / Near Liberty Roundabout",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.378942352877!2d74.34149637628867!3d31.513757974217116!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f135!3m3!1m2!1s0x3919045a55555555%3A0x6a2979ee0ce1e22!2sTricon%20Corporate%20Centre!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
  },
  contact: {
    email: "hello@noshlane.com",
    inquiriesEmail: "growth@noshlane.com",
    phone: "+92 300 1234567",
    phoneDisplay: "+92 (300) 123-4567",
    whatsappNumber: "923001234567",
    whatsappDefaultMessage: "Hi NOSHLANE team, I would like to schedule a strategy call / request a free marketing audit for my brand.",
    hours: "Monday – Friday: 10:00 AM – 7:00 PM PKT",
  },
  socials: [
    { platform: "Instagram", url: "https://instagram.com/noshlane", handle: "@noshlane" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/noshlane", handle: "NOSHLANE" },
    { platform: "Behance", url: "https://behance.net/noshlane", handle: "noshlane" },
    { platform: "X", url: "https://x.com/noshlane", handle: "@noshlane" },
    { platform: "TikTok", url: "https://tiktok.com/@noshlane", handle: "@noshlane.pk" },
  ] as SocialLink[],
  stats: [
    {
      value: "65+",
      label: "Brands Scaled",
      description: "From Lahore heritage enterprises to international venture-backed tech startups."
    },
    {
      value: "240+",
      label: "Campaigns Executed",
      description: "Omni-channel launches across Meta, Google, TikTok, and bespoke web platforms."
    },
    {
      value: "6+",
      label: "Years of Growth",
      description: "Continuously outperforming agency benchmarks through creative rigor."
    },
    {
      value: "4.4x",
      label: "Average Paid ROAS",
      description: "Profitable paid media acquisition with transparent attribution tracking."
    }
  ] as AgencyStat[],
  testimonials: [
    {
      id: "t1",
      name: "Hamza Tariq",
      role: "Founder & CEO",
      company: "Aurora Specialty Coffee Roasters",
      location: "Lahore (Gulberg / DHA)",
      quote: "NOSHLANE didn't just run ads; they restructured our entire brand story and visual standard. Within 90 days, our direct online orders grew by over 300% and our cafe queues doubled. In Lahore's competitive F&B market, they are the secret weapon.",
      metric: "+310% Online D2C Revenue",
      service: "Branding & Social Media",
      initials: "HT"
    },
    {
      id: "t2",
      name: "Dr. Ayesha Malik",
      role: "Managing Director",
      company: "MAYA Contemporary Atelier",
      location: "Lahore & Karachi",
      quote: "Their content production team produces editorial shoots that look like Milan Fashion Week, but with deep commercial intent. Every reel, campaign shoot, and website flow drove record-shattering drop sellouts in under 48 hours.",
      metric: "12M+ Organic Views & 85% Sellout",
      service: "Content Creation & Web Dev",
      initials: "AM"
    },
    {
      id: "t3",
      name: "Usman Rafique",
      role: "VP of Growth",
      company: "Nexus Financial Technologies",
      location: "Lahore & Dubai",
      quote: "When we needed to scale our fintech customer acquisition across Pakistan, NOSHLANE delivered disciplined media buying with 38% lower CAC and continuous creative testing. They act as a real partner, not an outsourced vendor.",
      metric: "4.8x ROAS / 45k Installs",
      service: "Paid Ads & CRO",
      initials: "UR"
    }
  ] as Testimonial[],
  faqs: [
    {
      question: "Where is NOSHLANE based and do you take international clients?",
      answer: "Our flagship headquarters and creative studio are located in Gulberg II, Lahore, Pakistan. While we love working closely with Pakistani brands in Lahore, Karachi, and Islamabad, roughly 40% of our portfolio consists of international clients across the GCC, UK, and North America."
    },
    {
      question: "What makes NOSHLANE different from other Lahore agencies?",
      answer: "Most traditional agencies either do pretty design that doesn't convert, or cheap media buying that burns ad budget without brand equity. We integrate cinema-grade in-house content production with disciplined performance media buying and bespoke high-speed web development."
    },
    {
      question: "How does the Free Marketing Audit work?",
      answer: "When you submit your website or social handles via our Free Audit form, our senior strategists inspect your ad account structure, creative hook retention, checkout conversion friction, and brand positioning. You receive a personalized video teardown and PDF roadmap within 24 to 48 business hours with zero obligation."
    },
    {
      question: "What is your typical onboarding timeline?",
      answer: "Following discovery and proposal approval, initial strategic audits and asset intake conclude within 7 business days. Creative sprints and campaign activations launch by Day 10–14."
    }
  ]
};
