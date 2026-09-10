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

export default function TestimonialsSection({ testimonials }) {
  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    function handleResize() {
      setColumnCount(getColumnCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // columns split based on the CURRENT column count —
  // on mobile (columnCount = 1) every testimonial lands in the
  // single column, so nothing gets hidden or repeated.
  const columns = Array.from({ length: columnCount }, (_, col) =>
    testimonials.filter((_, index) => index % columnCount === col)
  );

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
                {column.map((t) => (
                  <div
                    className="testimonials-marquee__item"
                    key={`first-${t.id}`}
                  >
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="testimonials-marquee__group">
                {column.map((t) => (
                  <div
                    className="testimonials-marquee__item"
                    key={`second-${t.id}`}
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