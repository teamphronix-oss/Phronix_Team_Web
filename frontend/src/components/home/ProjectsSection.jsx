import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import projects from "../../data/projects";
import "../../styles/home/projects.css";

export default function ProjectsSection() {
  return (
    <>
      <section className="section section--space projects-showcase">
        <div className="container projects-showcase__intro">
          <div className="projects-showcase__stat">
            <span className="projects-showcase__stat-number">40+</span>
          </div>
          <h2 className="projects-showcase__title">
            Purpose-Built Products for Every Business Vision
          </h2>
          <p>
            From ambitious startups to established brands — launch-ready
            products, shipped in weeks, not months.
          </p>
        </div>

        <div className="projects-marquee">
          <div className="projects-marquee__track">
            {[...projects, ...projects].map((p, i) => (
              <div className="browser-card" key={`${p.id}-${i}`}>
                <div className="browser-card__bar">
                  <span className="browser-card__dot browser-card__dot--red" />
                  <span className="browser-card__dot browser-card__dot--yellow" />
                  <span className="browser-card__dot browser-card__dot--green" />
                  <span className="browser-card__badges">
                    <span className={`browser-card__badge browser-card__badge--${i % 2 === 0 ? "a" : "b"}`}>
                      {i % 2 === 0 ? "Popular" : "Trending"}
                    </span>
                    <span className="browser-card__badge browser-card__badge--c">New</span>
                  </span>
                </div>
                <div className="browser-card__image">
  <img src={p.image} alt={p.name} loading="lazy" />
  <div className="browser-card__hover">
    <button
      type="button"
      className={`browser-card__page-btn ${
        (p.pageType ?? (i % 2 === 0 ? "one" : "multi")) === "one"
          ? "browser-card__page-btn--active"
          : ""
      }`}
    >
      One Page
    </button>
    <button
      type="button"
      className={`browser-card__page-btn ${
        (p.pageType ?? (i % 2 === 0 ? "one" : "multi")) === "multi"
          ? "browser-card__page-btn--active"
          : ""
      }`}
    >
      Multi Page
    </button>
  </div>
</div>
              </div>
            ))}
          </div>
        </div>

       <div className="container">
  <Link to="/projects" className="btn btn--outline home__more-link">
    See all projects <ArrowUpRight size={16} />
  </Link>

 <div className="demos-soon">
    <span className="demos-soon__pill-wrap">
      <span className="demos-soon__pill">More Demos Coming Soon</span>
    </span>
    <p className="demos-soon__sub">
      New demos are added regularly to meet the latest SaaS trends.
    </p>
  </div>
</div>
      </section>

    </>
  );
}