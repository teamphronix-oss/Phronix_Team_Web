import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/services`);

        if (!response.ok) {
          throw new Error("Failed to load services.");
        }

        const data = await response.json();

        const mappedServices = (data.services || []).map((service) => ({
          id: service.id,
          name: service.name,
          icon: service.icon,
          shortDescription: service.description || "",
          technologies: service.features || [],
          priceRange: service.price_range || "",
        }));

        setServices(mappedServices);
      } catch (err) {
        console.error("Services API error:", err);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
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
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}