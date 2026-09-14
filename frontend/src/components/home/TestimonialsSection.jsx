import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import TestimonialCard from "../../components/TestimonialCard";
import "../../styles/home/testimonials.css";

function getColumnCount() {
  if (typeof window === "undefined") return 4;
  const w = window.innerWidth;
  if (w <= 650) return 1;   // mobile: 1 column, ALL testimonials in it
  if (w <= 1100) return 2;  // tablet: 2 columns
  return 4;                 // desktop: 4 columns
}

/**
 * Splits testimonials round-robin into `columnCount` columns, then pads
 * any short column by cycling back through its own items so every
 * column ends up with the SAME number of cards.
 *
 * Why this matters: if the total testimonial count isn't an exact
 * multiple of columnCount (e.g. 10 testimonials / 4 columns -> 3,3,2,2),
 * the shorter columns' marquee tracks run out of content before
 * reaching the section's full height. Since the section height is set
 * (via JS) to match the tallest column, the shorter columns show empty
 * space at the bottom mid-loop — that's the "closing up in the middle"
 * gap. Padding keeps every column's track height identical.
 */
function buildEqualColumns(testimonials, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);

  testimonials.forEach((t, index) => {
    columns[index % columnCount].push(t);
  });

  const maxLen = Math.max(...columns.map((c) => c.length));

  return columns.map((col) => {
    if (col.length === 0 || col.length === maxLen) return col;
    const padded = [...col];
    let i = 0;
    while (padded.length < maxLen) {
      padded.push(col[i % col.length]);
      i++;
    }
    return padded;
  });
}

export default function TestimonialsSection({ testimonials }) {
  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    function handleResize() {
      setColumnCount(getColumnCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile (columnCount = 1) every testimonial lands in the single
  // column, so nothing gets hidden or repeated — padding is a no-op
  // there since there's only one column and it's automatically maxLen.
  const columns = buildEqualColumns(testimonials, columnCount);

  return (
    <section className="section section--soft testimonials-section">
      <div className="container">

        <SectionHeading
          eyebrow="Client Feedback"
          title="What clients say after launch"
        />

      </div>

      <div
        className="testimonials-marquee"
        style={{ "--testimonial-cols": columnCount }}
      >

        {columns.map((column, columnIndex) => (

          <div
            className="testimonials-marquee__column"
            key={columnIndex}
          >

            <div className="testimonials-marquee__track">

              {/* First set */}
              <div className="testimonials-marquee__group">
                {column.map((t, i) => (
                  <div
                    className="testimonials-marquee__item"
                    key={`first-${t.id}-${i}`}
                  >
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="testimonials-marquee__group">
                {column.map((t, i) => (
                  <div
                    className="testimonials-marquee__item"
                    key={`second-${t.id}-${i}`}
                  >
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}