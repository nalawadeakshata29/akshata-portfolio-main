import type { Project } from "@/content/profile";

type Kind = NonNullable<Project["visual"]>;

const NODE = "#141416";
const STROKE = "#3a3a40";
const BAR1 = "#3a3a40";
const BAR2 = "#2a2a2f";
const VIOLET = "#8b5cf6";
const PINK = "#f0509b";
const TANGERINE = "#fb8a3c";
const FOG = "#e7e7e9";

const ACCENT: Record<Kind, string> = {
  "chat-flow": "139 92 246",
  sign: "240 80 155",
  parlour: "251 138 60",
};

function Node({
  x,
  y,
  accent = false,
}: {
  x: number;
  y: number;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={112}
        height={40}
        rx={12}
        fill={accent ? "rgb(139 92 246 / 0.18)" : NODE}
        stroke={accent ? VIOLET : STROKE}
      />
      <rect x={x + 16} y={y + 13} width={56} height={5} rx={2.5} fill={BAR1} />
      <rect x={x + 16} y={y + 23} width={36} height={5} rx={2.5} fill={BAR2} />
    </g>
  );
}

function link(px: number, py: number, cx: number, cy: number) {
  const x1 = px + 56;
  const y1 = py + 40;
  const x2 = cx + 56;
  const y2 = cy;
  const m = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${m} ${x2} ${m} ${x2} ${y2}`;
}

function ChatFlow() {
  const root = [264, 40] as const;
  const kids = [
    [88, 150],
    [264, 150],
    [440, 150],
  ] as const;
  const leaves: {
    p: number;
    at: readonly [number, number];
    accent?: boolean;
  }[] = [
    { p: 0, at: [28, 268] },
    { p: 0, at: [148, 268] },
    { p: 1, at: [264, 268], accent: true },
    { p: 2, at: [380, 268] },
    { p: 2, at: [500, 268] },
  ];
  return (
    <>
      {kids.map((k, i) => (
        <path
          key={i}
          d={link(root[0], root[1], k[0], k[1])}
          fill="none"
          stroke={i === 1 ? VIOLET : STROKE}
          strokeWidth={i === 1 ? 2 : 1.5}
        />
      ))}
      {leaves.map((l, i) => (
        <path
          key={i}
          d={link(kids[l.p][0], kids[l.p][1], l.at[0], l.at[1])}
          fill="none"
          stroke={l.accent ? VIOLET : STROKE}
          strokeWidth={l.accent ? 2 : 1.5}
        />
      ))}
      <Node x={root[0]} y={root[1]} />
      {kids.map((k, i) => (
        <Node key={i} x={k[0]} y={k[1]} />
      ))}
      {leaves.map((l, i) => (
        <Node key={i} x={l.at[0]} y={l.at[1]} accent={l.accent} />
      ))}
    </>
  );
}

const WAVE = [
  16, 28, 44, 62, 40, 82, 118, 90, 58, 104, 136, 98, 70, 122, 86, 54, 96, 64,
  38, 72, 48, 30, 20, 12,
];

const HAND: [number, number][] = [
  [480, 350],
  [440, 325],
  [410, 292],
  [392, 258],
  [380, 228],
  [448, 250],
  [440, 195],
  [435, 160],
  [432, 128],
  [480, 244],
  [481, 185],
  [482, 145],
  [482, 108],
  [510, 250],
  [519, 198],
  [525, 162],
  [530, 130],
  [536, 266],
  [550, 228],
  [559, 200],
  [568, 176],
];

const BONES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
];

const TIPS = [4, 8, 12, 16, 20];

function Sign() {
  return (
    <>
      {WAVE.map((h, i) => (
        <rect
          key={i}
          x={48 + i * 10}
          y={200 - h / 2}
          width={5}
          height={h}
          rx={2.5}
          fill={i >= 9 && i <= 14 ? PINK : STROKE}
        />
      ))}
      <path
        d="M310 180 L330 200 L310 220"
        fill="none"
        stroke="#8e8e96"
        strokeWidth={2}
      />
      {BONES.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={HAND[a][0]}
          y1={HAND[a][1]}
          x2={HAND[b][0]}
          y2={HAND[b][1]}
          stroke={STROKE}
          strokeWidth={2}
        />
      ))}
      {HAND.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={TIPS.includes(i) ? 6 : 4}
          fill={TIPS.includes(i) ? PINK : FOG}
        />
      ))}
    </>
  );
}

function Parlour() {
  const cards = [
    [300, 96, PINK],
    [430, 96, VIOLET],
    [300, 212, TANGERINE],
    [430, 212, FOG],
  ] as const;
  return (
    <>
      <rect
        x={40}
        y={36}
        width={560}
        height={328}
        rx={18}
        fill={NODE}
        stroke="#26262a"
      />
      {[66, 84, 102].map((cx) => (
        <circle key={cx} cx={cx} cy={60} r={5} fill={STROKE} />
      ))}
      <rect x={130} y={52} width={200} height={16} rx={8} fill="#1b1b1e" />
      <path d="M147 200 L227 200 L187 290 Z" fill="#26262a" />
      <circle cx={160} cy={176} r={40} fill={TANGERINE} fillOpacity={0.85} />
      <circle cx={214} cy={176} r={40} fill={PINK} fillOpacity={0.7} />
      <circle cx={187} cy={134} r={40} fill={FOG} fillOpacity={0.85} />
      {cards.map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x}
            y={y}
            width={110}
            height={100}
            rx={12}
            fill="#1b1b1e"
            stroke="#26262a"
          />
          <circle cx={x + 24} cy={y + 30} r={14} fill={c} fillOpacity={0.85} />
          <rect
            x={x + 16}
            y={y + 62}
            width={70}
            height={6}
            rx={3}
            fill={BAR1}
          />
          <rect
            x={x + 16}
            y={y + 76}
            width={48}
            height={6}
            rx={3}
            fill={BAR2}
          />
        </g>
      ))}
      <rect
        x={300}
        y={326}
        width={240}
        height={8}
        rx={4}
        fill={TANGERINE}
        fillOpacity={0.6}
      />
    </>
  );
}

export function ProjectVisual({ kind, title }: { kind?: Kind; title: string }) {
  if (!kind) {
    return (
      <div className="text-h2 flex size-full items-center justify-center text-ash/30">
        {title.charAt(0)}
      </div>
    );
  }
  return (
    <div
      className="size-full"
      style={{
        backgroundImage: `radial-gradient(120% 80% at 70% 20%, rgb(${ACCENT[kind]} / 0.16), transparent 60%)`,
      }}
    >
      <svg viewBox="0 0 640 400" aria-hidden="true" className="size-full">
        {kind === "chat-flow" && <ChatFlow />}
        {kind === "sign" && <Sign />}
        {kind === "parlour" && <Parlour />}
      </svg>
    </div>
  );
}
