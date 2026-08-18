import "../../styles/home/trusted-by.css";

const capabilities = [
  "AI SYSTEMS",
  "SOFTWARE PRODUCTS",
  "DIGITAL EXPERIENCES",
  "AUTOMATION",
  "3D & CREATIVE",
  "AI AGENTS",
  "WEB & MOBILE",
  "DIGITAL PRODUCTS",
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