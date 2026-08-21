import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import siteConfig from "../../data/siteConfig";
import ParticlePhoenix from "./ParticlePhoenix";
import "../../styles/home/hero.css";

export default function HeroSection() {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePhoenixInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return (
    <section className="hero hero--particle">
      <div className="hero__ambient" />
      <ParticlePhoenix onInteraction={handlePhoenixInteraction} />

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          PHRONIX · AI · SOFTWARE · DIGITAL
        </div>

        <h1 className="hero__title">
          Build what <span>comes next.</span>
        </h1>

        <p className="hero__lede">
          {siteConfig.shortDescription}
        </p>

        <div className="hero__actions">
          <Link to="/contact" className="hero__button hero__button--primary">
            Start a project <ArrowRight size={16} />
          </Link>

          <Link to="/projects" className="hero__button hero__button--ghost">
            Explore our work
          </Link>
        </div>

        <div className="hero__meta">
          <span><Sparkles size={13} /> AI-first thinking</span>
          <span>40+ projects</span>
          <span>18+ clients</span>
        </div>
      </div>

      <div className="hero__bottom">
        <span>SCROLL TO BUILD</span>
        <span className="hero__bottom-line" />
        <span>PHRONIX / 01</span>
      </div>
    </section>
  );
}