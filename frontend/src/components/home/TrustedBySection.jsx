import "../../styles/home/trusted-by.css";

const capabilities = [
  "AI/AUTOMATION SERVICES",
  "WEBSITE BUILDING SERVICES",
  "SEO SERVICES",
  "CONTENT-BASED SERVICES",
  "UI/UX DESIGNING",
  "SOFTWARE DEVELOPMENT",
  "BASIC DIGITAL & TECH SUPPORT",
  "MOBILE APP DEVELOPMENT",
];

export default function TrustedBySection() {
  return (
    <section className="trusted-by">
      <div className="container">
        <p className="trusted-by__label">
          Building the future with technology, creativity & AI
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