import { useState } from "react";
import {
  Loader2,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Paperclip,
} from "lucide-react";

import siteConfig from "../data/siteConfig";
import "../styles/contact.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  contactMethod: "Email",
  message: "",
  file: null,
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

const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
];

const contactMethods = ["Email", "Phone", "WhatsApp"];

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

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    update("file", file);
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
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("phone", form.phone.trim());
      formData.append("subject", form.projectType || "General Inquiry");
      formData.append("projectType", form.projectType || "General Inquiry");
      formData.append("budget", form.budget || "Flexible");
      formData.append("timeline", form.timeline || "Flexible");
      formData.append("contactMethod", form.contactMethod || "Email");
      formData.append("message", form.message.trim());
      if (form.file) {
        formData.append("file", form.file);
      }

      const res = await fetch(`${siteConfig.apiBaseUrl}/contact`, {
        method: "POST",
        body: formData,
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
                    Phone / WhatsApp <span className="opt">(Optional)</span>
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
                  <label htmlFor="project-type">Project Type</label>
                  <div className="contact-select-wrap">
                    <select
                      id="project-type"
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                    >
                      <option value="">Select project type</option>
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

              {/* Row 3: Budget + Timeline */}
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-budget">Budget Range</label>
                  <div className="contact-select-wrap">
                    <select
                      id="contact-budget"
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="select-arrow" />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-timeline">Timeline</label>
                  <div className="contact-select-wrap">
                    <select
                      id="contact-timeline"
                      value={form.timeline}
                      onChange={(e) => update("timeline", e.target.value)}
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Row 4: Preferred Contact Method */}
              <div className="contact-form__field">
                <label htmlFor="contact-method">Preferred Contact Method</label>
                <div className="contact-select-wrap">
                  <select
                    id="contact-method"
                    value={form.contactMethod}
                    onChange={(e) => update("contactMethod", e.target.value)}
                  >
                    {contactMethods.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="select-arrow" />
                </div>
              </div>

              {/* Row 5: Message */}
              <div className="contact-form__field">
                <div className="field-top">
                  <label htmlFor="contact-message">
                    Message / Project Details <span className="req">*</span>
                  </label>
                  <span className="char-count">{form.message.length} / 1000</span>
                </div>
                <textarea
                  id="contact-message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Tell us about your project, requirements, goals..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={errors.message ? "has-error" : ""}
                />
                {errors.message && (
                  <span className="error-msg">{errors.message}</span>
                )}
              </div>

              {/* Row 6: Attach File */}
              <div className="contact-form__field contact-form__field--file">
                <label htmlFor="contact-file">
                  Attach File <span className="opt">(Optional)</span>
                </label>
                <div className="contact-file-wrap">
                  <div className="contact-file-info">
                    <Paperclip size={15} className="contact-file-icon" />
                    <span>
                      {form.file ? form.file.name : "PDF, DOC, JPG, PNG (Max. 5MB)"}
                    </span>
                  </div>
                  <label htmlFor="contact-file" className="contact-file-btn">
                    Browse
                  </label>
                  <input
                    id="contact-file"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    hidden
                  />
                </div>
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