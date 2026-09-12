import { Router } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { sendMail } from "../config/resend.js";

import {
  findAdminByUsername,
  findAdminByEmail,
  findAdminByValidResetToken,
  setResetToken,
  updatePassword,
} from "../models/Admin.js";


import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});


const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESET_TOKEN_TTL = "10m";

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const admin = await findAdminByUsername(username.trim());

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const matches = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!matches) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("phronix.admin", token, COOKIE_OPTS);

    res.json({
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({
    admin: {
      id: req.admin.id,
      username: req.admin.username,
    },
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("phronix.admin", COOKIE_OPTS);

  res.json({
    ok: true,
  });
});

// ─────────────────────────────────────────────
// STEP 1 — Request an OTP
// ─────────────────────────────────────────────

router.post(
  "/forgot-password",
  otpLimiter,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const admin = email
        ? await findAdminByEmail(email.toLowerCase().trim())
        : null;

      if (admin) {
        // 6-digit numeric OTP — crypto.randomInt is a CSPRNG, not Math.random.
        const otp = crypto.randomInt(100000, 1000000).toString();

        const tokenHash = crypto
          .createHash("sha256")
          .update(otp)
          .digest("hex");

        const expiresAt = new Date(
          Date.now() + OTP_TTL_MS
        ).toISOString();

        // Reuses the exact same storage the old link-based flow used —
        // it's just a generic "hash + expiry" pair, agnostic to whether
        // the plaintext behind the hash is a link token or an OTP.
        await setResetToken(admin.id, tokenHash, expiresAt);

        if (
          process.env.RESEND_API_KEY &&
          process.env.CONTACT_TO_EMAIL
        ) {
          await sendMail({
            to: admin.email,
            subject: "Your Phronix admin password reset code",
            text:
              `Your one-time code is: ${otp}\n\n` +
              `This code expires in 10 minutes. If you didn't request this, you can ignore this email.`,
          });
        } else {
          console.log("Password reset OTP:", otp);
        }
      }

      res.json({
        message:
          "If that email is registered, a verification code has been sent.",
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────
// STEP 2 — Verify the OTP
// ─────────────────────────────────────────────

router.post("/verify-otp", otpLimiter, async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and code are required." });
    }

    const admin = await findAdminByEmail(email.toLowerCase().trim());

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired code." });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(String(otp).trim())
      .digest("hex");

    const matched = await findAdminByValidResetToken(tokenHash);

    // Extra check: the OTP must belong to THIS admin, not just be valid
    // for *some* admin account (matters once there's more than one admin).
    if (!matched || matched.id !== admin.id) {
      return res.status(400).json({ message: "Invalid or expired code." });
    }

    // Short-lived, purpose-scoped token — proves "this OTP was verified"
    // without the frontend ever being trusted to decide that on its own.
    const resetToken = jwt.sign(
      { adminId: admin.id, purpose: "password-reset" },
      process.env.JWT_SECRET,
      { expiresIn: RESET_TOKEN_TTL }
    );

    res.json({ resetToken });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// STEP 3 — Reset the password
// ─────────────────────────────────────────────

router.post("/reset-password", async (req, res, next) => {
  try {
    const { resetToken, password, confirmPassword } = req.body;

    if (!resetToken) {
      return res.status(400).json({ message: "Missing or expired reset session. Please start over." });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    let payload;
    try {
      payload = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ message: "This reset session has expired. Please start over." });
    }

    if (payload.purpose !== "password-reset") {
      return res.status(400).json({ message: "Invalid reset session." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await updatePassword(payload.adminId, passwordHash);

    // Clear the OTP hash so it can't be verified again after the password
    // has already been changed.
    await setResetToken(payload.adminId, null, null);

    res.json({
      message: "Password updated. You can now sign in.",
    });
  } catch (err) {
    next(err);
  }
});

export default router;