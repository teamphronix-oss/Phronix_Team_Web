// Public-facing metadata only. Actual files, versions the download is tied
// to, and any password requirements are enforced server-side — see
// backend/routes/downloads.js. This file never contains file paths or secrets.
export const downloadableProjects = [
  {
    id: "formfoundry",
    name: "FormFoundry",
    description: "Schema-driven form builder library, packaged as a ready-to-run demo.",
    version: "v1.4.0",
    requiresAuth: true,
  },
  {
    id: "ledgerlite",
    name: "LedgerLite",
    description: "Lightweight bookkeeping starter kit for freelancers.",
    version: "v2.0.1",
    requiresAuth: true,
  },
  {
    id: "phronix-ui-kit",
    name: "Phronix UI Kit",
    description: "Internal component library used across Phronix projects.",
    version: "v3.2.0",
    requiresAuth: true,
  },
];

export default downloadableProjects;
