import SectionHeading from "../../components/SectionHeading";
import "../../styles/home/about.css";

export default function AboutSection() {
  return (
    <>
      <section className="section">
        <div className="container about__grid">
          <SectionHeading
            eyebrow="About Phronix"
            title="A small studio, deliberately."
            description="We keep the team small so every project gets senior attention — from the first architecture decision to the last production deploy. We work across web, mobile, cloud, and AI, but the discipline stays the same: understand the problem before writing a line of code."
          />
          <div className="about__points">
            <div>
              <span className="eyebrow">PHX / 01</span>
              <h4>Product-first thinking</h4>
              <p>We ask what the software needs to do before we ask what stack to use.</p>
            </div>
            <div>
              <span className="eyebrow">PHX / 02</span>
              <h4>Senior engineers only</h4>
              <p>No hand-off to juniors mid-project. The people who scope it, build it.</p>
            </div>
            <div>
              <span className="eyebrow">PHX / 03</span>
              <h4>Built to last</h4>
              <p>Clean, documented, maintainable code — because we often maintain it too.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
