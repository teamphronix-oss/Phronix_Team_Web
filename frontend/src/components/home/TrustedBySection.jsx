import "../../styles/home/trusted-by.css";

const capabilities = [
  "AI/AUTOMATION SERVICES",
  "WEBSITE BUILDING SERVICES",
  "SEO SERVICES",
  "PAID ADS & PERFORMANCE MARKETING",
  "CONTENT-BASED SERVICES",
  "BRANDING & POSITIONING",
  "UI/UX DESIGNING",
  "SOFTWARE DEVELOPMENT",
  "SALES ENABLEMENT",
  "BASIC DIGITAL & TECH SUPPORT",
  "MOBILE APP DEVELOPMENT",
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