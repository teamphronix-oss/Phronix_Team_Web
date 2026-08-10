import { useEffect, useRef } from "react";

/* Cursor trail — a chain of soft circular "blobs" made of dots that
   spawn as the mouse moves and shrink/fade out behind it, leaving a
   string of halftone circles trailing the cursor (the lamalama.com
   "beads following the mouse" effect).

   Fixed full-viewport canvas overlay, pointer-events: none, so it
   sits above all page content without blocking clicks. Mount it once
   near the root (e.g. in App.jsx alongside CustomCursor) so the trail
   works across the whole site, not just one section. */
export default function CursorTrailBlobs({
  maxBlobs = 9,          // how many blobs stay alive in the trail at once
  spawnDistance = 42,      // min px the mouse must move before a new blob spawns
  startRadius = 34,          // radius (px) of a freshly spawned blob
  dotCount = 55,               // dots per blob
  lifespan = 650,                // ms a blob lives before fully gone
  color = "255,255,255",           // r,g,b used for dot fill (opacity added per-dot)
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Each blob keeps its own fixed dot pattern (angle + distance from
    // center, sampled once at spawn) so the halftone texture stays
    // consistent as it shrinks, rather than re-randomizing every frame.
    const makeDotPattern = () =>
      Array.from({ length: dotCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        // sqrt bias so dots distribute evenly across the disk area,
        // not clumped toward the center.
        const dist = Math.sqrt(Math.random());
        return { angle, dist, size: 1 + Math.random() * 1.4 };
      });

    let blobs = [];
    let lastX = null;
    let lastY = null;
    let rafId;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastX === null) {
        lastX = x;
        lastY = y;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      if (Math.sqrt(dx * dx + dy * dy) >= spawnDistance) {
        blobs.push({
          x,
          y,
          bornAt: performance.now(),
          pattern: makeDotPattern(),
        });
        if (blobs.length > maxBlobs) blobs.shift();
        lastX = x;
        lastY = y;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      blobs = blobs.filter((b) => now - b.bornAt < lifespan);

      for (const blob of blobs) {
        const age = (now - blob.bornAt) / lifespan; // 0 → 1
        const eased = 1 - Math.pow(1 - age, 2); // ease-out for shrink/fade
        const radius = startRadius * (1 - eased);
        const opacity = 1 - eased;
        if (radius <= 0.5) continue;

        for (const dot of blob.pattern) {
          const dx = Math.cos(dot.angle) * dot.dist * radius;
          const dy = Math.sin(dot.angle) * dot.dist * radius;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${color},${(0.15 + dot.dist * 0.1) * opacity})`;
          ctx.arc(blob.x + dx, blob.y + dy, dot.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [maxBlobs, spawnDistance, startRadius, dotCount, lifespan, color]);

  return <canvas ref={canvasRef} className="cursor-trail-blobs" aria-hidden="true" />;
}
