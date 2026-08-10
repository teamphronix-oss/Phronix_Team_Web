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
     <svg
  className="demos-soon__arrow"
  viewBox="0 0 200 150"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  {/* Curly double-loop spiral, top right */}
  <path
    d="M108 34
       C 118 14, 144 8, 160 20
       C 178 34, 176 58, 158 66
       C 142 73, 124 63, 128 48
       C 131 37, 145 33, 152 42
       C 157 49, 150 55, 143 51"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
  />
  {/* Smooth swooping tail from the loop down to the pill */}
  <path
    d="M108 34
       C 88 42, 62 54, 42 70
       C 28 81, 18 92, 12 104"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
  />
  {/* Arrowhead */}
  <path
    d="M30 94L12 104L18 82"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
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
