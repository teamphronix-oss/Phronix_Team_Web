import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import OngoingProjectCard from "../components/OngoingProjectCard";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;
const API_ORIGIN = API.replace(/\/api$/, "");

export default function OngoingProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/ongoing-projects`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.ongoingProjects || []).map((p) => ({
          ...p,
          startDate: p.start_date,
          expectedCompletion: p.expected_completion,
          image: p.image_url
            ? p.image_url.startsWith("http")
              ? p.image_url
              : `${API_ORIGIN}${p.image_url}`
            : "/assets/placeholder-project.svg",
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error("Failed to load ongoing projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="In Progress"
          title="What we're building right now"
          description="A high-level look at active work. Client-confidential details, credentials, and source code are never shown here."
        />
        <div className="grid grid--3">
          {projects.map((p) => (
            <OngoingProjectCard key={p.id} project={p} />
          ))}
        </div>
        {!loading && projects.length === 0 && (
          <p className="empty-state">No ongoing projects to show right now.</p>
        )}
      </div>
    </div>
  );
}