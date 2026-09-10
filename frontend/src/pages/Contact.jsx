import { useState } from "react";
import {
  Loader2,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

import siteConfig from "../data/siteConfig";
import "../styles/contact.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

const projectTypes = [
  "Website Development",
  "Web Application",
  "Mobile Application",
  "E-Commerce Platform",
  "UI / UX Design",
  "AI / ML Integration",
  "Cloud & DevOps",
  "Custom Engineering",
  "General Inquiry",
];

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (form.phone && !/^[+\d][\d\s-]{7,15}$/.test(form.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.projectType || "General Inquiry",
          projectType: form.projectType || "General Inquiry",
          budget: "Flexible",
          timeline: "Flexible",
          contactMethod: "Email",
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setServerMessage(
        "Thank you! Your message has been received. We'll reply within one business day."
      );
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerMessage(err.message || "Failed to submit. Please try again.");
    }
  }

  return (
    <div className="page-head-section section contact-page">
      <div className="container contact-container">
        <div className="contact-split-layout">
          {/* =====================================================
              LEFT SIDE: Clean, Atmospheric & Inspiring Heading
          ====================================================== */}
          <div className="contact-left">
            <div className="contact-badge">
              <span className="contact-badge__dot" />
              <span>START A CONVERSATION</span>
            </div>

            <h1 className="contact-title">
              Let’s build <br />
              <span>something amazing.</span>
            </h1>

            <p className="contact-desc">
              Have an ambitious vision, need custom software engineered, or want
              to accelerate your digital product? We’re ready to turn your
              ideas into production-grade software.
            </p>

            <div className="contact-perks">
              <div className="contact-perk">
                <Clock size={16} className="contact-perk__icon" />
                <span>Fast turnaround — response in &lt; 4 hours</span>
              </div>
              <div className="contact-perk">
                <ShieldCheck size={16} className="contact-perk__icon" />
                <span>Full IP ownership &amp; confidential NDA</span>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE: Seamless & Minimal Glass Form
          ====================================================== */}
          <div className="contact-right">
            <form
              className="contact-form-glass"
              onSubmit={handleSubmit}
              noValidate
            >
              {status === "success" && (
                <div className="contact-status contact-status--success">
                  <CheckCircle2 size={18} />
                  <span>{serverMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="contact-status contact-status--error">
                  <AlertCircle size={18} />
                  <span>{serverMessage}</span>
                </div>
              )}

              {/* Row 1: Name + Email */}
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={errors.name ? "has-error" : ""}
                  />
                  {errors.name && (
                    <span className="error-msg">{errors.name}</span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={errors.email ? "has-error" : ""}
                  />
                  {errors.email && (
                    <span className="error-msg">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Phone + Project Type */}
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-phone">
                    Phone Number <span className="opt">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 90000 00000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-msg">{errors.phone}</span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="project-type">Project / Service</label>
                  <div className="contact-select-wrap">
                    <select
                      id="project-type"
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                    >
                      <option value="">Select an area (optional)</option>
                      {projectTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="contact-form__field">
                <div className="field-top">
                  <label htmlFor="contact-message">
                    Project Details <span className="req">*</span>
                  </label>
                  <span className="char-count">{form.message.length} / 1000</span>
                </div>
                <textarea
                  id="contact-message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Tell us about your project, goals, or scope..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={errors.message ? "has-error" : ""}
                />
                {errors.message && (
                  <span className="error-msg">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn--gold btn--block contact-submit-btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="contact-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="contact-privacy">
                We respect your privacy. No spam or unsolicited marketing.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}