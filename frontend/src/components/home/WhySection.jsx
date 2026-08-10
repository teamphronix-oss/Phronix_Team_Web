import { Layers, Gauge, ShieldCheck, Code2, GitBranch, Headphones } from "lucide-react";
import "../../styles/home/why.css";

export default function WhySection() {
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
            <div className="why-feature">
              <div className="why-feature__icon">
                <Layers size={20} strokeWidth={1.8} />
              </div>
              <h4>Modular Architecture</h4>
              <p>Clean, composable systems that scale without a rewrite.</p>
            </div>
            <div className="why-feature">
              <div className="why-feature__icon">
                <Gauge size={20} strokeWidth={1.8} />
              </div>
              <h4>Performance First</h4>
              <p>Optimized for Core Web Vitals and real-world speed.</p>
            </div>
            <div className="why-feature">
              <div className="why-feature__icon">
                <ShieldCheck size={20} strokeWidth={1.8} />
              </div>
              <h4>Secure by Default</h4>
              <p>Security best practices baked into every build.</p>
            </div>
            <div className="why-feature">
              <div className="why-feature__icon">
                <Code2 size={20} strokeWidth={1.8} />
              </div>
              <h4>Clean, Typed Code</h4>
              <p>Documented, maintainable codebases that are easy to extend.</p>
            </div>
            <div className="why-feature">
              <div className="why-feature__icon">
                <GitBranch size={20} strokeWidth={1.8} />
              </div>
              <h4>Full Ownership</h4>
              <p>You get the complete source — no lock-in, ever.</p>
            </div>
            <div className="why-feature">
              <div className="why-feature__icon">
                <Headphones size={20} strokeWidth={1.8} />
              </div>
              <h4>Real Support</h4>
              <p>Direct access to the engineers who actually built it.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
