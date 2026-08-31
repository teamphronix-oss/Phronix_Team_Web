import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import siteConfig from "../../data/siteConfig";
import "../../styles/home/about.css";

const defaultTitle = "A small studio, deliberately.";
const defaultDescription =
  "We keep the team small so every project gets senior attention — from the first architecture decision to the last production deploy. We work across web, mobile, cloud, and AI, but the discipline stays the same: understand the problem before writing a line of code.";

export default function AboutSection() {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.aboutTitle) setTitle(data.settings.aboutTitle);
        if (data.settings?.aboutDescription) setDescription(data.settings.aboutDescription);
      })
      .catch((err) => console.error("Failed to load about intro:", err));

    fetch(`${siteConfig.apiBaseUrl}/about-points`)
      .then((res) => res.json())
      .then((data) => setPoints(data.points || []))
      .catch((err) => console.error("Failed to load about points:", err));
  }, []);

  return (
    <>
      <section className="section">
        <div className="container about__grid">
          <SectionHeading
            eyebrow="About Phronix"
            title={title}
            description={description}
          />
          <div className="about__points">
            {points.map((p) => (
              <div key={p.id}>
                <span className="eyebrow">{p.eyebrow}</span>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}