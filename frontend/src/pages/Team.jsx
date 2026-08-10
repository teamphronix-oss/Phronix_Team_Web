import TeamCarousel from "../components/TeamCarousel";

export default function Team() {
  return (
    <div className="page-head-section section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Meet the Team</span>
          <h2>The people you'll actually work with</h2>
        </div>

        <TeamCarousel />
      </div>
    </div>
  );
}