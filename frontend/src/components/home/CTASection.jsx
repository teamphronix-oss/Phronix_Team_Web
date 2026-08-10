import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import siteConfig from "../../data/siteConfig";
import "../../styles/home/cta.css";

export default function CTASection() {
  return (
    <>
      <section className="section section--dark cta">
        <div className="container cta__inner">
          <div>
            <span className="eyebrow">Let's Build</span>
            <h2>Have a project in mind?</h2>
            <p>Tell us what you're building — we'll reply within one business day.</p>
          </div>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--gold">
              Get in touch <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
