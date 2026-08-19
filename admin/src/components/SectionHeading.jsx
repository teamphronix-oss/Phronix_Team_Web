export default function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className="section-head" style={center ? { margin: "0 auto 48px", textAlign: "center" } : undefined}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
