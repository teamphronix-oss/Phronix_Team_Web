import { Router } from "express";
import { google } from "googleapis";

const router = Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Step 1: Open this URL in your browser
router.get("/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
    ],
  });

  res.redirect(authUrl);
});

// Step 2: Google redirects here after authorization
router.get("/oauth2callback", async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Missing authorization code.");
    }

    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n==============================");
    console.log("GOOGLE OAUTH TOKENS");
    console.log("==============================");
    console.log("Refresh token:");
    console.log(tokens.refresh_token);
    console.log("==============================\n");

    res.send(`
      <h1>Google Calendar Connected Successfully ✅</h1>
      <p>Check your backend terminal for the refresh token.</p>
      <p>You can close this window.</p>
    `);
  } catch (err) {
    console.error("Google OAuth error:", err);
    next(err);
  }
});

export default router;