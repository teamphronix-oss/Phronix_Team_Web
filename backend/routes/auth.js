import { Router } from "express";
import passport from "../config/passport.js";
import { toClientUser } from "../models/User.js";

const router = Router();

// Kicks off Google's OAuth consent screen.
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirects here after consent.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/downloads`);
  }
);

// Returns the current session user, or 401 if not signed in.
router.get("/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }
  res.json({ user: toClientUser(req.user) });
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    req.session = null;
    res.json({ ok: true });
  });
});

export default router;