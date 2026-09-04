import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Code2, TrendingUp, Bot, LayoutGrid } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import staticServices from "../data/services";
import siteConfig from "../data/siteConfig";
import "../styles/home/services.css";
import "../styles/home/services-filter.css";

const pillars = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "build", label: "Build", icon: Code2 },
  { key: "grow", label: "Grow", icon: TrendingUp },
  { key: "automate", label: "Automate", icon: Bot },
];

export default function Services() {
  const location = useLocation();
  const [services, setServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("all");

  // Deep-linking: /services#build, /services#grow, /services#automate
  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (["build", "grow", "automate"].includes(hash)) {
      setActive(hash);
    }
  }, [location.hash]);

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/services`)
      .then((res) => res.json())
      .then((data) => {
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services from API, using defaults:", err);
        setLoading(false);
      });
  }, []);

  const filtered =
    active === "all" ? services : services.filter((s) => s.pillar === active);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="What we build — and grow"
          description="Every engagement starts with the same question: what does this product actually need — to work, to be found, and to sell? These are the disciplines we bring to answer it."
        />

        <div className="services-filter" role="tablist" aria-label="Filter services">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={active === p.key}
                className={`services-filter__tab ${
                  active === p.key ? "services-filter__tab--active" : ""
                }`}
                onClick={() => setActive(p.key)}
              >
                <Icon size={15} strokeWidth={2} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {loading && services.length === 0 && <p>Loading services...</p>}
        {error && services.length === 0 && <p>{error}</p>}

        <div className="grid grid--3">
          {filtered.map((service, i) => (
            <ServiceCard key={service.id || i} service={service} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
