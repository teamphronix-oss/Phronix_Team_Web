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
            <span className="eyebrow">You're building the company.</span>
            <h2>We're building everything around it.</h2>
            <p>Design. Development. Shipped.</p>
            <p>Sound good?</p>
          </div>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--gold">
              Start a Project <ArrowRight size={16} />
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