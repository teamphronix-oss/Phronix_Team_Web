import { useState, useEffect, useRef, Children } from "react";

// Must match the CSS transition duration on .card-carousel__item
// (transform 0.6s ...) — used to time the invisible "wrap" teleport.
const TRANSITION_MS = 600;

export default function CardCarousel({ children, interval = 3000 }) {
  const items = Children.toArray(children);
  const count = items.length;

  // Visible slots run from -maxVisible..+maxVisible (e.g. -1,0,1 for 3 cards).
  // exitAt is the first fully-invisible position just past the edge —
  // this is where a card "disappears" before being teleported.
  const maxVisible = Math.floor(count / 2);
  const exitAt = maxVisible + 1;

  // positions[i] = current slot offset of item i (-1 left, 0 center, 1 right, ...)
  const [positions, setPositions] = useState(() =>
    items.map((_, i) => i - maxVisible)
  );
  // Indices currently being teleported — rendered with transitions
  // disabled for exactly one frame so the jump is never visible.
  const [frozen, setFrozen] = useState(() => new Set());

  const tickTimer = useRef(null);
  const snapTimer = useRef(null);
  const rafTimer = useRef([]);

  useEffect(() => {
    if (count <= 1) return;

    tickTimer.current = setInterval(() => {
      // Step 1: everything shifts one slot to the right, with a normal
      // transition — left card slides to center, center slides to right,
      // right card slides out past the edge (fading to opacity 0).
      setPositions((prev) => prev.map((p) => p + 1));

      clearTimeout(snapTimer.current);
      // Step 2: once that slide has visually finished, any card that
      // landed on the invisible exit slot gets teleported back to the
      // start of the line. Subtracting exactly `count` (not just "far
      // enough left") keeps every card exactly 1 slot apart from the
      // others at all times — that's what guarantees a card is always
      // sitting in the center slot with no gap.
      snapTimer.current = setTimeout(() => {
        setPositions((prev) => {
          const wrapping = new Set();
          const next = prev.map((p, i) => {
            if (p >= exitAt) {
              wrapping.add(i);
              return p - count;
            }
            return p;
          });
          if (wrapping.size) {
            // Freeze: this render has transition disabled + forced
            // opacity 0, so relocating it to the visible slot is
            // invisible. Two rAFs later we un-freeze it, which lets
            // it fade in smoothly in its new spot.
            setFrozen(wrapping);
            rafTimer.current.push(
              requestAnimationFrame(() => {
                rafTimer.current.push(
                  requestAnimationFrame(() => setFrozen(new Set()))
                );
              })
            );
          }
          return next;
        });
      }, TRANSITION_MS);
    }, interval);

    return () => {
      clearInterval(tickTimer.current);
      clearTimeout(snapTimer.current);
      rafTimer.current.forEach(cancelAnimationFrame);
      rafTimer.current = [];
    };
  }, [count, interval, exitAt]);

  const goTo = (i) => {
    clearTimeout(snapTimer.current);
    setFrozen(new Set());
    // Re-center the arrangement around the clicked card.
    setPositions((prev) => prev.map((_, idx) => idx - i));
  };

  return (
    <div className="card-carousel">
      <div className="card-carousel__stage">
        {items.map((item, i) => {
          const offset = positions[i];
          const abs = Math.abs(offset);
          const hidden = abs >= exitAt; // fully invisible right at the exit slot
          const isFrozen = frozen.has(i);

          const style = {
            transform: `translateX(${offset * 118}%) translateZ(${-abs * 260}px) rotateY(${offset * -34}deg) scale(${1 - abs * 0.14})`,
            zIndex: count - abs,
            opacity: isFrozen ? 0 : hidden ? 0 : 1 - abs * 0.28,
            pointerEvents: offset === 0 ? "auto" : "none",
            transition: isFrozen
              ? "none"
              : "transform 0.6s var(--ease), opacity 0.6s var(--ease)",
          };

          return (
            <div className="card-carousel__item" style={style} key={i}>
              {item}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="card-carousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`card-carousel__dot ${positions[i] === 0 ? "card-carousel__dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}