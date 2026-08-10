// Status must be one of: "Planning" | "In Development" | "Testing" | "Near Completion"
export const ongoingProjects = [
  {
    id: "voltframe",
    name: "VoltFrame",
    image: "/assets/placeholder-project.svg",
    description:
      "An internal tooling platform for EV fleet monitoring, built for a logistics client.",
    status: "In Development",
    technologies: ["React", "Node.js", "MongoDB"],
    startDate: "2026-03-01",
    expectedCompletion: "2026-09-30",
  },
  {
    id: "nimbusdocs",
    name: "NimbusDocs",
    image: "/assets/placeholder-project.svg",
    description:
      "A collaborative documentation editor with real-time sync, in private beta.",
    status: "Testing",
    technologies: ["React", "WebSockets", "PostgreSQL"],
    startDate: "2026-01-15",
    expectedCompletion: "2026-08-15",
  },
  {
    id: "atlasforms",
    name: "AtlasForms",
    image: "/assets/placeholder-project.svg",
    description:
      "A no-code form and survey builder aimed at small business owners.",
    status: "Near Completion",
    technologies: ["Next.js", "Node.js"],
    startDate: "2025-11-01",
    expectedCompletion: "2026-08-10",
  },
  {
    id: "compassai",
    name: "CompassAI",
    image: "/assets/placeholder-project.svg",
    description:
      "An early-stage AI research assistant for internal knowledge bases.",
    status: "Planning",
    technologies: ["Python", "React"],
    startDate: "",
    expectedCompletion: "",
  },
];

export default ongoingProjects;
