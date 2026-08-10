import SectionHeading from "../components/SectionHeading";
import OngoingProjectCard from "../components/OngoingProjectCard";
import ongoingProjects from "../data/ongoingProjects";

export default function OngoingProjects() {
  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="In Progress"
          title="What we're building right now"
          description="A high-level look at active work. Client-confidential details, credentials, and source code are never shown here."
        />
        <div className="grid grid--3">
          {ongoingProjects.map((p) => (
            <OngoingProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
