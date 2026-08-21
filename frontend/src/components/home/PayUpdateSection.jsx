import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import "../../styles/home/pay-update.css";

export default function PayUpdateSection() {
  return (
    <>
      <section className="pay-update-section">
        <div className="container pay-update__grid">

          {/* LEFT CONTENT */}
          <div className="pay-update__content">

            <div className="pay-update__brand">
              <span className="pay-update__brand-mark">P</span>
              <span>Phronix</span>
            </div>

            <h2 className="pay-update__title">
              Pay Once.
              <br />
              <span>Update Forever.</span>
              <br />
              <small>1 Months Support from Experts.</small>
            </h2>

            <p className="pay-update__description">
              Launch your digital product with confidence. Get continuous
              improvements, compatibility updates, bug fixes, and expert
              support from the team that built it.
            </p>

            <div className="pay-update__actions">
              <Link to="/contact" className="pay-update__btn pay-update__btn--primary">
                Get Started <ArrowRight size={17} />
              </Link>

              <Link to="/projects" className="pay-update__btn pay-update__btn--dark">
                See Our Work <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="pay-update__note">
              <Check size={15} />
              <span>1 Months Free Post-Launch Support</span>
            </div>

          </div>


          {/* RIGHT VISUAL */}
          <div className="pay-update__visual">

            <div className="pay-update__glow pay-update__glow--one" />
            <div className="pay-update__glow pay-update__glow--two" />

            {/* Floating 3D Blocks */}
            <div className="pay-update__cube pay-update__cube--one">
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--side" />
            </div>

            <div className="pay-update__cube pay-update__cube--two">
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--side" />
            </div>

            <div className="pay-update__cube pay-update__cube--three">
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--side" />
            </div>

            {/* Main Platform */}
            <div className="pay-update__platform">
              <span />
            </div>

            {/* Price Card */}
            <div className="pay-update__price-card">
              <span className="pay-update__price-label">
                Phronix Care
              </span>

              <strong>
                1 <small>MONTHS</small>
              </strong>

              <span className="pay-update__price-sub">
                Support & Updates
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────── */}
    </>
  );
}
