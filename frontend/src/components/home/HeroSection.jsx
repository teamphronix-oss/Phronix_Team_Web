import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code2, TrendingUp, Bot } from "lucide-react";
import { useCallback, useState } from "react";
import siteConfig from "../../data/siteConfig";
import ParticlePhoenix from "./ParticlePhoenix";
import ProjectIntakeModal from "./ProjectIntakeModal";
import CountUp from "../CountUp";
import "../../styles/home/hero.css";
import "../../styles/home/hero-pillars.css";

const pillarTabs = [
  {
    key: "build",
    label: "Build",
    icon: Code2,
    tagline: "Web · Mobile · Cloud · Backend",
    mock: "code",
  },
  {
    key: "grow",
    label: "Grow",
    icon: TrendingUp,
    tagline: "SEO · Paid Ads · Brand · Content",
    mock: "chart",
  },
  {
    key: "automate",
    label: "Automate",
    icon: Bot,
    tagline: "AI Chatbots · Workflow AI · Retrofits",
    mock: "chat",
  },
];

export default function HeroSection() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [activePillar, setActivePillar] = useState("build");

  const handlePhoenixInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return (
    <>
      <section className="hero hero--particle">
        <div className="hero__ambient" />
        <ParticlePhoenix onInteraction={handlePhoenixInteraction} />

        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            PHRONIX · SOFTWARE · MARKETING · GROWTH
          </div>

          <h1 className="hero__title">
            Build what <span>comes next.</span>
          </h1>

          <p className="hero__lede">
            {siteConfig.shortDescription}
          </p>

          <div className="hero__actions">
            <button
              type="button"
              onClick={() => setIsIntakeOpen(true)}
              className="hero__button hero__button--primary"
            >
              Start a project <ArrowRight size={16} />
            </button>

            <Link to="/projects" className="hero__button hero__button--ghost">
              Explore our work
            </Link>
          </div>

          <div className="hero__pillars">
            <div className="hero__pillars-tabs" role="tablist" aria-label="What we do">
              {pillarTabs.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    type="button"
                    role="tab"
                    aria-selected={activePillar === p.key}
                    className={`hero__pillar-tab ${
                      activePillar === p.key ? "hero__pillar-tab--active" : ""
                    }`}
                    onClick={() => setActivePillar(p.key)}
                  >
                    <Icon size={14} strokeWidth={2} />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {pillarTabs
              .filter((p) => p.key === activePillar)
              .map((p) => (
                <div className="hero__pillar-panel" key={p.key}>
                  <div className={`hero__pillar-mock hero__pillar-mock--${p.mock}`}>
                    {p.mock === "code" && (
                      <>
                        <span className="hero__pillar-mock-line hero__pillar-mock-line--a" />
                        <span className="hero__pillar-mock-line hero__pillar-mock-line--b" />
                        <span className="hero__pillar-mock-line hero__pillar-mock-line--c" />
                      </>
                    )}
                    {p.mock === "chart" && (
                      <>
                        <span className="hero__pillar-bar" style={{ height: "40%" }} />
                        <span className="hero__pillar-bar" style={{ height: "65%" }} />
                        <span className="hero__pillar-bar" style={{ height: "50%" }} />
                        <span className="hero__pillar-bar" style={{ height: "85%" }} />
                        <span className="hero__pillar-bar" style={{ height: "70%" }} />
                      </>
                    )}
                    {p.mock === "chat" && (
                      <>
                        <span className="hero__pillar-bubble hero__pillar-bubble--in">
                          How do I track my order?
                        </span>
                        <span className="hero__pillar-bubble hero__pillar-bubble--out">
                          It shipped today — here's your live tracking link.
                        </span>
                      </>
                    )}
                  </div>
                  <p className="hero__pillar-tagline">{p.tagline}</p>
                </div>
              ))}
          </div>

          <div className="hero__meta">
            <span><Sparkles size={13} /> AI-first thinking</span>
            <span><CountUp end={40} suffix="+" /> projects</span>
            <span><CountUp end={18} suffix="+" /> clients</span>
            <span><CountUp end={60} suffix="+" /> campaigns launched</span>
          </div>
        </div>


      </section>

      <ProjectIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </>
  );
}