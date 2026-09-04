// ─────────────────────────────────────────────────────────────
// Central, editable configuration for all Phronix contact points.
// Update these values — nothing else in the codebase needs to change.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  companyName: "Phronix",
  tagline: "Engineering Thought Into Software",
  shortDescription:
    "Phronix is a technology and growth studio that designs, builds, and ships digital products — then markets and sells them. From early prototypes to production-grade platforms, and from SEO to paid campaigns, one team carries the work end to end.",

  email: "hello@phronix.io",
  supportEmail: "support@phronix.io",
  careersEmail: "careers@phronix.io",
  phone: "+91 90000 00000",
  whatsappNumber: "919272471332", // international format, no + or spaces
  whatsappDefaultMessage:
    "Hello Phronix, I would like to know more about your services.",

  address: {
    line1: "4th Floor, Prism Business Park",
    line2: "College Road, Nashik, Maharashtra 422005",
    country: "India",
  },

  gstNumber: "27ABCDE1234F1Z5",

  social: {
    instagram: "https://instagram.com/phronix.tech",
    github: "https://github.com/phronix",
    youtube: "https://youtube.com/@phronix",
    linkedin: "https://linkedin.com/company/phronix",
    twitter: "https://twitter.com/phronixhq",
  },

  apiBaseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  socialLinks: {
  instagram: "https://www.instagram.com/phronix.ai?igsh=MXdpa2w0aG96enV3eA==",
  github: "https://github.com/teamphronix-oss",
  youtube: "https://www.youtube.com/@Phronixx",
   linkedin: "https://www.linkedin.com/in/phronix-team-315156426",
},
};



export default siteConfig;
