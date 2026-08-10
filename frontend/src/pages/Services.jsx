import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import services from "../data/services";

export default function Services() {
  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="What we build"
          description="Every engagement starts with the same question: what does this product actually need? These are the disciplines we bring to answer it."
        />
        <div className="grid grid--3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
