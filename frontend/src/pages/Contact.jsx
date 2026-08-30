import { useState, useEffect } from "react";

import {
  Mail,
  Phone,
  MapPin,
  FileBadge,
  Loader2,
  Send,
  User,
  BriefcaseBusiness,
  Tag,
  CalendarDays,
  MessageCircle,
  Paperclip,
  ChevronDown,
  PencilLine,
  LockKeyhole,
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
};

const projectTypes = [
  "Website Development",
  "Web Application",
  "Mobile Application",
  "E-Commerce",
  "UI / UX Design",
  "AI / ML Project",
  "Cloud / DevOps",
  "Student Project",
  "Other",
];

const budgetRanges = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "Above ₹2,50,000",
];

const timelines = [
  "1 – 2 Weeks",
  "2 – 4 Weeks",
  "1 – 2 Months",
  "2 – 3 Months",
  "3+ Months",
];

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = "That doesn't look like a valid email.";
  }

  if (
    form.phone &&
    !/^[+\d][\d\s-]{7,15}$/.test(form.phone)
  ) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!form.projectType) {
    errors.projectType = "Please select a project type.";
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

function ContactCard({ icon: Icon, title, children, accent = false }) {
  return (
    <div className={`contact-modern__card ${accent ? "contact-modern__card--accent" : ""}`}>
      <div className="contact-modern__card-icon">
        <Icon size={25} strokeWidth={1.8} />
      </div>

      <div className="contact-modern__card-content">
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  );
}

function InputIcon({ children }) {
  return (
    <span className="contact-modern__input-icon">
      {children}
    </span>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [file, setFile] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);
const [settingsLoading, setSettingsLoading] = useState(true);

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
  useEffect(() => {
  async function fetchSiteSettings() {
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/settings`);

      if (!res.ok) {
        throw new Error("Failed to load site settings.");
      }

      const data = await res.json();

      setSiteSettings(data.settings);
    } catch (error) {
      console.error("Failed to load site settings:", error);
    } finally {
      setSettingsLoading(false);
    }
  }

  fetchSiteSettings();
}, []);

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
      const res = await fetch(
        `${siteConfig.apiBaseUrl}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: form.projectType,
            message: form.message,

            // Additional frontend details.
            projectType: form.projectType,
            budget: form.budget,
            timeline: form.timeline,
            contactMethod: form.contactMethod,
            attachmentName: file?.name || "",
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Something went wrong. Please try again."
        );
      }

      setStatus("success");

      setServerMessage(
        "Thanks — your message is in. We'll reply within one business day."
      );

      setForm(initialForm);
      setFile(null);
    } catch (err) {
      setStatus("error");
      setServerMessage(err.message);
    }
  }

  const whatsappNumber = siteConfig.whatsappNumber;
  const whatsappMessage =
    siteConfig.whatsappDefaultMessage ||
    "Hello, I would like to discuss a project.";

  return (
    <div className="page-head-section section contact-modern">
      <div className="container">
        <div className="contact-modern__grid">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div className="contact-modern__left">

            <div className="contact-modern__heading">
              <div className="contact-modern__eyebrow">
                <span>CONTACT US</span>
                <i />
              </div>

              <h1>
                Let’s build
                <br />
                <span>something amazing</span>
              </h1>

              <p>
                Have a project in mind or want to know more about
                our services? We’d love to hear from you.
              </p>
            </div>

            <div className="contact-modern__details">

              <ContactCard
                icon={Mail}
                title="Email Us"
              >
                <a
                  href={`mailto:${siteSettings?.email || siteConfig.email}`}
                  className="contact-modern__main-link"
                >
                  {siteSettings?.email || siteConfig.email}
                </a>

                <small>
                  We usually reply within a few hours
                </small>
              </ContactCard>

              <ContactCard
                icon={Phone}
                title="Call / WhatsApp"
              >
                <a
                  href={`tel:${(siteSettings?.phone || siteConfig.phone).replace(/\s/g, "")}`}
                  className="contact-modern__main-link"
                >
                  {siteSettings?.phone || siteConfig.phone}
                </a>

                <small>
                  Mon – Sat, 10:00 AM – 7:00 PM
                </small>
              </ContactCard>

              <ContactCard
                icon={MapPin}
                title="Our Office"
              >
                <span className="contact-modern__address">
                  {siteSettings?.addressLine1 || siteConfig.address.line1}
                  <br />
                  {siteSettings?.addressLine2 || siteConfig.address.line2}
                </span>

                <small>
                  Mon – Sat, 10:00 AM – 7:00 PM
                </small>
              </ContactCard>

              {siteSettings?.gstNumber && (
  <ContactCard
    icon={FileBadge}
    title="GSTIN"
  >
    <span className="contact-modern__main-link">
      {siteSettings.gstNumber}
    </span>
  </ContactCard>
)}

            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-modern__whatsapp"
            >
              <MessageCircle size={22} />

              <span>Chat on WhatsApp</span>

              <span className="contact-modern__whatsapp-arrow">
                →
              </span>
            </a>

          </div>

          {/* =====================================================
              RIGHT SIDE FORM
          ====================================================== */}

          <form
            className="contact-modern__form-card"
            onSubmit={handleSubmit}
            noValidate
          >

            <div className="contact-modern__form-header">

              <div className="contact-modern__form-icon">
                <PencilLine size={28} />
              </div>

              <div>
                <h2>Send us a message</h2>

                <p>
                  We’re here to help you
                </p>
              </div>

            </div>

            {status === "success" && (
              <div className="contact-modern__status contact-modern__status--success">
                {serverMessage}
              </div>
            )}

            {status === "error" && (
              <div className="contact-modern__status contact-modern__status--error">
                {serverMessage}
              </div>
            )}

            {/* Name + Email */}

            <div className="contact-modern__two-columns">

              <div className="contact-modern__field">
                <label htmlFor="contact-name">
                  Full Name <span>*</span>
                </label>

                <div className="contact-modern__input-wrap">
                  <InputIcon>
                    <User size={18} />
                  </InputIcon>

                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      update("name", e.target.value)
                    }
                    className={
                      errors.name
                        ? "contact-modern__error-input"
                        : ""
                    }
                  />
                </div>

                {errors.name && (
                  <small className="contact-modern__field-error">
                    {errors.name}
                  </small>
                )}
              </div>

              <div className="contact-modern__field">
                <label htmlFor="contact-email">
                  Email Address <span>*</span>
                </label>

                <div className="contact-modern__input-wrap">
                  <InputIcon>
                    <Mail size={18} />
                  </InputIcon>

                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      update("email", e.target.value)
                    }
                    className={
                      errors.email
                        ? "contact-modern__error-input"
                        : ""
                    }
                  />
                </div>

                {errors.email && (
                  <small className="contact-modern__field-error">
                    {errors.email}
                  </small>
                )}
              </div>

            </div>

            {/* Phone */}

            <div className="contact-modern__field">
              <label htmlFor="contact-phone">
                Phone / WhatsApp
              </label>

              <div className="contact-modern__input-wrap">
                <InputIcon>
                  <Phone size={18} />
                </InputIcon>

                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+91 90000 00000"
                  value={form.phone}
                  onChange={(e) =>
                    update("phone", e.target.value)
                  }
                  className={
                    errors.phone
                      ? "contact-modern__error-input"
                      : ""
                  }
                />
              </div>

              {errors.phone && (
                <small className="contact-modern__field-error">
                  {errors.phone}
                </small>
              )}
            </div>

            {/* Project Type */}

            <div className="contact-modern__field">
              <label htmlFor="project-type">
                Project Type
              </label>

              <div className="contact-modern__input-wrap">
                <InputIcon>
                  <BriefcaseBusiness size={18} />
                </InputIcon>

                <select
                  id="project-type"
                  value={form.projectType}
                  onChange={(e) =>
                    update("projectType", e.target.value)
                  }
                  className={
                    errors.projectType
                      ? "contact-modern__error-input"
                      : ""
                  }
                >
                  <option value="">
                    Select project type
                  </option>

                  {projectTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="contact-modern__select-arrow"
                  size={18}
                />
              </div>

              {errors.projectType && (
                <small className="contact-modern__field-error">
                  {errors.projectType}
                </small>
              )}
            </div>

            {/* Budget + Timeline */}

            <div className="contact-modern__two-columns">

              <div className="contact-modern__field">
                <label htmlFor="budget">
                  Budget Range
                </label>

                <div className="contact-modern__input-wrap">
                  <InputIcon>
                    <Tag size={18} />
                  </InputIcon>

                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) =>
                      update("budget", e.target.value)
                    }
                  >
                    <option value="">
                      Select budget range
                    </option>

                    {budgetRanges.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="contact-modern__select-arrow"
                    size={18}
                  />
                </div>
              </div>

              <div className="contact-modern__field">
                <label htmlFor="timeline">
                  Timeline
                </label>

                <div className="contact-modern__input-wrap">
                  <InputIcon>
                    <CalendarDays size={18} />
                  </InputIcon>

                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) =>
                      update("timeline", e.target.value)
                    }
                  >
                    <option value="">
                      Select timeline
                    </option>

                    {timelines.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="contact-modern__select-arrow"
                    size={18}
                  />
                </div>
              </div>

            </div>

            {/* Preferred Contact */}

            <div className="contact-modern__field">
              <label htmlFor="contact-method">
                Preferred Contact Method
              </label>

              <div className="contact-modern__input-wrap">
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>

                <select
                  id="contact-method"
                  value={form.contactMethod}
                  onChange={(e) =>
                    update(
                      "contactMethod",
                      e.target.value
                    )
                  }
                >
                  <option value="Email">Email</option>
                  <option value="Phone">
                    Phone
                  </option>
                  <option value="WhatsApp">
                    WhatsApp
                  </option>
                </select>

                <ChevronDown
                  className="contact-modern__select-arrow"
                  size={18}
                />
              </div>
            </div>

            {/* Message */}

            <div className="contact-modern__field">
              <label htmlFor="contact-message">
                Message / Project Details <span>*</span>
              </label>

              <div className="contact-modern__textarea-wrap">
                <MessageCircle size={19} />

                <textarea
                  id="contact-message"
                  rows={5}
                  maxLength={1000}
                  placeholder="Tell us about your project, requirements, goals..."
                  value={form.message}
                  onChange={(e) =>
                    update("message", e.target.value)
                  }
                  className={
                    errors.message
                      ? "contact-modern__error-input"
                      : ""
                  }
                />

                <span className="contact-modern__counter">
                  {form.message.length} / 1000
                </span>
              </div>

              {errors.message && (
                <small className="contact-modern__field-error">
                  {errors.message}
                </small>
              )}
            </div>

            {/* Attachment */}

            <div className="contact-modern__attachment">
              <Paperclip size={22} />

              <div>
                <strong>
                  {file
                    ? file.name
                    : "Attach File (Optional)"}
                </strong>

                <span>
                  PDF, DOC, JPG, PNG (Max. 5MB)
                </span>
              </div>

              <label
                htmlFor="contact-file"
                className="contact-modern__browse"
              >
                Browse
              </label>

              <input
                id="contact-file"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const selected =
                    e.target.files?.[0];

                  if (!selected) return;

                  if (
                    selected.size >
                    5 * 1024 * 1024
                  ) {
                    alert(
                      "File size must be less than 5MB."
                    );
                    e.target.value = "";
                    return;
                  }

                  setFile(selected);
                }}
              />
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="contact-modern__submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2
                    size={20}
                    className="contact-modern__spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>

            <div className="contact-modern__security">
              <LockKeyhole size={15} />

              <span>
                Your information is safe with us.
                We never share your data.
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}