import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import siteConfig from "../../data/siteConfig";
import "../../styles/home/hero.css";

export default function HeroSection() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__reveal hero__reveal--1">
            <span className="eyebrow">Software Development Company • Nashik, India</span>
            <h1 className="hero__title">
  Building <span className="hero__title-gold">Digital Products</span> That Drive Business Growth.
</h1>
            <p className="hero__lede">{siteConfig.shortDescription}</p>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn--gold">
                Get Started <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn btn--outline">
                View our work
              </Link>
            </div>
            <div className="hero__stats">
              <div><strong>40+</strong><span>Projects Completed</span></div>
              <div><strong>18</strong><span>Happy Clients</span></div>
              <div><strong>6</strong><span>Technology Services</span></div>
            </div>
          </div>

         <div className="hero__panel hero__reveal hero__reveal--2" aria-hidden="true">
  <div className="hero__shell">
    <div className="hero__shell-logo-wrap">
      <div className="hero__shell-logo" />
      <span className="hero__shell-orb hero__shell-orb--purple" />
      <span className="hero__shell-orb hero__shell-orb--orange" />
      <span className="hero__shell-orb hero__shell-orb--gold" />
      <span className="hero__shell-orb hero__shell-orb--ink" />
    </div>
  </div>
</div>
        </div>
      </section>

    </>
  );
}