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

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

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

router.post(
  "/forgot-password",
  loginLimiter,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const admin = email
        ? await findAdminByEmail(email.toLowerCase().trim())
        : null;

      if (admin) {
        const rawToken = crypto
          .randomBytes(32)
          .toString("hex");

        const tokenHash = crypto
          .createHash("sha256")
          .update(rawToken)
          .digest("hex");

        const expiresAt = new Date(
          Date.now() + 30 * 60 * 1000
        ).toISOString();

        await setResetToken(
          admin.id,
          tokenHash,
          expiresAt
        );

        const resetUrl =
          `${process.env.CLIENT_URL}/admin/reset-password/${rawToken}`;

        if (
          process.env.RESEND_API_KEY &&
          process.env.CONTACT_TO_EMAIL
        ) {
          await sendMail({
            to: admin.email,
            subject: "Reset your Phronix admin password",
            text:
              `Reset your password using this link ` +
              `(valid 30 minutes): ${resetUrl}`,
          });
        } else {
          console.log(
            "Password reset link:",
            resetUrl
          );
        }
      }

      res.json({
        message:
          "If that email is registered, a reset link has been sent.",
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/reset-password/:token",
  async (req, res, next) => {
    try {
      const { password } = req.body;

      if (!password || password.length < 8) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters.",
        });
      }

      const tokenHash = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const admin =
        await findAdminByValidResetToken(tokenHash);

      if (!admin) {
        return res.status(400).json({
          message:
            "This reset link is invalid or has expired.",
        });
      }

      const passwordHash = await bcrypt.hash(
        password,
        12
      );

      await updatePassword(
        admin.id,
        passwordHash
      );

      res.json({
        message:
          "Password updated. You can now sign in.",
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;