import "../../styles/home/trusted-by.css";

const capabilities = [
  "WHATSAPP BUSINESS & AUTOMATION",
  "EMAIL & SMS MARKETING AUTOMATION",
  "AI/AUTOMATION SERVICES",
  "CRM SETUP & SALES AUTOMATION",
  "CHATBOT INTEGRATION",
  "AI VOICE AGENT",
  "WEBSITE BUILDING SERVICES",
  "SEO SERVICES",
  "WEBSITE & APP MAINTENANCE",
  "SOFTWARE DEVELOPMENT",
  "MOBILE APP DEVELOPMENT",
  "BUSINESS PROCESS AUTOMATION",
  "LEAD GENERATION SERVICES",
 "LOCAL SEO & GOOGLE BUSINESS PROFILE",
 "E-COMMERCE DEVELOPMENT",
 "CONVERSION RATE OPTIMIZATION (CRO)",
  "PAID ADS & PERFORMANCE MARKETING",
  "SOCIAL MEDIA MANAGEMENT",
  "CONTENT-BASED SERVICES",
  "BRANDING & POSITIONING",
  "SALES ENABLEMENT",
];

export default function TrustedBySection() {
  return (
    <section className="trusted-by">
      <div className="container">
        <p className="trusted-by__label">
          Building the future with technology, marketing & AI
        </p>
      </div>

      <div className="trusted-by__row">
        <div className="trusted-by__track">
          {[...capabilities, ...capabilities].map((item, i) => (
            <span className="trusted-by__logo" key={`${item}-${i}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}