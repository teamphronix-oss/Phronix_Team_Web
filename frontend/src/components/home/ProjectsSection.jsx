import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
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
  return (
    <section className="section projects-section">
      <div className="container">
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