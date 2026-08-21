import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
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
    image: sweeterJoy,
    description: "Artisan confectionery e-commerce platform with automated 1-tap checkout and delivery tracking.",
    technologies: ["React", "Next.js", "Stripe", "Tailwind"],
  },
  {
    id: "orbitpay",
    name: "OrbitPay",
    category: "Fintech & Billing",
    image: sweeterJoy3,
    description: "Multi-vendor checkout platform with split payments and real-time merchant revenue analytics.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: "pulseboard",
    name: "Pulseboard",
    category: "SaaS Analytics",
    image: sweeterJoy5,
    description: "Real-time customer analytics and telemetry dashboard with customizable alert triggers.",
    technologies: ["Next.js", "PostgreSQL", "D3.js", "Tailwind"],
  },
  {
    id: "wanderly",
    name: "Wanderly",
    category: "Mobile & Travel",
    image: sweeterJoy2,
    description: "Cross-platform mobile travel planner with offline sync and collaborative itineraries.",
    technologies: ["React Native", "Firebase", "Mapbox"],
  },
  {
    id: "ledgerlite",
    name: "LedgerLite",
    category: "Productivity",
    image: sweeterJoy7,
    description: "Fast, minimal bookkeeping software built for high-growth freelance teams and agencies.",
    technologies: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "artisan-studio",
    name: "Artisan Studio",
    category: "Brand & Creative",
    image: sweeterJoy1,
    description: "Immersive visual storefront with sub-second image CDN caching and dynamic filter queries.",
    technologies: ["React", "Next.js", "Tailwind"],
  }
];

export default function ProjectsSection() {
  return (
    <section className="section projects-section">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Work"
          title="Digital products engineered for scale"
          description="From high-conversion e-commerce platforms to real-time analytics and custom AI workflows — explore recent client builds."
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
              <div className="project-card__top">
                <div className="project-card__dots">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <span className="project-card__category">{p.category}</span>
                <span className="project-card__status">
                  <span className="status-indicator" /> Live
                </span>
              </div>

              <div className="project-card__preview">
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="project-card__overlay">
                  <span className="project-card__view-btn">
                    <span>View Project</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>

              <div className="project-card__body">
                <div className="project-card__header-row">
                  <h3 className="project-card__name">{p.name}</h3>
                </div>
                <p className="project-card__desc">{p.description}</p>

                <div className="project-card__tags">
                  {p.technologies.map((t) => (
                    <span key={t} className="project-card__tag">
                      {t}
                    </span>
                  ))}
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

        {/* Minimal Trust Bar */}
        <div className="projects-trust-note">
          <span className="projects-trust-badge">
            <CheckCircle2 size={14} />
            <span>40+ Products Built & Delivered Across Web, Mobile & AI</span>
          </span>
        </div>
      </div>
    </section>
  );
}