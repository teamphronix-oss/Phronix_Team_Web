import "../../styles/home/page-ecosystem.css";

import sweeterjoy from "../../assets/projects/sweeter-joy.png";
import sweeterJoy1 from "../../assets/projects/sweeter-joy1.png";
import sweeterJoy2 from "../../assets/projects/sweeter-joy2.png";
import sweeterJoy3 from "../../assets/projects/sweeter-joy3.png";
import sweeterJoy4 from "../../assets/projects/sweeter-joy4.png";
import sweeterJoy5 from "../../assets/projects/sweeter-joy5.png";
import sweeterJoy6 from "../../assets/projects/sweeter-joy6.png";
import sweeterJoy7 from "../../assets/projects/sweeter-joy7.png";
import sweeterJoy8 from "../../assets/projects/sweeter-joy8.png";
import sweeterJoy9 from "../../assets/projects/sweeter-joy9.png";
import sweeterJoy10 from "../../assets/projects/sweeter-joy10.png";

// 👇 Ithe pratyek image samor tyacha khara tag (page name) lihi.
// Fakt "tag" value badal, order same theva jasa images add kelya aahet.
const project1Data = [
  { image: sweeterjoy, tag: "Home" },
  { image: sweeterJoy1, tag: "About Us" },
  { image: sweeterJoy2, tag: "Our Chocolates" },
  { image: sweeterJoy3, tag: "Contact Us" },
  { image: sweeterJoy4, tag: "FAQ" },
  { image: sweeterJoy5, tag: "Gallery" },
  { image: sweeterJoy6, tag: "Reviews" },
  { image: sweeterJoy7, tag: "Blog" },
  { image: sweeterJoy8, tag: "Order Now" },
  { image: sweeterJoy9, tag: "Careers" },
  { image: sweeterJoy10, tag: "Privacy Policy" },
];

const project1Slots = project1Data.map((item) => ({
  type: "project",
  tag: item.tag,
  image: item.image,
}));

// Bottom row — Project 2. No images yet: drop them into
// src/assets/projects/ (e.g. project2-1.png .. project2-10.png),
// import them above, and swap them into project2Data the same way as project1Data.
const project2Data = [];

const project2Slots = Array.from({ length: 10 }, (_, i) => ({
  type: project2Data[i] ? "project" : "project-placeholder",
  tag: project2Data[i] ? project2Data[i].tag : "Student Project",
  image: project2Data[i] ? project2Data[i].image : undefined,
}));

function EcosystemCard({ item }) {
  return (
    <div className="page-ecosystem-card">
      <span className="page-ecosystem-card__tag">{item.tag}</span>

      {item.type === "project" && (
        <div className="pe-project">
          <img src={item.image} alt={item.tag} loading="lazy" />
        </div>
      )}

      {item.type === "project-placeholder" && (
        <div className="pe-project pe-project--placeholder">
          <span>Image coming soon</span>
        </div>
      )}
    </div>
  );
}

export default function PageEcosystemSection() {
  return (
    <>
      <section className="section page-ecosystem">
        <div className="container page-ecosystem__intro">
          <span className="eyebrow-badge">Complete Page Ecosystem</span>
          <h2 className="page-ecosystem__title">
            <span className="page-ecosystem__grad">15+ Essential Pages</span><br />
            Crafted for Business Success
          </h2>
          <p>
            From onboarding flows to support policies, every essential page is
            built-in and fully customizable — saving you time, boosting trust,
            and getting you live faster.
          </p>
        </div>

        <div className="page-ecosystem-marquee">
          <div className="page-ecosystem-marquee__track">
            {[...project1Slots, ...project1Slots].map((item, i) => (
              <EcosystemCard item={item} key={`p1-${i}`} />
            ))}
          </div>
        </div>

        <div className="page-ecosystem-marquee page-ecosystem-marquee--reverse">
          <div className="page-ecosystem-marquee__track page-ecosystem-marquee__track--reverse">
            {[...project2Slots, ...project2Slots].map((item, i) => (
              <EcosystemCard item={item} key={`p2-${i}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}