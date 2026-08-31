import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import siteConfig from "../../data/siteConfig";
import "../../styles/home/why.css";

export default function WhySection() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/why-features`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load why features: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setFeatures(data.features || []);
      })
      .catch((err) => {
        console.error("Failed to load Why Phronix features:", err);
      });
  }, []);
  return (
    <>
      <section className="section why">
        <div className="container why__grid">
          <div className="why__intro">
            <span className="eyebrow-badge">Why Phronix?</span>
            <h2 className="why__title">
              Built <span className="hero__title-gold">Right</span>,<br />
              Built to <span className="hero__title-gold">Last</span>.
            </h2>
            <p>
              Every engagement gets senior engineering attention, transparent
              communication, and code you actually own — no black boxes, no
              hand-offs to juniors mid-project.
            </p>
          </div>

          <div className="why__features">
  {features.map((feature) => {
    const Icon = Icons[feature.icon] || Icons.Sparkles;

    return (
      <div className="why-feature" key={feature.id}>
        <div className="why-feature__icon">
          <Icon size={20} strokeWidth={1.8} />
        </div>

        <h4>{feature.title}</h4>
        <p>{feature.description}</p>
      </div>
    );
  })}
</div>
        </div>
      </section>

    </>
  );
}
