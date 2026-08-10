// Utility: node scripts/hashPassword.js "myPassword"
// Prints a bcrypt hash to paste into a DownloadableProject document.
// Never store the plain password anywhere — only this hash.
import bcrypt from "bcryptjs";

const plain = process.argv[2];
if (!plain) {
  console.error("Usage: node scripts/hashPassword.js <password>");
  process.exit(1);
}

bcrypt.hash(plain, 12).then((hash) => {
  console.log(hash);
});
