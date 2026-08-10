import { useEffect, useRef, useState } from "react";

/**
 * StickyScrollFeature
 * ────────────────────
 * Right-side panel stays pinned (sticky) while the left-side numbered
 * steps scroll past. Whichever step is centered in the viewport becomes
 * "active" and its image/content crossfades into the pinned panel —
 * same effect as the Contiant hero (01 / 02 / 03 sliding through a
 * fixed device mockup).
 *
 * Usage:
 * <StickyScrollFeature
 *   eyebrow="How We Work"
 *   title="From idea to shipped product"
 *   sections={[
 *     { id: "discover", number: "01", title: "Discover", description: "...", image: "/images/step-1.png" },
 *     { id: "build",    number: "02", title: "Build",    description: "...", image: "/images/step-2.png" },
 *     { id: "ship",     number: "03", title: "Ship",     description: "...", image: "/images/step-3.png" },
 *   ]}
 * />
 *
 * Instead of `image`, a section can pass `render` (any JSX) to show
 * custom content (e.g. your own <div className="hero__shell"> mockup)
 * inside the pinned panel.
 */
export default function StickyScrollFeature({ eyebrow, title, sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      {
        // fires when a step crosses the vertical center of the viewport
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sections.length]);

  return (
    <section className="stickyscroll">
      <div className="container stickyscroll__grid">
        <div className="stickyscroll__steps">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2 className="stickyscroll__title">{title}</h2>}

          {sections.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => (stepRefs.current[i] = el)}
              data-index={i}
              className={`stickyscroll__step${
                activeIndex === i ? " stickyscroll__step--active" : ""
              }`}
            >
              <span className="stickyscroll__num">{s.number}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        <div className="stickyscroll__panel">
          <div className="stickyscroll__panel-inner">
            {sections.map((s, i) => (
              <div
                key={s.id}
                className={`stickyscroll__frame${
                  activeIndex === i ? " stickyscroll__frame--active" : ""
                }`}
                aria-hidden={activeIndex !== i}
              >
                {s.image ? (
                  <img src={s.image} alt={s.title} loading="lazy" />
                ) : (
                  s.render
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}