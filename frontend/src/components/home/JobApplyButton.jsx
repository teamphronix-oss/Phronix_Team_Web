import { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import "../../styles/home/apply-modal.css";

/**
 * Drop-in replacement for the old `mailto:` "Apply Now" link.
 *
 * Usage inside JobCard.jsx:
 *   import JobApplyButton from "../components/JobApplyButton";
 *   ...
 *   <JobApplyButton jobTitle={job.title} className="job-card__cta" />
 *
 * It renders the same-looking button, but opens an in-page application
 * form instead of handing off to the visitor's email client.
 */
export default function JobApplyButton({ jobTitle, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`btn btn--primary ${className}`.trim()}
        onClick={() => setIsOpen(true)}
      >
        Apply Now
      </button>

      {isOpen && (
        <ApplyModal jobTitle={jobTitle} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

const MAX_FILE_MB = 8;
const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];

function ApplyModal({ jobTitle, onClose }) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [resume, setResume] = useState(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const updateField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFile = (file) => {
    if (!file) return;
    const ext = "." + file.name.split(".").pop().toLowerCase();

    if (!ACCEPTED_TYPES.includes(ext)) {
      setFileError("Use a PDF or Word file.");
      setResume(null);
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`Keep it under ${MAX_FILE_MB}MB.`);
      setResume(null);
      return;
    }

    setFileError("");
    setResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setFileError("Attach your resume to continue.");
      return;
    }

    setStatus("submitting");

    try {
      // ─────────────────────────────────────────────────────────
      // TODO (backend): wire this up once /api/careers/apply exists.
      //
      // const payload = new FormData();
      // payload.append("position", jobTitle);
      // payload.append("name", form.name);
      // payload.append("email", form.email);
      // payload.append("phone", form.phone);
      // payload.append("note", form.note);
      // payload.append("resume", resume);
      //
      // const res = await fetch(`${API}/careers/apply`, {
      //   method: "POST",
      //   body: payload,
      // });
      // if (!res.ok) throw new Error("Application failed");
      // ─────────────────────────────────────────────────────────

      // Placeholder so the UI is demoable before the backend route exists.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus("success");
    } catch (err) {
      console.error("Application submit error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal apply-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Apply for ${jobTitle}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {status === "success" ? (
          <div className="apply-modal__success">
            <CheckCircle2 size={40} className="apply-modal__success-icon" />
            <h3>Application received</h3>
            <p>
              Thanks for applying to <strong>{jobTitle}</strong>. We'll be in
              touch if it's a fit.
            </p>
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="apply-modal__eyebrow">Apply for</span>
            <h3 className="apply-modal__title">{jobTitle}</h3>

            <form className="apply-form" onSubmit={handleSubmit}>
              <div className="apply-form__row">
                <label className="apply-form__field">
                  <span>Full name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Jane Doe"
                  />
                </label>

                <label className="apply-form__field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="jane@email.com"
                  />
                </label>
              </div>

              <label className="apply-form__field">
                <span>Phone</span>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={updateField("phone")}
                  placeholder="+91 98765 43210"
                />
              </label>

              <label className="apply-form__field">
                <span>Resume</span>
                <div
                  className={`apply-form__dropzone${resume ? " apply-form__dropzone--filled" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {resume ? (
                    <>
                      <FileText size={18} />
                      <span className="apply-form__filename">{resume.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      <span>Drop your resume here, or click to browse</span>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                </div>
                {fileError && <span className="apply-form__error">{fileError}</span>}
                <span className="apply-form__hint">PDF or Word, up to {MAX_FILE_MB}MB</span>
              </label>

              <label className="apply-form__field">
                <span>Anything you want us to know (optional)</span>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={updateField("note")}
                  placeholder="Portfolio link, notice period, etc."
                />
              </label>

              <button
                type="submit"
                className="btn btn--primary apply-form__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="apply-form__spinner" />
                    Sending...
                  </>
                ) : (
                  "Submit application"
                )}
              </button>

              {status === "error" && (
                <p className="apply-form__error apply-form__error--form">
                  Something went wrong. Try again in a moment.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}