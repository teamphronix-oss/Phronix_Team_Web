import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import "../styles/home/before-after.css";

/**
 * Drag-to-compare slider. `before` and `after` are React nodes rendered
 * full-bleed inside the frame; the "after" layer is revealed left-to-right
 * as the handle moves right.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba-slider">
      <div className="ba-slider__frame">
        <div className="ba-slider__layer ba-slider__layer--before">
          {before}
          <span className="ba-slider__tag ba-slider__tag--before">{beforeLabel}</span>
        </div>

        <div
          className="ba-slider__layer ba-slider__layer--after"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          {after}
          <span className="ba-slider__tag ba-slider__tag--after">{afterLabel}</span>
        </div>

        <div className="ba-slider__handle" style={{ left: `${pos}%` }}>
          <span className="ba-slider__handle-grip">
            <MoveHorizontal size={14} />
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="ba-slider__range"
          aria-label={`Drag to compare ${beforeLabel} and ${afterLabel}`}
        />
      </div>
    </div>
  );
}
