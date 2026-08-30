import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import {
  createContactMessage,
  listContactMessages,
} from "../models/ContactMessage.js";

import requireAdmin from "../middleware/requireAdmin.js";
import { sendMail } from "../config/resend.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many messages sent. Please try again later.",
  },
});

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

router.post("/", contactLimiter, validators, async (req, res, next) => {
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
 if (
  process.env.RESEND_API_KEY &&
  process.env.CONTACT_TO_EMAIL
) {
  await sendMail({
    to: process.env.CONTACT_TO_EMAIL,
    subject: `New contact enquiry from ${name}`,
    text: `Name: ${name}
Email: ${email}
Phone: ${phone || "—"}
Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline}
Preferred Contact Method: ${contactMethod}

Message:
${message}

Attachment: ${attachmentName || "None"}`,
    replyTo: email,
  });
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