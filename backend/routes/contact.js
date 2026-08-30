import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";

import {
  createContactMessage,
  listContactMessages,
  deleteContactMessage,
  deleteAllContactMessages,
} from "../models/ContactMessage.js";

import requireAdmin from "../middleware/requireAdmin.js";
import { sendMail } from "../config/mailer.js";

const router = Router();

// ─────────────────────────────────────────────
// RATE LIMIT
// ─────────────────────────────────────────────

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many messages sent. Please try again later.",
  },
});

// ─────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────

const validators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required."),

  body("phone")
    .optional({ checkFalsy: true })
    .matches(/^[+\d][\d\s-]{7,15}$/)
    .withMessage("Phone number looks invalid."),

  body("projectType")
    .trim()
    .notEmpty()
    .withMessage("Project type is required."),

  body("budget")
    .trim()
    .notEmpty()
    .withMessage("Budget range is required."),

  body("timeline")
    .trim()
    .notEmpty()
    .withMessage("Timeline is required."),

  body("contactMethod")
    .trim()
    .notEmpty()
    .withMessage("Preferred contact method is required."),

  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message is too short."),
];

// ─────────────────────────────────────────────
// ADMIN — LIST CONTACT MESSAGES
// ─────────────────────────────────────────────

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const messages = await listContactMessages();

    res.json({
      messages,
    });
  } catch (err) {
    console.error("Contact messages load error:", err);
    next(err);
  }
});

// ─────────────────────────────────────────────
// ADMIN — DELETE ONE CONTACT MESSAGE
// ─────────────────────────────────────────────

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    await deleteContactMessage(req.params.id);

    res.json({
      ok: true,
      message: "Enquiry deleted.",
    });
  } catch (err) {
    console.error("Contact message delete error:", err);
    next(err);
  }
});

// ─────────────────────────────────────────────
// ADMIN — DELETE ALL CONTACT MESSAGES
// ─────────────────────────────────────────────

router.delete("/", requireAdmin, async (req, res, next) => {
  try {
    await deleteAllContactMessages();

    res.json({
      ok: true,
      message: "All enquiries deleted.",
    });
  } catch (err) {
    console.error("All contact messages delete error:", err);
    next(err);
  }
});

// ─────────────────────────────────────────────
// PUBLIC — SUBMIT CONTACT FORM
// ─────────────────────────────────────────────

router.post(
  "/",
  contactLimiter,
  validators,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      const {
        name,
        email,
        phone,
        projectType,
        budget,
        timeline,
        contactMethod,
        message,
        attachmentName,
      } = req.body;

      // Save the contact message.
      const saved = await createContactMessage({
        name,
        email,
        phone,
        projectType,
        budget,
        timeline,
        contactMethod,
        message,
        attachmentName,
      });

      // ─────────────────────────────────────────
      // EMAIL → PHRONIX
      // ─────────────────────────────────────────

      if (process.env.CONTACT_TO_EMAIL) {
        try {
          await sendMail({
            to: process.env.CONTACT_TO_EMAIL,

            subject: `New contact enquiry from ${name}`,

            text: `New contact enquiry received.

Name: ${name}
Email: ${email}
Phone: ${phone || "—"}

Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline}
Preferred Contact Method: ${contactMethod}

Message:
${message}

Attachment:
${attachmentName || "None"}

Message ID:
${saved.id}`,

            replyTo: email,
          });

          console.log("Phronix enquiry notification sent.");
        } catch (emailError) {
          console.error(
            "Phronix notification email failed:",
            emailError.message
          );
        }
      }

      // ─────────────────────────────────────────
      // EMAIL → CUSTOMER CONFIRMATION
      // ─────────────────────────────────────────

      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
          await sendMail({
            to: email,

            subject: "We received your enquiry — Phronix",

            text: `Hi ${name},

Thank you for reaching out to Phronix.

We have received your enquiry successfully. Our team will review your requirements and get back to you within one business day.

Your enquiry details:

Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline}
Preferred Contact Method: ${contactMethod}

If you need to provide any additional information, you can reply directly to this email.

Regards,
Phronix Team`,

            replyTo: process.env.CONTACT_TO_EMAIL,
          });

          console.log("Customer confirmation email sent.");
        } catch (emailError) {
          console.error(
            "Customer confirmation email failed:",
            emailError.message
          );
        }
      }

      // ─────────────────────────────────────────
      // SUCCESS
      // ─────────────────────────────────────────

      res.status(201).json({
        ok: true,
        id: saved.id,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;