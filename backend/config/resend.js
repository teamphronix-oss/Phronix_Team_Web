import { Resend } from "resend";

// Only construct the client when a key is actually present — the Resend
// SDK throws immediately in its constructor otherwise, which would crash
// the whole server on boot just because emails aren't configured yet.
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

if (!resend) {
  console.warn("[resend] RESEND_API_KEY is missing — emails will not be sent.");
}

// Small wrapper so callers don't repeat the "skip if not configured, log
// failures without throwing" logic in every route. Returns true/false for
// whether the send actually happened.
export async function sendMail({ to, subject, text, replyTo }) {
  if (!resend) return false;
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("Resend send failed:", error.message || error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send failed:", err.message);
    return false;
  }
}

export default { resend, sendMail };
