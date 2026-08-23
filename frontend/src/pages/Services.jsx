import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";
import "../styles/home/services.css";

export default function Services() {
  const [services, setServices] = useState([]);

useEffect(() => {
  fetch(`${siteConfig.apiBaseUrl}/services`)
    .then((res) => res.json())
    .then((data) => setServices(data.services || []))
    .catch((err) => console.error("Failed to load services:", err));
}, []);
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
  