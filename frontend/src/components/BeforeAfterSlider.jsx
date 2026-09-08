import { useState, useRef, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";
import "../styles/home/before-after.css";

/**
 * Interactive Drag-to-Compare Slider
 * Supports mouse drag, touch drag, and accessible keyboard navigation (Left/Right arrows).
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPos = 50,
}) {
  const [pos, setPos] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(Math.round(percent * 10) / 10);
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already released
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div className="ba-slider">
      <div
        ref={frameRef}
        className={`ba-slider__frame ${isDragging ? "ba-slider__frame--dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`Drag to compare ${beforeLabel} and ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        data-cursor-label="Drag"
      >
        {/* Under layer (Before) */}
        <div className="ba-slider__layer ba-slider__layer--before">
          {before}
          <span className="ba-slider__tag ba-slider__tag--before">{beforeLabel}</span>
        </div>

        {/* Top layer (After) - clipped from the left up to `pos%` */}
        <div
          className="ba-slider__layer ba-slider__layer--after"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          {after}
          <span className="ba-slider__tag ba-slider__tag--after">{afterLabel}</span>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="ba-slider__handle"
          style={{ left: `${pos}%` }}
        >
          <div className="ba-slider__handle-line" />
          <span className="ba-slider__handle-grip">
            <MoveHorizontal size={15} />
          </span>
        </div>

        {/* Accessible hidden range input for screen readers */}
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="ba-slider__sr-range"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
