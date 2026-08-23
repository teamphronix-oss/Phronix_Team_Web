import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import siteConfig from "../data/siteConfig";
import "../styles/home/services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        setError("Failed to load services.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="What we build"
          description="Every engagement starts with the same question: what does this product actually need? These are the disciplines we bring to answer it."
        />
        {loading && <p>Loading services...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="grid grid--3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
