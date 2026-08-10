import { useEffect, useState } from "react";

const BANDS = ["#A9CAC3", "#EAD0C4", "#DCC5BA", "#D6CBEA", "#7FB3AA"];
const BAND_DURATION = 750; // ms, must match the CSS animation-duration
const STAGGER = 160; // ms between each band starting its slide — tight overlap

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const total = BAND_DURATION + STAGGER * (BANDS.length - 1) + 150;
    const timer = setTimeout(() => setVisible(false), total);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      {BANDS.map((color, i) => (
        <span
          key={color}
          className="page-loader__band"
          style={{
            background: color,
            zIndex: BANDS.length - i,
            animationDelay: `${(i * STAGGER) / 1000}s`,
          }}
        />
      ))}
    </div>
  );
}