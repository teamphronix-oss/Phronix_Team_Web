/* ─────────────────────────────────────────────────────────────
   Illustrated gradient icon set for the "AI capabilities" grid.
   Each icon is a small self-contained SVG using a shared blue→
   purple gradient + soft glow, so they read as a matched set
   (mirrors the colorful icon style used elsewhere in the brand).
   ───────────────────────────────────────────────────────────── */

let uid = 0;
/* Every icon needs its own gradient id (SVG ids must be unique
   per-document), so we mint one per mounted instance. */
function useGradientId(prefix) {
  uid += 1;
  return `${prefix}-${uid}`;
}

function IconShell({ size = 32, children, gradId, from = "#38bdf8", to = "#a78bfa", className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 0 6px ${from}55)` }}
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

/* 1. AI Chatbots — speech bubble with an orbiting "reply" dot ---- */
export function IconAiChatbots(props) {
  const id = useGradientId("chat");
  return (
    <IconShell gradId={id} {...props}>
      <path
        d="M6 12a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5h-7l-5 4v-4.3A5 5 0 0 1 6 18v-6Z"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14.5" r="1.4" fill={`url(#${id})`} />
      <circle cx="17" cy="14.5" r="1.4" fill={`url(#${id})`} />
      <circle cx="22" cy="14.5" r="1.4" fill={`url(#${id})`} />
      <path d="M25 24a6 6 0 1 0 6 6" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <circle cx="29" cy="26" r="4" fill="#050914" stroke={`url(#${id})`} strokeWidth="1.8" />
      <circle cx="29" cy="26" r="1.3" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 2. AI Assistants — friendly robot head with a Saturn-style ring - */
export function IconAiAssistants(props) {
  const id = useGradientId("asst");
  return (
    <IconShell gradId={id} {...props}>
      <ellipse cx="20" cy="21" rx="15.5" ry="6" stroke={`url(#${id})`} strokeWidth="1.5" opacity="0.5" transform="rotate(-8 20 21)" />
      <rect x="11" y="12" width="18" height="15" rx="7" stroke={`url(#${id})`} strokeWidth="2" />
      <circle cx="16.5" cy="19.5" r="1.7" fill={`url(#${id})`} />
      <circle cx="23.5" cy="19.5" r="1.7" fill={`url(#${id})`} />
      <path d="M17 24.5c1.6 1.2 4.4 1.2 6 0" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 12V8" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="6.5" r="1.8" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 3. AI Agents — a brain silhouette built from a node network ---- */
export function IconAiAgents(props) {
  const id = useGradientId("agent");
  /* Organic brain-profile outline (two lobes + a folded underside),
     traced to sit inside the 40x40 viewBox like the reference mark. */
  const outline =
    "M15 8c-3-1-6 1-6 4-2 1-3 3-2 5-2 2-2 5 1 6-1 3 1 6 4 6 " +
    "0 2 2 4 4 4 1 1 3 1 4 0 3 1 6-1 6-4 3-1 5-4 3-6 2-2 2-5 0-6 " +
    "1-2 0-4-2-5 0-2-2-4-4-4-1-1-3-1-4 0-2-1-5-1-6 0Z";
  const nodes = [
    [14, 11], [23, 10], [9, 16], [19, 15], [29, 15],
    [12, 22], [20, 22], [27, 21], [16, 28], [24, 28],
  ];
  const edges = [
    [0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [3, 4],
    [2, 5], [3, 6], [4, 7], [5, 6], [6, 7], [5, 8],
    [6, 8], [6, 9], [7, 9], [8, 9],
  ];
  return (
    <IconShell gradId={id} {...props}>
      <path d={outline} stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round" opacity="0.5" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={`url(#${id})`}
          strokeWidth="1"
          opacity="0.65"
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill={`url(#${id})`} />
      ))}
    </IconShell>
  );
}

/* 4. AI Automation — a spinning gear firing off a bolt of speed -- */
export function IconAiAutomation(props) {
  const id = useGradientId("auto");
  return (
    <IconShell gradId={id} {...props}>
      <path d="M7 14h5M6 18h4M8 22h4" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <circle cx="23" cy="20" r="9.5" stroke={`url(#${id})`} strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 23 + Math.cos(angle) * 9.5;
        const y1 = 20 + Math.sin(angle) * 9.5;
        const x2 = 23 + Math.cos(angle) * 12.2;
        const y2 = 20 + Math.sin(angle) * 12.2;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
        );
      })}
      <path d="M25 14.5 19 21h4l-2 6.5 6.5-7.5h-4l1.5-5.5Z" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 5. Generative AI — magic wand casting sparkles ------------------ */
