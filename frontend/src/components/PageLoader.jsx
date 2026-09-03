import { useEffect, useState } from "react";

const BANDS = [
  // "#BFE0FA", // soft blue
  // "#A7D4F5", // light blue
  // "#8FC6EE", // mid light blue
  // "#6FB3E6", // brighter blue
  // "#2E7BC7", // darker blue

  //  "#F7FBFF", // near-white ice
  // "#B8DFFF", // pale sky blue
  // "#65A9FF", // brand blue
  // "#38DCE6", // cyan-teal
  // "#28E2D0", // teal-green (matches "comes next." gradient end)

  //  "#7EE8E4", // light teal-cyan
  // "#3DDCE0", // cyan
  // "#28E2D0", // teal-green
  // "#2C9FD8", // mid blue-teal
  // "#1F5FA8", // deep blue

  //   "#7EE8E4", // light teal-cyan
  // "#3DDCE0", // cyan
  // "#28E2D0", // teal-green
  // "#2C9FD8", // mid blue-teal
  // "#1F5FA8", // deep blue

  "#7EE8E4", // light teal-cyan
  "#3DDCE0", // cyan
  "#28E2D0", // teal-green
  "#08A1AC", // mid blue-teal
];
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