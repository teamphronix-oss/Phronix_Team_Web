// Utility: node scripts/seedDownloads.js
// Populates DownloadableProject documents matching frontend/src/data/downloads.js.
// Run `node scripts/hashPassword.js <password>` first if a project needs one,
// and paste the resulting hash below instead of a plain password.
import "dotenv/config";
import mongoose from "mongoose";
import DownloadableProject from "../models/DownloadableProject.js";

const seedData = [
  { slug: "formfoundry", name: "FormFoundry", version: "v1.4.0", filename: "formfoundry-v1.4.0.zip", passwordHash: null },
  { slug: "ledgerlite", name: "LedgerLite", version: "v2.0.1", filename: "ledgerlite-v2.0.1.zip", passwordHash: null },
  { slug: "phronix-ui-kit", name: "Phronix UI Kit", version: "v3.2.0", filename: "phronix-ui-kit-v3.2.0.zip", passwordHash: null },
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  for (const item of seedData) {
    await DownloadableProject.findOneAndUpdate({ slug: item.slug }, item, { upsert: true });
  }
  console.log("Seeded downloadable projects.");
  await mongoose.disconnect();
}

run();