export function IconGenerativeAi(props) {
  const id = useGradientId("gen");
  return (
    <IconShell gradId={id} {...props}>
      <path d="M11 29 27 13" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <rect x="24.5" y="10.5" width="5" height="5" rx="1.2" transform="rotate(45 27 13)" fill="none" stroke={`url(#${id})`} strokeWidth="1.6" />
      <path d="M24 8.5l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" fill={`url(#${id})`} />
      <path d="M31 16.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z" fill={`url(#${id})`} />
      <path d="M11.5 22.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 6. Voice AI — audio waveform, dots between the bars -------------- */
export function IconVoiceAi(props) {
  const id = useGradientId("voice");
  const items = [
    { type: "dot" },
    { type: "bar", h: 7 },
    { type: "dot" },
    { type: "bar", h: 13 },
    { type: "dot" },
    { type: "bar", h: 20 },
    { type: "dot" },
    { type: "bar", h: 13 },
    { type: "dot" },
    { type: "bar", h: 7 },
    { type: "dot" },
  ];
  const startX = 7;
  const step = 2.8;
  return (
    <IconShell gradId={id} {...props}>
      {items.map((item, i) => {
        const x = startX + i * step;
        if (item.type === "dot") {
          return <circle key={i} cx={x} cy={20} r="1.1" fill={`url(#${id})`} />;
        }
        return (
          <rect
            key={i}
            x={x - 1}
            y={20 - item.h / 2}
            width="2"
            height={item.h}
            rx="1"
            fill={`url(#${id})`}
          />
        );
      })}
    </IconShell>
  );
}

/* 7. Document Intelligence — a document wired to circuit nodes ---- */
export function IconDocumentIntelligence(props) {
  const id = useGradientId("doc");
  return (
    <IconShell gradId={id} {...props}>
      <path d="M10 6h9l6 6v21a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 6v6h6" stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 20h6M12 24h9M12 28h9" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      {/* stepped circuit traces off the right edge, PCB-style */}
      <path d="M25 19h3v-3h4" stroke={`url(#${id})`} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M25 24h5" stroke={`url(#${id})`} strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
      <path d="M25 29h3v3h4" stroke={`url(#${id})`} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.85" />
      <circle cx="32" cy="16" r="1.5" fill={`url(#${id})`} />
      <circle cx="30" cy="24" r="1.5" fill={`url(#${id})`} />
      <circle cx="32" cy="32" r="1.5" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 8. Computer Vision — an eye framed like a camera viewfinder ----- */
export function IconComputerVision(props) {
  const id = useGradientId("vision");
  return (
    <IconShell gradId={id} {...props}>
      <path d="M9 12V8h5M31 12V8h-5M9 28v4h5M31 28v4h-5" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 20c4-6 8-8 12-8s8 2 12 8c-4 6-8 8-12 8s-8-2-12-8Z" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="3.4" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 9. AI Workflows — linked task nodes ------------------------------*/
export function IconAiWorkflows(props) {
  const id = useGradientId("flow");
  return (
    <IconShell gradId={id} {...props}>
      <rect x="7" y="10" width="9" height="9" rx="2.5" stroke={`url(#${id})`} strokeWidth="2" />
      <path d="M11.5 14.5l1.3 1.3 2.2-2.4" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29" cy="14.5" r="4.5" stroke={`url(#${id})`} strokeWidth="2" />
      <circle cx="29" cy="14.5" r="1.4" fill={`url(#${id})`} />
      <rect x="10" y="23" width="9" height="9" rx="2.5" stroke={`url(#${id})`} strokeWidth="2" />
      <path d="M14.5 26v3M13 27.5h3" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 19v2.5a3.5 3.5 0 0 0 3.5 3.5H25" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M25 27.5v-6A3.5 3.5 0 0 0 21.5 18H16" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="26.5" cy="27.5" r="1.6" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 10. AI Data Analysis — a rising bar chart -------------------------*/
export function IconAiDataAnalysis(props) {
  const id = useGradientId("data");
  const bars = [
    { x: 9, h: 8 },
    { x: 15, h: 16 },
    { x: 21, h: 11 },
    { x: 27, h: 19 },
  ];
  return (
    <IconShell gradId={id} {...props}>
      <ellipse cx="20" cy="31" rx="14" ry="2.4" stroke={`url(#${id})`} strokeWidth="1.3" opacity="0.5" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={28 - b.h} width="4.4" height={b.h} rx="1.4" fill={`url(#${id})`} />
      ))}
    </IconShell>
  );
}

/* 11. Predictive Analytics — a trend line converging on a target ---*/
export function IconPredictiveAnalytics(props) {
  const id = useGradientId("predict");
  return (
    <IconShell gradId={id} {...props}>
      <path d="M8 26l6-7 5 4 9-11" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="1 4.2" />
      <path d="M23 12h5v5" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="28" cy="26" r="5" stroke={`url(#${id})`} strokeWidth="1.6" />
      <circle cx="28" cy="26" r="2.6" stroke={`url(#${id})`} strokeWidth="1.4" />
      <circle cx="28" cy="26" r="1" fill={`url(#${id})`} />
    </IconShell>
  );
}

/* 12. AI Personalization — a person at the centre of an orbit ------*/
export function IconAiPersonalization(props) {
  const id = useGradientId("persona");
  return (
    <IconShell gradId={id} {...props}>
      <circle cx="20" cy="20" r="13.5" stroke={`url(#${id})`} strokeWidth="1.6" strokeDasharray="1.5 3.4" opacity="0.7" />
      <circle cx="34" cy="20" r="1.4" fill={`url(#${id})`} />
      <circle cx="6" cy="20" r="1.4" fill={`url(#${id})`} />
      <circle cx="20" cy="16.5" r="4.5" stroke={`url(#${id})`} strokeWidth="2" />
      <path d="M11 30c1.7-4.8 5.2-7 9-7s7.3 2.2 9 7" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
    </IconShell>
  );
}