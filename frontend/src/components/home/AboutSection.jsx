import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import siteConfig from "../../data/siteConfig";
import "../../styles/home/about.css";

const defaultTitle = "A small studio, deliberately.";
const defaultDescription =
  "We keep the team small so every project gets senior attention — from the first architecture decision to the last production deploy, and from the first landing page to the campaign that fills it. We work across web, mobile, cloud, and AI, and we carry that same product into the market with SEO, paid acquisition, and brand strategy. One team, no hand-offs between the people who build it and the people who sell it.";

const defaultPoints = [
  {
    id: "p1",
    eyebrow: "PHX / 01",
    title: "Product-first thinking",
    description: "We ask what the software needs to do before we ask what stack to use.",
  },
  {
    id: "p2",
    eyebrow: "PHX / 02",
    title: "Senior engineers only",
    description: "No hand-off to juniors mid-project. The people who scope it, build it.",
  },
  {
    id: "p3",
    eyebrow: "PHX / 03",
    title: "Marketing that compounds",
    description: "SEO, paid, content, and brand work built to grow the product we just shipped — not a bolt-on afterthought.",
  },
  {
    id: "p4",
    eyebrow: "PHX / 04",
    title: "Built to last",
    description: "Clean, documented, maintainable code — because we often maintain it too.",
  },
];

export default function AboutSection() {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [points, setPoints] = useState(defaultPoints);

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
      .then((data) => {
        if (data.points && data.points.length > 0) {
          setPoints(data.points);
        }
      })
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
            {points.map((p, idx) => (
              <div key={p.id || idx}>
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