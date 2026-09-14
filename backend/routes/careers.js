import multer from "multer";
import rateLimit from "express-rate-limit";
import { makeContentRouter } from "./_makeContentRouter.js";
import { sendMail } from "../config/resend.js";
import Career from "../models/Career.js";

const model = {
  list: Career.listCareers,
  getById: Career.getCareerById,
  create: Career.createCareer,
  update: Career.updateCareer,
  remove: Career.deleteCareer,
};

// Admin panel's checkbox field is named "open", but the careers table's
// column is "is_open"; similarly the "Type" field maps to "employment_type".
// Remap here so the shared factory never needs to know about this one
// form's field names.
function transformCareerBody(row) {
  const mapped = { ...row };

  // Admin form uses "open", database uses "is_open"
  if (mapped.open !== undefined) {
    mapped.is_open =
      mapped.open === true ||
      mapped.open === "true" ||
      mapped.open === "on" ||
      mapped.open === 1 ||
      mapped.open === "1";
  } else if (mapped.is_open !== undefined) {
    mapped.is_open =
      mapped.is_open === true ||
      mapped.is_open === "true" ||
      mapped.is_open === "on" ||
      mapped.is_open === 1 ||
      mapped.is_open === "1";
  } else {
    mapped.is_open = true;
  }

  delete mapped.open;

  // Admin form uses "type", database uses "employment_type"
  if (mapped.type !== undefined) {
    mapped.employment_type = mapped.type;
    delete mapped.type;
  }

  // Generate slug automatically from title
  if (mapped.title) {
    mapped.slug = mapped.title
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return mapped;
}
// Careers has no image and uses is_open instead of is_published, so it
// doesn't fit the generic hasPublish filter — the public site should just
// see everything and filter on is_open itself if it wants to.
const router = makeContentRouter({
  model,
  responseKey: "careers",
  singleKey: "career",
  arrayFields: ["responsibilities", "requirements", "skills"],
  imageFields: [],
  hasPublish: false,
  transformBody: transformCareerBody,
});

// ─────────────────────────────────────────────
// JOB APPLICATION — resume email, no public storage
// ─────────────────────────────────────────────
// The resume never touches disk or Cloudinary — it's read into memory and
// attached directly to the notification email, then discarded when the
// request ends. Keeps applicant files private by default.

const applyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Use a PDF or Word file."));
    }
    cb(null, true);
  },
});

function handleResumeUpload(req, res, next) {
  resumeUpload.single("resume")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "Could not process the resume file." });
    }
    next();
  });
}

router.post("/apply", applyLimiter, handleResumeUpload, async (req, res, next) => {
  try {
    const { position, name, email, phone, note } = req.body;

    if (!position || !name || !email || !phone) {
      return res.status(400).json({ message: "Position, name, email, and phone are required." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "A resume file is required." });
    }

    const adminEmail = process.env.CONTACT_TO_EMAIL || "teamphronix@gmail.com";

    const notifySent = await sendMail({
      to: adminEmail,
      from: "Phronix Careers <downloads@phronix.in>",
      subject: `New application: ${position} — ${name}`,
      text: `New job application received.

Position: ${position}
Name: ${name}
Email: ${email}
Phone: ${phone}

Note:
${note || "—"}

Resume attached.`,
      replyTo: email,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer.toString("base64"),
        },
      ],
    });

    if (!notifySent) {
      console.log(`[careers/apply] Notification email not sent for ${email}.`);
    }

    const confirmSent = await sendMail({
      to: email,
      from: "Phronix Team <downloads@phronix.in>",
      subject: `We received your application — ${position}`,
      text: `Hi ${name},

Thanks for applying for the ${position} role at Phronix.

We've received your application and resume. Our team will review it and reach out if it's a fit.

Regards,
Phronix Team`,
      replyTo: adminEmail,
    });

    if (!confirmSent) {
      console.log(`[careers/apply] Confirmation email not sent to ${email}.`);
    }

    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;