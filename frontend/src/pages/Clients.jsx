import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import siteConfig from "../data/siteConfig";

export default function Clients() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        // TestimonialCard expects feedback/logo/company/clientName — map the
        // backend's message/photo_url/company_name/name onto those without
        // touching TestimonialCard itself.
        const mapped = (data.testimonials || []).map((t) => ({
          ...t,
          feedback: t.message,
          logo: t.photo_url,
          company: t.company_name,
          clientName: t.name,
        }));
        setTestimonials(mapped);
      })
      .catch((err) => console.error("Failed to load testimonials:", err));
  }, []);

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
