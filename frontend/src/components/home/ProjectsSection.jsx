import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import siteConfig from "../../data/siteConfig";
import sweeterJoy from "../../assets/projects/sweeter-joy.png";
import sweeterJoy1 from "../../assets/projects/sweeter-joy1.png";
import sweeterJoy2 from "../../assets/projects/sweeter-joy2.png";
import sweeterJoy3 from "../../assets/projects/sweeter-joy3.png";
import sweeterJoy5 from "../../assets/projects/sweeter-joy5.png";
import sweeterJoy7 from "../../assets/projects/sweeter-joy7.png";
import "../../styles/home/projects.css";

const featuredProjects = [
  {
    id: "sweeterjoy",
    name: "Sweeter Joy",
    category: "E-Commerce",
    subhead: "Artisan confectionery & automated checkout",
    image: sweeterJoy,
  },
  {
    id: "orbitpay",
    name: "OrbitPay",
    category: "Fintech & Billing",
    subhead: "Multi-vendor checkout & revenue analytics",
    image: sweeterJoy3,
  },
  {
    id: "pulseboard",
    name: "Pulseboard",
    category: "SaaS Analytics",
    subhead: "Real-time user telemetry & alerting",
    image: sweeterJoy5,
  },
  {
    id: "wanderly",
    name: "Wanderly",
    category: "Mobile & Travel",
    subhead: "Collaborative trip planner & offline maps",
    image: sweeterJoy2,
  },
  {
    id: "ledgerlite",
    name: "LedgerLite",
    category: "Productivity",
    subhead: "Minimal bookkeeping for high-growth agencies",
    image: sweeterJoy7,
  },
  {
    id: "artisan-studio",
    name: "Artisan Studio",
    category: "Brand & Creative",
    subhead: "Visual portfolio & client intake portal",
    image: sweeterJoy1,
  }
];

export default function ProjectsSection() {
  const [statNumber, setStatNumber] = useState("40+");
  const [displayCount, setDisplayCount] = useState(1);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.statNumber) setStatNumber(data.settings.statNumber);
      })
      .catch((err) => console.error("Failed to load stat number:", err));
  }, []);

  const targetNumber = parseInt(statNumber, 10) || 0;
  const suffix = statNumber.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!sectionRef.current || targetNumber <= 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const duration = 1600;
            const startTime = performance.now();

            const tick = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(1 + eased * (targetNumber - 1));

              setDisplayCount(current);

              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };

            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [targetNumber]);

  return (
    <section className="section projects-section" ref={sectionRef}>
      <div className="container">
        <div className="pe-stat">
          <span className="pe-stat__number">{displayCount}{suffix}</span>
        </div>

        <SectionHeading
          eyebrow="Featured Work"
          title="Digital products engineered for scale"
          description="From high-conversion e-commerce platforms to real-time analytics and custom mobile apps — explore our recent client builds."
        />
      </div>

      {/* Infinite Smooth Marquee */}
      <div className="projects-marquee">
        <div className="projects-marquee__track">
          {[...featuredProjects, ...featuredProjects].map((p, i) => (
            <Link
              to="/projects"
              className="project-card"
              key={`${p.id}-${i}`}
              data-cursor-label="View"
            >
              <div className="project-card__preview">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="project-card__category">{p.category}</span>
              </div>

              <div className="project-card__info">
                <div className="project-card__meta">
                  <h3 className="project-card__name">{p.name}</h3>
                  <span className="project-card__subhead">{p.subhead}</span>
                </div>
                <div className="project-card__arrow">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Centered Minimalist CTA */}
        <div className="projects-cta-wrap">
          <Link to="/projects" className="projects-more-btn">
            <span>Explore All Projects</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}