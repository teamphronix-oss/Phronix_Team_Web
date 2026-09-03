// ClientLogoMarquee.jsx
export default function ClientLogoMarquee({ logos = [] }) {
  // logos = [{ src: "/logos/client1.png", alt: "Client 1" }, ...]
  const marqueeLogos = [...logos, ...logos]; // duplicate for seamless loop

  return (
    <div className="client-marquee">
      <div className="client-marquee__track">
        {marqueeLogos.map((logo, i) => (
          <div className="client-marquee__item" key={i}>
            <img src={logo.src} alt={logo.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}