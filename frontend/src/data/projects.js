// Completed projects — shown on the Projects page and featured on Home.
export const projectCategories = [
  "All",
  "Web App",
  "Mobile App",
  "E-Commerce",
  "Dashboard",
  "Open Source",
];

export const projects = [
  {
    id: "orbitpay",
    name: "OrbitPay",
    category: "E-Commerce",
    image: "/assets/placeholder-project.svg",
    description:
      "A multi-vendor checkout platform with real-time inventory sync and split-payment support.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/phronix/orbitpay",
    demoUrl: "https://youtube.com/watch?v=example1",
  },
  {
    id: "pulseboard",
    name: "Pulseboard",
    category: "Dashboard",
    image: "/assets/placeholder-project.svg",
    description:
      "A real-time analytics dashboard for SaaS teams, with customizable widgets and alerting.",
    technologies: ["React", "D3.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/phronix/pulseboard",
    demoUrl: "",
  },
  {
    id: "wanderly",
    name: "Wanderly",
    category: "Mobile App",
    image: "/assets/placeholder-project.svg",
    description:
      "A cross-platform trip-planning app with offline maps and collaborative itineraries.",
    technologies: ["React Native", "Firebase", "Mapbox"],
    githubUrl: "",
    demoUrl: "https://youtube.com/watch?v=example2",
  },
  {
    id: "ledgerlite",
    name: "LedgerLite",
    category: "Web App",
    image: "/assets/placeholder-project.svg",
    description:
      "A lightweight bookkeeping tool for freelancers, built as an open-source side project.",
    technologies: ["Vue.js", "Node.js", "SQLite"],
    githubUrl: "https://github.com/phronix/ledgerlite",
    demoUrl: "",
  },
  {
    id: "formfoundry",
    name: "FormFoundry",
    category: "Open Source",
    image: "/assets/placeholder-project.svg",
    description:
      "A schema-driven form builder library published as an open-source npm package.",
    technologies: ["TypeScript", "React"],
    githubUrl: "https://github.com/phronix/formfoundry",
    demoUrl: "",
  },
];

export default projects;
