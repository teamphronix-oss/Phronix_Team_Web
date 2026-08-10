import SectionHeading from "../../components/SectionHeading";
import TestimonialCard from "../../components/TestimonialCard";
import "../../styles/home/testimonials.css";

export default function TestimonialsSection({ testimonials }) {

  // 4 vertical columns
  const columns = [0, 1, 2, 3].map((col) =>
    testimonials.filter((_, index) => index % 4 === col)
  );

  return (
    <section className="section section--soft testimonials-section">
      <div className="container">

        <SectionHeading
          eyebrow="Client Feedback"
          title="What clients say after launch"
        />

      </div>

      <div className="testimonials-marquee">

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

