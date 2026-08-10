import { useEffect, useRef } from "react";

/* Interactive dot-grid background — the "particle field" effect seen
   behind the hero on lamalama.com. A grid of small dots sits at rest;
   as the mouse moves near them, each dot is pushed away from the
   cursor (repulsion) and eases back to its home position once the
   cursor moves off. Rendered on <canvas> for performance since it's
   redrawing every frame.

   Usage: drop <CursorDotField /> as an absolutely-positioned layer
   inside a `position: relative` section (e.g. the hero), sized to
   fill that section. It never captures clicks (pointer-events: none),
   so it's safe to place over/under existing content. */
export default function CursorDotField({
  spacing = 26,      // gap between dots, px
  dotSize = 2,        // resting dot radius, px
  radius = 140,        // how far the cursor's influence reaches, px
  strength = 34,        // max displacement of a dot at the cursor's center, px
  color = "rgba(255,255,255,0.55)",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    let dots = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse position in canvas-local coordinates. Starts far off-screen
    // so dots render at rest (no displacement) before first movement.
    let mouseX = -9999;
    let mouseY = -9999;
    let rafId;

    const buildGrid = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const homeX = col * spacing;
          const homeY = row * spacing;
          dots.push({ homeX, homeY, x: homeX, y: homeY });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (const dot of dots) {
        const dx = dot.homeX - mouseX;
        const dy = dot.homeY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          // Push the dot away from the cursor; falloff is stronger
          // the closer the cursor is (eased with a squared curve).
          const falloff = 1 - dist / radius;
          const push = falloff * falloff * strength;
          const angle = Math.atan2(dy, dx);
          const targetX = dot.homeX + Math.cos(angle) * push;
          const targetY = dot.homeY + Math.sin(angle) * push;
          dot.x += (targetX - dot.x) * 0.2;
          dot.y += (targetY - dot.y) * 0.2;
        } else {
          // Ease back home once out of range.
          dot.x += (dot.homeX - dot.x) * 0.12;
          dot.y += (dot.homeY - dot.y) * 0.12;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    buildGrid();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", buildGrid);
    if (!isTouchDevice) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", buildGrid);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spacing, dotSize, radius, strength, color]);

  return (
    <div ref={containerRef} className="cursor-dot-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}