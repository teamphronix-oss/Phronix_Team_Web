import { Sparkles, Users, Rocket, GraduationCap } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import JobCard from "../components/JobCard";
import careers from "../data/careers";
import siteConfig from "../data/siteConfig";

const values = [
  {
    icon: Sparkles,
    title: "Real work, from day one",
    text: "No busywork. You'll ship features that go live for real clients, quickly.",
  },
  {
    icon: Users,
    title: "Small, senior team",
    text: "Direct access to the people building alongside you — no layers to get lost in.",
  },
  {
    icon: Rocket,
    title: "Ownership over tickets",
    text: "We hire people to own problems, not just complete tasks off a board.",
  },
  {
    icon: GraduationCap,
    title: "Room to grow",
    text: "Learn by building across the stack, with feedback that's fast and honest.",
  },
];

export default function Careers() {
  const openRoles = careers.filter((j) => j.open);
  const closedRoles = careers.filter((j) => !j.open);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Careers"
          title="Build with us"
          description="We're a small studio that cares more about what you can ship than where you studied. If that sounds like you, take a look below."
        />

        <div className="grid grid--4 careers__values">
          {values.map((v) => (
            <div className="card careers__value" key={v.title}>
              <div className="service-card__icon">
                <v.icon size={22} strokeWidth={1.8} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: "72px" }}>
          <span className="eyebrow">Open Roles</span>
          <h2>Current openings</h2>
        </div>

        {openRoles.length > 0 ? (
          <div className="grid grid--2 careers__jobs">
            {openRoles.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p>There are no open roles right now — check back soon, or send us an open application below.</p>
        )}

        {closedRoles.length > 0 && (
          <div className="grid grid--2 careers__jobs" style={{ marginTop: "28px" }}>
            {closedRoles.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <div className="card careers__cta">
          <div>
            <h3>Don't see the right role?</h3>
            <p>We're always happy to hear from people who'd be a good fit. Send us your resume and a note about what you'd like to work on.</p>
          </div>
          <a
            href={`mailto:${siteConfig.careersEmail || siteConfig.email}?subject=${encodeURIComponent("Open Application")}`}
            className="btn btn--gold"
          >
            Send Open Application
          </a>
        </div>
      </div>
    </div>
  );
}