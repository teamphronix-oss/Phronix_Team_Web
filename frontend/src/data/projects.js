import sweeterJoy from "../assets/projects/sweeter-joy.png";
import sweeterJoy1 from "../assets/projects/sweeter-joy1.png";
import sweeterJoy2 from "../assets/projects/sweeter-joy2.png";
import sweeterJoy3 from "../assets/projects/sweeter-joy3.png";
import sweeterJoy4 from "../assets/projects/sweeter-joy4.png";
import sweeterJoy5 from "../assets/projects/sweeter-joy5.png";
import sweeterJoy6 from "../assets/projects/sweeter-joy6.png";
import sweeterJoy7 from "../assets/projects/sweeter-joy7.png";
import sweeterJoy8 from "../assets/projects/sweeter-joy8.png";
import sweeterJoy9 from "../assets/projects/sweeter-joy9.png";
import sweeterJoy10 from "../assets/projects/sweeter-joy10.png";

// Completed projects — shown on the Projects page and featured on Home.
export const projectCategories = [
  "All",
  "Web App",
  "Mobile App",
  "E-Commerce",
  "Dashboard",
  "AI & Automation",
  "Marketing & Growth",
  "Open Source",
];

export const projects = [
  {
    id: "sweeterjoy",
    name: "Sweeter Joy",
    category: "E-Commerce",
    image: sweeterJoy,
    description:
      "Artisan confectionery e-commerce platform with automated 1-tap checkout, inventory sync, and order tracking.",
    technologies: ["React", "Next.js", "Stripe", "Tailwind"],
    githubUrl: "https://github.com/phronix/sweeterjoy",
    demoUrl: "https://sweeterjoy.com",
    features: [
      "Sub-second page load speeds via Edge CDN",
      "Stripe payment gateway with 1-tap Apple Pay / Google Pay",
      "Live order dispatch and customer tracking via SMS & WhatsApp",
      "Admin dashboard with automated revenue telemetry"
    ],
    pillarDetails: {
      build: "Sub-second Next.js storefront deployed on Edge infrastructure with Stripe custom checkout and SMS webhook dispatch.",
      campaign: "Paid search and retargeting ads scaled post-launch, delivering a 4.6x return on ad spend during the holiday season.",
    }
  },
  {
    id: "orbitpay",
    name: "OrbitPay",
    category: "E-Commerce",
    image: sweeterJoy3,
    description:
      "A multi-vendor checkout platform with real-time inventory sync, split-payments, and automated merchant payouts.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/phronix/orbitpay",
    demoUrl: "https://orbitpay.demo",
    features: [
      "Automated split-payment settlement engine",
      "Instant merchant invoice generator",
      "Zero-downtime microservice architecture"
    ]
  },
  {
    id: "pulseboard",
    name: "Pulseboard",
    category: "Dashboard",
    image: sweeterJoy5,
    description:
      "A real-time analytics dashboard for SaaS teams, with customizable telemetry widgets and anomaly alerting.",
    technologies: ["Next.js", "PostgreSQL", "D3.js", "Express"],
    githubUrl: "https://github.com/phronix/pulseboard",
    demoUrl: "https://pulseboard.demo",
    features: [
      "Sub-50ms data ingestion pipeline",
      "Interactive SVG cohort sparklines & churn predictor",
      "Role-based access control (RBAC) & OAuth2"
    ]
  },
  {
    id: "wanderly",
    name: "Wanderly",
    category: "Mobile App",
    image: sweeterJoy2,
    description:
      "A cross-platform travel planning and booking app with offline vector maps and collaborative group itineraries.",
    technologies: ["React Native", "Firebase", "Mapbox", "Expo"],
    githubUrl: "https://github.com/phronix/wanderly",
    demoUrl: "https://wanderly.demo",
    features: [
      "Offline trip sync & localized geo-caching",
      "Real-time multi-user itinerary editing",
      "Push notification reminders for departures & flights"
    ]
  },
  {
    id: "agentcore",
    name: "AgentCore AI",
    category: "AI & Automation",
    image: sweeterJoy4,
    description:
      "Autonomous enterprise agent orchestration platform for multi-step task execution, voice copilots, and CRM sync.",
    technologies: ["Python", "FastAPI", "LangChain", "OpenAI"],
    githubUrl: "https://github.com/phronix/agentcore",
    demoUrl: "https://agentcore.demo",
    features: [
      "Autonomous tool-calling and semantic database mutations",
      "Sub-40ms streaming voice synthesis",
      "Automated document and receipt OCR parsing"
    ],
    pillarDetails: {
      build: "Python/FastAPI microservices orchestrating streaming LangChain agents with sub-40ms latency.",
      ai: "Fine-tuned tool-calling model connected to vector memory, autonomously resolving multi-step support and database operations.",
    }
  },
  {
    id: "ledgerlite",
    name: "LedgerLite",
    category: "Web App",
    image: sweeterJoy7,
    description:
      "A fast, minimalist bookkeeping and expense tracking tool built for high-growth freelance teams and agencies.",
    technologies: ["React", "TypeScript", "Node.js", "SQLite"],
    githubUrl: "https://github.com/phronix/ledgerlite",
    demoUrl: "https://ledgerlite.demo",
    features: [
      "Instant tax computation & invoice generation",
      "Multi-currency support with live exchange feeds",
      "Client portal with secure view-only link sharing"
    ]
  },
  {
    id: "artisan-studio",
    name: "Artisan Studio",
    category: "Web App",
    image: sweeterJoy1,
    description:
      "High-end visual portfolio and client intake platform for luxury creative studios and architects.",
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/phronix/artisan-studio",
    demoUrl: "https://artisan.demo",
    features: [
      "Ultra-fluid 60fps micro-animations",
      "Instant client intake & calendar scheduling integration",
      "Global asset caching on AWS CloudFront"
    ]
  },
  {
    id: "fitpulse",
    name: "FitPulse Pro",
    category: "Mobile App",
    image: sweeterJoy6,
    description:
      "Native mobile companion for health tracking, personalized workout routines, and real-time biometric metrics.",
    technologies: ["React Native", "Expo", "GraphQL", "Node.js"],
    githubUrl: "https://github.com/phronix/fitpulse",
    demoUrl: "https://fitpulse.demo",
    features: [
      "Apple Health & Google Fit biometric integration",
      "AI workout planner adapted to user progression",
      "Offline audio-guided coaching routines"
    ]
  },
  {
    id: "apex-analytics",
    name: "Apex Telemetry",
    category: "Dashboard",
    image: sweeterJoy8,
    description:
      "High-frequency server health and conversion telemetry dashboard built for distributed cloud clusters.",
    technologies: ["React", "Go", "Docker", "TimescaleDB"],
    githubUrl: "https://github.com/phronix/apex-telemetry",
    demoUrl: "https://apex.demo",
    features: [
      "Real-time WebSocket streaming telemetry",
      "Automated incident alerts to Slack & PagerDuty",
      "Zero-overhead monitoring agent"
    ]
  },
  {
    id: "formfoundry",
    name: "FormFoundry",
    category: "Open Source",
    image: sweeterJoy9,
    description:
      "A schema-driven form builder and validation library published as an open-source npm package.",
    technologies: ["TypeScript", "React", "Rollup"],
    githubUrl: "https://github.com/phronix/formfoundry",
    demoUrl: "https://formfoundry.demo",
    features: [
      "Zero external dependencies, <4kB bundle size",
      "Full TypeScript type safety with Zod integration",
      "Accessible WCAG 2.1 AA compliant UI elements"
    ]
  },
  {
    id: "greenroot-growth",
    name: "Greenroot Growth Engine",
    category: "Marketing & Growth",
    image: sweeterJoy8,
    description:
      "SEO overhaul and performance marketing engine for a sustainable D2C brand, driving organic traffic and repeatable ad revenue.",
    technologies: ["Technical SEO", "Google Ads", "Meta Ads", "GA4"],
    githubUrl: "https://github.com/phronix/greenroot-growth",
    demoUrl: "https://greenrootfoods.demo",
    features: [
      "3.4x organic search traffic growth in 90 days via schema optimization",
      "4.8x average ROAS across search and Meta acquisition campaigns",
      "Custom server-side conversion tracking for zero data loss"
    ],
    pillarDetails: {
      build: "High-performance headless landing pages built for 100/100 Core Web Vitals.",
      campaign: "Full-funnel paid campaigns structured around first-party conversion signals, sustaining 4.8x ROAS across scaling spend.",
    }
  },
  {
    id: "northline-rebrand",
    name: "Northline Studio Launch",
    category: "Marketing & Growth",
    image: sweeterJoy9,
    description:
      "Brand repositioning and launch campaign for a creative studio, spanning identity, messaging, content, and a coordinated social rollout.",
    technologies: ["Brand Strategy", "Content Calendar", "Social Campaigns"],
    githubUrl: "https://github.com/phronix/northline-rebrand",
    demoUrl: "https://northlinestudio.demo",
    features: [
      "New positioning and identity rolled out across site, deck, and socials",
      "Launch campaign drove a 2.8x increase in qualified inbound leads",
      "Social following grew 40% in the first quarter post-launch"
    ],
    pillarDetails: {
      build: "New marketing site built to carry the rebrand consistently across every page and breakpoint.",
      campaign: "Coordinated launch campaign across paid social and email drove a 2.8x increase in qualified inbound leads.",
    }
  },
  {
    id: "chocolatier-deluxe",
    name: "Chocolatier Deluxe",
    category: "E-Commerce",
    image: sweeterJoy10,
    description:
      "Custom luxury e-commerce experience with gift box customizers and recurring subscription boxes.",
    technologies: ["React", "Next.js", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com/phronix/chocolatier",
    demoUrl: "https://chocolatier.demo",
    features: [
      "Interactive 3D gift box builder",
      "Automated recurring monthly subscription billing",
      "Customized gift note generator & printable QR codes"
    ]
  }
];

export default projects;
