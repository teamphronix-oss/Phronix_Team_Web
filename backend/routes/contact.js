import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import { createContactMessage } from "../models/ContactMessage.js";
import resend from "../config/resend.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many messages sent. Please try again later.",
  },
});

const validators = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").trim().isEmail().withMessage("A valid email is required."),
  body("phone")
    .optional({ checkFalsy: true })
    .matches(/^[+\d][\d\s-]{7,15}$/)
    .withMessage("Phone number looks invalid."),
  body("subject").trim().notEmpty().withMessage("Subject is required."),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message is too short."),
];

router.post("/", contactLimiter, validators, async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { name, email, phone, subject, message } = req.body;

    const saved = await createContactMessage({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      try {
        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Phronix Website <onboarding@resend.dev>",
          to: process.env.CONTACT_TO_EMAIL,
          reply_to: email,
          subject: `New enquiry: ${subject}`,
          text: `From: ${name} <${email}>
Phone: ${phone || "—"}

${message}`,
        });
      } catch (mailErr) {
        console.error(
          "Contact email failed to send:",
          mailErr.message
        );
      }
    }

    res.status(201).json({
      ok: true,
      id: saved.id,
    });
  } catch (err) {
    next(err);
  }
});

export default router;