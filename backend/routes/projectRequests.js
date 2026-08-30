import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";

import {
  createProjectRequest,
  listProjectRequests,
  updateProjectRequest,
  deleteProjectRequest,
  deleteAllProjectRequests,
} from "../models/ProjectRequest.js";

import requireAdmin from "../middleware/requireAdmin.js";
import {
  createDiscoveryCall,
  rescheduleDiscoveryCall,
} from "../config/googleCalendar.js";
import { sendProjectConfirmation } from "../config/mailer.js";

const router = Router();

const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many project requests. Please try again later.",
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

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required."),

  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company or venture name is required."),

  body("projectType")
    .trim()
    .notEmpty()
    .withMessage("Project type is required."),

  body("ventureStage")
    .trim()
    .notEmpty()
    .withMessage("Venture stage is required."),

  body("selectedDate")
    .trim()
    .notEmpty()
    .withMessage("Date is required."),

  body("selectedTime")
    .trim()
    .notEmpty()
    .withMessage("Time is required."),
];
router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const requests = await listProjectRequests();

    res.json({
      requests,
    });
  } catch (err) {
    next(err);
  }
});
router.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      status,
      selectedDate,
      selectedTime,
      adminNote,
    } = req.body;

    const existingRequests = await listProjectRequests();

    const existing = existingRequests.find(
      (request) => request.id === id
    );

    if (!existing) {
      return res.status(404).json({
        message: "Project request not found.",
      });
    }

    // ---------------------------------------------------------
    // Reschedule Google Calendar event
    // ---------------------------------------------------------

    let googleEventId = existing.google_event_id;
    let googleMeetUrl = existing.google_meet_url;

   if (
  selectedDate &&
  selectedTime &&
  (
    selectedDate !== existing.selected_date ||
    selectedTime !== existing.selected_time
  )
) {
      if (!googleEventId) {
        return res.status(400).json({
          message:
            "This request does not have a Google Calendar event.",
        });
      }

      console.log("Rescheduling Google Calendar event...");

      const googleEvent = await rescheduleDiscoveryCall({
        eventId: googleEventId,
        selectedDate,
        selectedTime,
      });

      googleMeetUrl =
        googleEvent.meetUrl || googleMeetUrl;

      console.log(
        "Google Calendar event rescheduled:",
        googleEventId
      );
    }

    const request = await updateProjectRequest(id, {
      status,
      selectedDate,
      selectedTime,
      adminNote,
            googleEventId,
      googleMeetUrl,
    });

    if (
      selectedDate &&
      selectedTime &&
      (
        selectedDate !== existing.selected_date ||
        selectedTime !== existing.selected_time
      )
    ) {
      try {
        await sendProjectConfirmation({
          name: existing.name,
          email: existing.email,
          companyName: existing.company_name,
          projectType: existing.project_type,
          selectedDate,
          selectedTime,
          meetUrl: googleMeetUrl,
        });

        console.log(
          "Updated meeting email sent to:",
          existing.email
        );
      } catch (emailError) {
        console.error(
          "Reschedule email failed:",
          emailError.message
        );
      }
    }

    res.json({
      ok: true,
      request,
    });
  } catch (err) {
    console.error(
      "Project request update failed:",
      err
    );

    next(err);
  }
});
router.delete("/", requireAdmin, async (req, res, next) => {
  try {
    await deleteAllProjectRequests();

    res.json({
      ok: true,
      message: "All project requests deleted.",
    });
  } catch (err) {
    console.error("All project requests deletion failed:", err);
    next(err);
  }
});
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await deleteProjectRequest(id);

    res.json({
      ok: true,
      request,
    });
  } catch (err) {
    console.error("Project request deletion failed:", err);
    next(err);
  }
});
router.post("/", requestLimiter, validators, async (req, res, next) => {
  try {
    // ---------------------------------------------------------
    // 1. Validate request
    // ---------------------------------------------------------

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
      role,
      companyName,
      projectType,
      ventureStage,
      selectedDate,
      selectedTime,
    } = req.body;

    // ---------------------------------------------------------
    // 2. Create Google Calendar event + Google Meet
    // ---------------------------------------------------------

    console.log("Creating Google Calendar event...");

    const googleEvent = await createDiscoveryCall({
      name,
      email,
      companyName,
      projectType,
      selectedDate,
      selectedTime,
    });

    console.log("Google Calendar event created:");
    console.log("Event ID:", googleEvent.eventId);
    console.log("Meet URL:", googleEvent.meetUrl);

    // ---------------------------------------------------------
    // 3. Save project request + Google details in Supabase
    // ---------------------------------------------------------

    const request = await createProjectRequest({
      name,
      email,
      role,
      companyName,
      projectType,
      ventureStage,
      selectedDate,
      selectedTime,

      googleEventId: googleEvent.eventId,
      googleMeetUrl: googleEvent.meetUrl,
      status: "scheduled",
    });

    console.log("Project request saved to Supabase.");

    // ---------------------------------------------------------
    // 4. Send confirmation email
    // ---------------------------------------------------------

    try {
      await sendProjectConfirmation({
        name,
        email,
        companyName,
        projectType,
        selectedDate,
        selectedTime,
        meetUrl: googleEvent.meetUrl,
      });

      console.log("Confirmation email sent to:", email);
    } catch (emailError) {
      // Email failure should NOT destroy the successful booking.
      console.error(
        "Confirmation email failed:",
        emailError.message
      );
    }

    // ---------------------------------------------------------
    // 5. Return success to frontend
    // ---------------------------------------------------------

    res.status(201).json({
      ok: true,

      request,

      meeting: {
        eventId: googleEvent.eventId,
        meetUrl: googleEvent.meetUrl,
        calendarUrl: googleEvent.htmlLink,
      },
    });
  } catch (err) {
    console.error("Project request failed:", err);

    next(err);
  }
});

export default router;