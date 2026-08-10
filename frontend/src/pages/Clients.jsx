import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import testimonials from "../data/testimonials";

export default function Clients() {
  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Clients & Testimonials"
          title="Trusted by teams who've shipped with us"
          description="A few words from the people we've built for."
        />
        <div className="grid grid--3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
