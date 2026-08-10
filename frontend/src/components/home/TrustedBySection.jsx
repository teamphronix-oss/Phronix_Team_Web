import "../../styles/home/trusted-by.css";

export default function TrustedBySection() {
  return (
    <>
      <section className="trusted-by">
        <div className="container">
          <p className="trusted-by__label">Trusted by B2B marketing and growth teams</p>
        </div>
        <div className="trusted-by__row">
          <div className="trusted-by__track">
            {[
              "ElevenLabs", "Figma", "Framer", "auth0",
              "replit", "GAMMA", "HubSpot", "Graphite",
              "ElevenLabs", "Figma", "Framer", "auth0",
              "replit", "GAMMA", "HubSpot", "Graphite",
            ].map((name, i) => (
              <span className="trusted-by__logo" key={`${name}-${i}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
