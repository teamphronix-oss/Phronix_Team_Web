import { useState, useEffect, useRef, Children } from "react";

export default function CardCarousel({ children, interval = 4000 }) {
  const items = Children.toArray(children);
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const isPointerDown = useRef(false);

  // Auto rotate timer
  useEffect(() => {
    if (count <= 1 || isPaused || isDragging) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => clearInterval(timer);
  }, [count, interval, isPaused, isDragging]);

  const prev = () => {
    setActiveIndex((cur) => (cur - 1 + count) % count);
  };

  const next = () => {
    setActiveIndex((cur) => (cur + 1) % count);
  };

  const goTo = (index) => {
    setActiveIndex(index);
  };

  // ── Unified Touch & Pointer Drag Handlers ──
  const handleTouchStart = (e) => {
    setIsPaused(true);
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    deltaX.current = 0;
    deltaY.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    deltaX.current = touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const dx = deltaX.current;
    const dy = deltaY.current;

    // Trigger swipe if horizontal displacement exceeds 30px and dominates vertical movement
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 0.8) {
      if (dx < 0) {
        next(); // Swiped left -> advance
      } else {
        prev(); // Swiped right -> go back
      }
    }
    deltaX.current = 0;
    deltaY.current = 0;
  };

  // Mouse / Desktop pointer drag support
  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isPointerDown.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    deltaX.current = 0;
    deltaY.current = 0;
    setIsPaused(true);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) return;
    deltaX.current = e.clientX - startX.current;
    deltaY.current = e.clientY - startY.current;
    if (Math.abs(deltaX.current) > 8) {
      setIsDragging(true);
    }
  };

  const handlePointerUp = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsPaused(false);

    const dx = deltaX.current;
    const dy = deltaY.current;

    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 0.8) {
      if (dx < 0) next();
      else prev();
    }

    setTimeout(() => {
      setIsDragging(false);
    }, 50);

    deltaX.current = 0;
    deltaY.current = 0;
  };

  return (
    <div
      className={`card-carousel card-carousel--minimal ${isDragging ? "is-dragging" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isPointerDown.current) handlePointerUp();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="card-carousel__stage">
        {items.map((item, i) => {
          // Calculate shortest circular offset from activeIndex
          let offset = i - activeIndex;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const absOffset = Math.abs(offset);

          let transform = "";
          let opacity = 0;
          let filter = "none";
          let zIndex = count - absOffset;
          let pointerEvents = "none";

          if (offset === 0) {
            transform = "translateX(0%) scale(1) translateY(0)";
            opacity = 1;
            filter = "blur(0px)";
            pointerEvents = "auto";
          } else if (offset === 1) {
            transform = "translateX(104%) scale(0.9) translateY(6px)";
            opacity = 0.38;
            filter = "blur(1px)";
            pointerEvents = "auto";
          } else if (offset === -1) {
            transform = "translateX(-104%) scale(0.9) translateY(6px)";
            opacity = 0.38;
            filter = "blur(1px)";
            pointerEvents = "auto";
          } else {
            transform = `translateX(${offset * 120}%) scale(0.78)`;
            opacity = 0;
            pointerEvents = "none";
          }

          return (
            <div
              key={i}
              className={`card-carousel__item ${offset === 0 ? "is-active" : ""}`}
              style={{
                transform,
                opacity,
                filter,
                zIndex,
                pointerEvents: isDragging ? "none" : pointerEvents,
              }}
              onClick={() => {
                if (!isDragging && offset !== 0) goTo(i);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Minimal Dots Pagination */}
      <div className="card-carousel__dots">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`card-carousel__dot ${
              i === activeIndex ? "card-carousel__dot--active" : ""
            }`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}