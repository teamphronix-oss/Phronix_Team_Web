import { useState } from "react";
import { Mail, Phone, MapPin, FileBadge, Loader2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import siteConfig from "../data/siteConfig";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (form.phone && !/^[+\d][\d\s-]{7,15}$/.test(form.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!form.subject.trim()) errors.subject = "Please add a subject.";
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setServerMessage("");
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
      setStatus("success");
      setServerMessage("Thanks — your message is in. We'll reply within one business day.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerMessage(err.message);
    }
  }

  return (
    <div className="page-head-section section">
      <div className="container contact__grid">
        <div>
          <SectionHeading
            eyebrow="Contact Us"
            title="Let's talk about your project"
            description="Fill out the form, or reach us directly using the details below."
          />

          <ul className="contact__info">
            <li>
              <Mail size={18} />
              <div>
                <strong>Email</strong>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
            </li>
            <li>
              <Phone size={18} />
              <div>
                <strong>Phone / WhatsApp</strong>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
              </div>
            </li>
            <li>
              <MapPin size={18} />
              <div>
                <strong>Office</strong>
                <span>{siteConfig.address.line1}, {siteConfig.address.line2}</span>
              </div>
            </li>
            <li>
              <FileBadge size={18} />
              <div>
                <strong>GSTIN</strong>
                <span>{siteConfig.gstNumber}</span>
              </div>
            </li>
          </ul>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--gold"
          >
            Chat on WhatsApp
          </a>
        </div>

        <form className="card contact-form" onSubmit={handleSubmit} noValidate>
          {status === "success" && <div className="form-status form-status--success">{serverMessage}</div>}
          {status === "error" && <div className="form-status form-status--error">{serverMessage}</div>}

          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={errors.name ? "has-error" : ""}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={errors.email ? "has-error" : ""}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={errors.phone ? "has-error" : ""}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
          </div>

          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              className={errors.subject ? "has-error" : ""}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && <p id="subject-error" className="field-error">{errors.subject}</p>}
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={errors.message ? "has-error" : ""}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
          </div>

          <button type="submit" className="btn btn--gold btn--block" disabled={status === "loading"}>
            {status === "loading" ? <><Loader2 size={16} className="spin" /> Sending…</> : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
