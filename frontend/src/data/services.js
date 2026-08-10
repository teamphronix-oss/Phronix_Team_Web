// Add, remove, or edit services here — the Services page renders this list directly.
export const services = [
  {
    id: "web-development",
    name: "Web Development",
    icon: "Globe",
    shortDescription:
      "Fast, accessible, production-ready web applications built on modern frameworks.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    id: "mobile-apps",
    name: "Mobile App Development",
    icon: "Smartphone",
    shortDescription:
      "Native-feel iOS and Android apps from a single React Native codebase.",
    technologies: ["React Native", "Expo", "Firebase"],
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: "Cloud",
    shortDescription:
      "CI/CD pipelines, containerized deployments, and infrastructure that scales with you.",
    technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    icon: "PenTool",
    shortDescription:
      "Interface design grounded in research, tested with real users, refined until it's obvious.",
    technologies: ["Figma", "Design Systems"],
  },
  {
    id: "backend-apis",
    name: "Backend & API Engineering",
    icon: "Server",
    shortDescription:
      "Secure, well-documented APIs and data layers built to handle real production load.",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    id: "ai-integration",
    name: "AI & Automation",
    icon: "Sparkles",
    shortDescription:
      "Practical AI features — from support copilots to internal workflow automation.",
    technologies: ["OpenAI API", "Claude API", "Python"],
  },
];

export default services;
