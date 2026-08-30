import { useState, useEffect, useMemo } from "react";
import { X, ArrowRight, ArrowLeft, Check, Calendar, CalendarCheck } from "lucide-react";
import "../../styles/home/project-intake-modal.css";

const ROLE_OPTIONS = ["Founder", "CTO / Eng", "Product", "Enterprise", "Other"];
const TYPE_OPTIONS = ["AI & Agents", "Web Application", "Mobile App", "Rapid MVP"];
const STAGE_OPTIONS = ["Idea / Concept", "Early Startup", "Growth / Scaling", "Enterprise"];
const TIME_SLOTS = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];

export default function ProjectIntakeModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: You, 2: Venture, 3: Schedule, 4: Done

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Founder",
    companyName: "",
    type: "AI & Agents",
    stage: "Early Startup",
    selectedDayIndex: 0,
    selectedSlot: "03:30 PM",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meeting, setMeeting] = useState(null);

  const resetForm = () => {
    setStep(1);

    setFormData({
      name: "",
      email: "",
      role: "Founder",
      companyName: "",
      type: "AI & Agents",
      stage: "Early Startup",
      selectedDayIndex: 0,
      selectedSlot: "03:30 PM",
    });

    setErrors({});
    setIsSubmitting(false);
  };

  // Dynamic next 5 business days
  const availableDays = useMemo(() => {
    const days = [];
    let current = new Date();
    current.setDate(current.getDate() + 1);

    while (days.length < 5) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push({
          dateStr: current.toISOString().split("T")[0],
          dayName: current.toLocaleDateString("en-US", { weekday: "short" }),
          monthDay: current.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          dayNum: current.getDate(),
          fullDate: current.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, []);

  // Keyboard navigation & scroll lock
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        resetForm();
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset step if opened freshly after completion
  useEffect(() => {
    if (isOpen && step === 4) {
      setStep(1);
    }
  }, [isOpen]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };


  const handleNextStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleNextStep2 = () => {
    const errs = {};
    if (!formData.companyName.trim()) {
      errs.companyName = "Please enter your company or project name";
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handleConfirmSchedule = async () => {
    if (isSubmitting) return;

    const activeDay = availableDays[formData.selectedDayIndex];

    if (!activeDay) {
      setErrors({ schedule: "Please select a valid date." });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/project-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role,
          companyName: formData.companyName.trim(),
          projectType: formData.type,
          ventureStage: formData.stage,
          selectedDate: activeDay.dateStr,
          selectedTime: formData.selectedSlot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit your request.");
      }

      setMeeting(data.meeting);
      setStep(4);
    } catch (error) {
      console.error("Project request submission failed:", error);

      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const activeDay = availableDays[formData.selectedDayIndex] || availableDays[0];
  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div
      className={`intake-backdrop ${isOpen ? "is-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetForm();
          onClose();
        }
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="intake-modal">
        {/* Minimal Progress Line */}
        {step < 4 && (
          <div className="intake-progress-bar">
            <div
              className="intake-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Modal Header */}
        <div className="intake-modal__header">
          <div>
            {step < 4 && (
              <div className="intake-step-tag">Step {step} of 3</div>
            )}
            <h2 className="intake-modal__title">
              {step === 1 && "Let's connect"}
              {step === 2 && "About your project"}
              {step === 3 && "Pick a time to meet"}
              {step === 4 && "You're scheduled!"}
            </h2>
            <p className="intake-modal__subtitle">
              {step === 1 && "Tell us who is leading the build."}
              {step === 2 && "Quick details to help us prepare."}
              {step === 3 && "30-min strategy call with our lead engineers."}
              {step === 4 && "We sent the meeting invite and link to your email."}
            </p>
          </div>

          <button
            type="button"
            className="intake-modal__close"
            onClick={() => {
              resetForm();
              onClose();
            }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="intake-modal__body">
          {/* STEP 1: YOU */}
          {step === 1 && (
            <>
              <div className="intake-field">
                <label className="intake-field__label">Your Name</label>
                <input
                  type="text"
                  className={`intake-input ${errors.name ? "has-error" : ""}`}
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleNextStep1()}
                />
                {errors.name && <span className="intake-error-msg">{errors.name}</span>}
              </div>

              <div className="intake-field">
                <label className="intake-field__label">Work Email</label>
                <input
                  type="email"
                  className={`intake-input ${errors.email ? "has-error" : ""}`}
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNextStep1()}
                />
                {errors.email && <span className="intake-error-msg">{errors.email}</span>}
              </div>

              <div className="intake-field">
                <label className="intake-field__label">Your Role</label>
                <div className="intake-pills-row">
                  {ROLE_OPTIONS.map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`intake-pill-btn ${formData.role === role ? "is-selected" : ""}`}
                      onClick={() => updateField("role", role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 2: VENTURE */}
          {step === 2 && (
            <>
              <div className="intake-field">
                <label className="intake-field__label">Company or Venture Name</label>
                <input
                  type="text"
                  className={`intake-input ${errors.companyName ? "has-error" : ""}`}
                  placeholder="e.g. Nexus AI"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleNextStep2()}
                />
                {errors.companyName && (
                  <span className="intake-error-msg">{errors.companyName}</span>
                )}
              </div>

              <div className="intake-field">
                <label className="intake-field__label">What are you looking to build?</label>
                <div className="intake-pills-row">
                  {TYPE_OPTIONS.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`intake-pill-btn ${formData.type === type ? "is-selected" : ""}`}
                      onClick={() => updateField("type", type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="intake-field">
                <label className="intake-field__label">Venture Stage</label>
                <div className="intake-pills-row">
                  {STAGE_OPTIONS.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      className={`intake-pill-btn ${formData.stage === stage ? "is-selected" : ""}`}
                      onClick={() => updateField("stage", stage)}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 3: SCHEDULE */}
          {step === 3 && (
            <>
              <div className="cal-info-badge">
                <Calendar size={15} style={{ color: "#38bdf8" }} />
                <span>30 min · Google Meet with Phronix Lead Engineer</span>
              </div>

              <div className="intake-field">
                <label className="intake-field__label">Select Day</label>
                <div className="cal-days-row">
                  {availableDays.map((day, idx) => (
                    <button
                      key={day.dateStr}
                      type="button"
                      className={`cal-day-chip ${formData.selectedDayIndex === idx ? "is-selected" : ""}`}
                      onClick={() => updateField("selectedDayIndex", idx)}
                    >
                      <span className="cal-day-chip-name">{day.dayName}</span>
                      <span className="cal-day-chip-num">{day.dayNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="intake-field">
                <label className="intake-field__label">
                  Available Time Slots ({activeDay.dayName}, {activeDay.monthDay})
                </label>
                <div className="cal-slots-row">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`cal-slot-chip ${formData.selectedSlot === slot ? "is-selected" : ""}`}
                      onClick={() => updateField("selectedSlot", slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              {errors.submit && (
                <div className="intake-error-msg">
                  {errors.submit}
                </div>
              )}
            </>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === 4 && (
            <div className="intake-confirm-screen">
              <div className="intake-confirm-icon">
                <Check size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#fff", margin: 0 }}>
                  Discovery Call Confirmed
                </h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                  Google Meet link sent to <strong style={{ color: "#f1f5f9" }}>{formData.email}</strong>
                </p>
              </div>

              <div className="intake-confirm-card">
                <div>
                  <strong>When:</strong> {activeDay.fullDate} at {formData.selectedSlot}
                </div>
                <div>
                  <strong>Project:</strong> {formData.companyName || "Your Venture"} ({formData.type})
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {meeting?.meetUrl && (
                    <a
                      href={meeting.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="intake-action-btn intake-action-btn--primary"
                    >
                      Join Google Meet
                    </a>
                  )}

                  {meeting?.calendarUrl && (
                    <a
                      href={meeting.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="intake-action-btn intake-action-btn--ghost"
                    >
                      <CalendarCheck size={15} />
                      View Calendar Event
                    </a>
                  )}

                  <button
                    type="button"
                    className="intake-action-btn intake-action-btn--ghost"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {step < 4 && (
          <div className="intake-modal__footer">
            {step > 1 ? (
              <button
                type="button"
                className="intake-action-btn intake-action-btn--ghost"
                onClick={() => setStep((s) => s - 1)}
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <button
                type="button"
                className="intake-action-btn intake-action-btn--ghost"
                onClick={onClose}
              >
                Cancel
              </button>
            )}

            {step === 1 && (
              <button
                type="button"
                className="intake-action-btn intake-action-btn--primary"
                onClick={handleNextStep1}
              >
                Next <ArrowRight size={14} />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                className="intake-action-btn intake-action-btn--primary"
                onClick={handleNextStep2}
              >
                Next: Schedule <ArrowRight size={14} />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                className="intake-action-btn intake-action-btn--primary"
                onClick={handleConfirmSchedule}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Confirm Call <Check size={14} />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
