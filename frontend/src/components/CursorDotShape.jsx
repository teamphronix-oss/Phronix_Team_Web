import { useEffect, useRef, useState } from "react";

/* Renders a source image (logo, icon, illustration — anything with
   transparency) as a grid of small dots that only appear where the
   image is opaque ("halftone" style), matching lamalama.com's shape
   made of dots. Dots near the cursor scatter away and ease back once
   the cursor moves off, same spring-style repulsion as a plain
   dot-field background.

   Usage:
     <CursorDotShape src="/assets/your-shape.png" width={480} height={280} />

   The source image should have a transparent background and a
   solid/white silhouette — that silhouette is what gets "dotted". */
export default function CursorDotShape({
  src,
  width = 480,
  height = 280,
  spacing = 8,       // sampling grid gap, px — smaller = denser dots
  dotSize = 2,          // resting dot radius, px
  radius = 90,           // cursor influence reach, px
  strength = 26,           // max scatter distance at cursor center, px
  color = "rgba(255,255,255,0.9)",
  threshold = 128,           // alpha (0-255) above which a pixel counts as "filled"
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const dotsHomeRef = useRef([]);

  // Step 1: load the image and sample it into a sparse dot grid,
  // keeping only points that land on an opaque part of the source.
  useEffect(() => {
    if (!src) return;
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = width;
      sampleCanvas.height = height;
      const sctx = sampleCanvas.getContext("2d");
      sctx.drawImage(img, 0, 0, width, height);
      const { data } = sctx.getImageData(0, 0, width, height);

      const points = [];
      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          const idx = (y * width + x) * 4;
          const alpha = data[idx + 3];
          if (alpha > threshold) {
            points.push({ homeX: x, homeY: y, x, y });
          }
        }
      }
      dotsHomeRef.current = points;
      setReady(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, width, height, spacing, threshold]);

  // Step 2: animate — same repulsion/ease-back behaviour as the
  // full-background dot field, just scoped to this shape's points.
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (const dot of dotsHomeRef.current) {
        const dx = dot.homeX - mouseX;
        const dy = dot.homeY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const falloff = 1 - dist / radius;
          const push = falloff * falloff * strength;
          const angle = Math.atan2(dy, dx);
          const targetX = dot.homeX + Math.cos(angle) * push;
          const targetY = dot.homeY + Math.sin(angle) * push;
          dot.x += (targetX - dot.x) * 0.2;
          dot.y += (targetY - dot.y) * 0.2;
        } else {
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

    rafId = requestAnimationFrame(draw);
    if (!isTouchDevice) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ready, width, height, dotSize, radius, strength, color]);

  return (
    <div
      ref={containerRef}
      className="cursor-dot-shape"
      style={{ width, height }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
