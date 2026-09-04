import crypto from "crypto";
import { sendMail } from "../config/resend.js";
import { insertToken, findByHash, atomicConsume } from "../models/DownloadToken.js";

const TTL_MINUTES = Number(process.env.DOWNLOAD_TOKEN_TTL_MINUTES || 60);

function hashToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

// Generates a cryptographically secure token, stores only its hash, and
// emails the raw token as an activation link. The raw token exists only in
// memory here and in the outgoing email — it is never persisted.
export async function issueToken({ projectType, project, email, userId }) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + TTL_MINUTES * 60 * 1000).toISOString();

  await insertToken({
    projectType,
    projectId: project.id,
    userId,
    email,
    tokenHash,
    expiresAt,
  });

  const activationUrl = `${process.env.CLIENT_URL}/activate-download?type=${projectType}&token=${rawToken}`;

  const sent = await sendMail({
    to: email,
    subject: `Your download link for ${project.name}`,
    text:
      `Your download for "${project.name}" is ready.\n\n` +
      `Activate it here (valid ${TTL_MINUTES} minutes, single use):\n${activationUrl}\n\n` +
      `If another download is needed later, just request it again — this link only works once.\n\n` +
      `If you didn't request this, you can safely ignore this email.`,
  });

  if (!sent) {
    // Resend not configured (e.g. local dev) — log so the flow is still testable.
    console.log(`[downloadTokenService] Email not sent. Activation link: ${activationUrl}`);
  }

  return { sent, expiresAt };
}

// Read-only state check. Never mutates the token. Used by the activation
// page before deciding whether to render the Download button, and again as
// a pre-check before the atomic consume so we can return a specific reason
// (used vs expired vs invalid) rather than one generic rejection.
export async function validateToken(rawToken) {
  const tokenHash = hashToken(rawToken);
  const record = await findByHash(tokenHash);

  if (!record) {
    return { valid: false, status: 400, message: "Invalid download link." };
  }
  if (record.status === "used") {
    return { valid: false, status: 410, message: "This download link has already been used." };
  }
  if (record.status === "revoked") {
    return { valid: false, status: 410, message: "This download link is no longer valid." };
  }
  if (new Date(record.expires_at).getTime() <= Date.now()) {
    return { valid: false, status: 410, message: "This download link has expired. Please request a new one." };
  }
  return { valid: true, record };
}

// Atomically flips the token to 'used'. Returns ok:false if it was already
// consumed, expired, revoked, or never existed by the time this runs —
// this is what actually enforces single-use under concurrent requests.
export async function consumeToken(rawToken) {
  const tokenHash = hashToken(rawToken);
  const consumed = await atomicConsume(tokenHash);
  if (!consumed) {
    return { ok: false, status: 410, message: "This download link has already been used or has expired." };
  }
  return { ok: true, record: consumed };
}

export default { issueToken, validateToken, consumeToken };
