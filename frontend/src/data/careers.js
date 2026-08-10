// ─────────────────────────────────────────────────────────────
// Open roles shown on the Careers page.
// Add, remove, or edit entries here — nothing else needs to change.
// Set `open: false` to keep a role listed but marked as closed.
// ─────────────────────────────────────────────────────────────

export const careers = [
  {
    id: 1,
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Nashik / Remote",
    type: "Full-time",
    experience: "2–4 years",
    description:
      "Build fast, accessible interfaces in React for client and product work — from early prototypes to production dashboards.",
    responsibilities: [
      "Ship UI features end-to-end in React and collaborate closely with design",
      "Keep performance, accessibility, and responsiveness front of mind",
      "Review PRs and help raise the frontend bar across projects",
    ],
    requirements: [
      "Strong hands-on experience with React and modern JavaScript",
      "Comfort with CSS layout systems and component-driven design",
      "Bonus: exposure to React Native or design tooling like Figma",
    ],
    open: true,
  },
  {
    id: 2,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Nashik / Remote",
    type: "Full-time",
    experience: "2–5 years",
    description:
      "Design and maintain the APIs and infrastructure behind our client platforms — reliable, well-documented, and built to scale.",
    responsibilities: [
      "Design REST APIs and data models for new features",
      "Own deployment, monitoring, and performance of backend services",
      "Work with the team to translate product requirements into systems",
    ],
    requirements: [
      "Solid experience with Node.js and MongoDB or a similar stack",
      "Understanding of authentication, security, and API design basics",
      "Bonus: experience with AWS or another cloud provider",
    ],
    open: true,
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Nashik / Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Take products from rough idea to polished interface, working directly with engineers and clients throughout.",
    responsibilities: [
      "Lead design for client and internal projects, from wireframes to final UI",
      "Maintain and grow our design system and component library",
      "Present and defend design decisions directly to clients",
    ],
    requirements: [
      "A portfolio showing shipped product work, not just concepts",
      "Fluency in Figma and an eye for typography and layout",
      "Comfort working directly with engineers during implementation",
    ],
    open: true,
  },
  {
    id: 4,
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "Nashik",
    type: "Internship",
    experience: "Students / recent grads",
    description:
      "A hands-on internship for people who want real production experience — you'll ship features, not just shadow.",
    responsibilities: [
      "Pair with senior engineers on live client and product features",
      "Write tests and documentation alongside your code",
      "Take a small feature from spec to deployment during the internship",
    ],
    requirements: [
      "Working knowledge of JavaScript and one modern framework",
      "Genuine curiosity and a habit of shipping side projects",
      "Available for a minimum 3-month commitment",
    ],
    open: true,
  },
];

export default careers;