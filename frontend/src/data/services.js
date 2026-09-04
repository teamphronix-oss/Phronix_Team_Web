// Add, remove, or edit services here — the Services page renders this list directly.
// pillar: "build" | "grow" | "automate" — used to group/filter services across the site.
export const services = [
  {
    id: "web-development",
    name: "Web Development",
    icon: "Globe",
    pillar: "build",
    shortDescription:
      "Fast, accessible, production-ready web applications built on modern frameworks.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "mobile-apps",
    name: "Mobile App Development",
    icon: "Smartphone",
    pillar: "build",
    shortDescription:
      "Native-feel iOS and Android apps from a single React Native codebase.",
    technologies: ["React Native", "Expo", "Firebase"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: "Cloud",
    pillar: "build",
    shortDescription:
      "CI/CD pipelines, containerized deployments, and infrastructure that scales with you.",
    technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    icon: "PenTool",
    pillar: "build",
    shortDescription:
      "Interface design grounded in research, tested with real users, refined until it's obvious.",
    technologies: ["Figma", "Design Systems"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "backend-apis",
    name: "Backend & API Engineering",
    icon: "Server",
    pillar: "build",
    shortDescription:
      "Secure, well-documented APIs and data layers built to handle real production load.",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "digital-marketing-seo",
    name: "Digital Marketing & SEO",
    icon: "Search",
    pillar: "grow",
    shortDescription:
      "Technical SEO, on-page optimization, and organic growth strategy built to compound over time.",
    technologies: ["Search Console", "GA4", "Ahrefs", "Schema Markup"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "paid-performance-marketing",
    name: "Paid Ads & Performance Marketing",
    icon: "Target",
    pillar: "grow",
    shortDescription:
      "Full-funnel acquisition campaigns across search and social, built and managed around measurable ROAS.",
    technologies: ["Google Ads", "Meta Ads", "Pixel/Conversion Tracking"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "brand-content-social",
    name: "Brand, Content & Social",
    icon: "Megaphone",
    pillar: "grow",
    shortDescription:
      "Positioning, messaging, and a content and social system that keeps a brand consistent everywhere it shows up.",
    technologies: ["Brand Systems", "Content Calendars", "Social Strategy"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "ai-chatbots",
    name: "AI Chatbots & Support Copilots",
    icon: "Bot",
    pillar: "automate",
    shortDescription:
      "Custom-trained chat and voice bots that handle support, sales, and FAQs — live on your site or app.",
    technologies: ["OpenAI API", "Claude API", "Vector Search"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "ai-integration-existing",
    name: "AI Integration for Existing Software",
    icon: "Cpu",
    pillar: "automate",
    shortDescription:
      "We retrofit AI into software you already have — no rebuild required. Search, summarization, automation, copilots.",
    technologies: ["RAG Pipelines", "LangChain", "Legacy API Integration"],
    priceRange: "₹5,999 – ₹9,999",
  },
  {
    id: "workflow-automation",
    name: "Workflow & Process Automation",
    icon: "Workflow",
    pillar: "automate",
    shortDescription:
      "Internal tools and automations that cut manual busywork — from data entry to multi-step approvals.",
    technologies: ["Python", "Zapier/Make", "Internal APIs"],
    priceRange: "₹5,999 – ₹9,999",
  },
];

export default services;
