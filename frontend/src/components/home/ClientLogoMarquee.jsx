import { useEffect, useState } from "react";
import { getDominantColor } from "../../utils/getDominantColor";

export default function ClientLogoMarquee({ logos = [] }) {
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    const targets = logos.filter((l) => l.name && !colorMap[l.src]);

    if (targets.length === 0) return;

    targets.forEach((logo) => {
      getDominantColor(logo.src)
        .then((color) => {
          if (color) {
            console.log(logo.name, "→", color); // TEMP DEBUG, नंतर काढून टाक
            setColorMap((prev) => ({ ...prev, [logo.src]: color }));
          }
        })
        .catch((err) => {
          console.log(logo.name, "failed:", err); // TEMP DEBUG
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logos]);

  const marqueeLogos = [...logos, ...logos];

  return (
    <div className="client-marquee">
      <div className="client-marquee__track">
        {marqueeLogos.map((logo, i) => (
          <div className="client-marquee__item" key={i}>
            <span className="client-marquee__circle">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </span>
            {logo.name && (
              <span
                className="client-marquee__name"
                style={
                  colorMap[logo.src]
                    ? { "--logo-color": colorMap[logo.src] }
                    : undefined
                }
              >
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}