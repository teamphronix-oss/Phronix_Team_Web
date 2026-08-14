// Usage: node scripts/seedAdmin.js <username> <email> <password>
// Creates (or updates) the admin account in Supabase. Run this once after
// setting up your .env — that account is what you'll use to sign in at
// /admin/login on the site.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { upsertAdmin } from "../models/Admin.js";

const [username, email, password] = process.argv.slice(2);
if (!username || !email || !password) {
  console.error("Usage: node scripts/seedAdmin.js <username> <email> <password>");
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

async function run() {
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await upsertAdmin({ username, email, passwordHash });
  console.log(`Admin ready: ${admin.username} (${admin.email})`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});