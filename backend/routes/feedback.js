import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import requireAdmin from "../middleware/requireAdmin.js";
import { createFeedback, listFeedback, updateFeedback, deleteFeedback } from "../models/Feedback.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many submissions. Please try again later." },
});

const validators = [
  body("message").trim().isLength({ min: 5 }).withMessage("Feedback message is too short."),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("A valid email is required."),
  body("rating").optional({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage("Rating must be 1-5."),
];

// Public — anyone on the site can leave feedback, no sign-in required.
router.post("/", submitLimiter, validators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    const { name, email, rating, message } = req.body;
    const saved = await createFeedback({ name, email, rating, message });
    res.status(201).json({ ok: true, id: saved.id });
  } catch (err) {
    next(err);
  }
});

// Everything below is admin-only — feedback is never shown publicly.
router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const items = await listFeedback({ status: req.query.status });
    res.json({ feedback: items });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await updateFeedback(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: "Feedback not found." });
    res.json({ feedback: item });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await deleteFeedback(req.params.id);
    if (!item) return res.status(404).json({ message: "Feedback not found." });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
