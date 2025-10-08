import React, { useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";

type Segment = {
  label: string;
  value: number;
  weight: number;   // controls arc size & probability
  color: string;
};

const DEFAULTS: Segment[] = [
  { label: "0x",   value: 0,   weight: 28, color: "#3B82F6" },
  { label: "0.5x", value: 0.5, weight: 18, color: "#7C3AED" },
  { label: "1x",   value: 1,   weight: 16, color: "#8B5CF6" },
  { label: "2x",   value: 2,   weight: 12, color: "#A78BFA" },
  { label: "5x",   value: 5,   weight: 10, color: "#F472B6" },
  { label: "10x",  value: 10,  weight: 8,  color: "#F59E0B" },
  { label: "20x",  value: 20,  weight: 8,  color: "#FACC15" },
  { label: "50x",  value: 50,  weight: 6,  color: "#FDBA2D" },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const pickWeighted = <T extends { weight: number }>(arr: T[]) => {
  const total = arr.reduce((s, a) => s + a.weight, 0);
  let r = Math.random() * total;
  for (const it of arr) {
    r -= it.weight;
    if (r <= 0) return it;
  }
  return arr[arr.length - 1];
};

type Props = {
  size?: number;
  segments?: Segment[];
  onResult?: (s: Segment) => void;
  spinLabel?: string;
  isSpinning?: boolean;
  lastResult?: number;
};

export interface BetterWheelRef {
  spin: () => void;
}

const BetterWheel = forwardRef<BetterWheelRef, Props>(({
  size = 360,
  segments = DEFAULTS,
  onResult,
  spinLabel = "SPIN FOR $1",
  isSpinning = false,
  lastResult,
}, ref) => {
  const pad = 14;
  const r = (size - pad * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // build weighted arcs (clockwise, pointer at 0°/top)
  const arcs = useMemo(() => {
    const total = segments.reduce((s, x) => s + x.weight, 0);
    const out: { start: number; mid: number; end: number; sweep: number }[] = [];
    let acc = 0;
    for (const s of segments) {
      const sweep = (s.weight / total) * 360;
      const start = acc;
      const mid = start + sweep / 2;
      const end = start + sweep;
      out.push({ start, mid, end, sweep });
      acc = end;
    }
    return out;
  }, [segments]);

  // SVG paths for variable slices
  const paths = useMemo(() => {
    const toRad = (d: number) => (Math.PI / 180) * (d - 90);
    return arcs.map((a) => {
      const a1 = toRad(a.start);
      const a2 = toRad(a.end);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const x2 = cx + r * Math.cos(a2);
      const y2 = cy + r * Math.sin(a2);
      const largeArc = a.sweep > 180 ? 1 : 0;
      return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    });
  }, [arcs, cx, cy, r]);

  // only the <g> with slices rotates
  const [rot, setRot] = useState(0);
  const pointerRef = useRef<SVGPolygonElement | null>(null);
  const lastIdx = useRef(-1);

  const wobblePointer = () => {
    const el = pointerRef.current;
    if (!el) return;
    // tiny wobble; the pointer never rotates otherwise
    (el as any).animate?.(
      [
        { transform: "translate(0,0)" },
        { transform: "translate(-1px,1px)" },
        { transform: "translate(0,0)" },
      ],
      { duration: 100, easing: "ease-out" }
    );
  };

  // find slice index under pointer for a rotation angle
  const indexAt = (deg: number) => {
    const norm = ((deg % 360) + 360) % 360; // 0..359
    for (let i = 0; i < arcs.length; i++) {
      const a = arcs[i];
      if (norm >= a.start && norm < a.end) return i;
    }
    return arcs.length - 1;
  };

  const spin = () => {
    if (isSpinning) return;
    const target = pickWeighted(segments);
    const idx = segments.indexOf(target);

    // Always start from current position and do full spins
    const spins = 5 + Math.floor(Math.random() * 2); // 5–6 turns
    const final = rot + spins * 360 + (360 - arcs[idx].mid);

    lastIdx.current = -1;

    const t0 = performance.now();
    const dur = 4200 + Math.random() * 600;

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = easeOutCubic(t);
      const cur = rot + (final - rot) * eased;

      const idxNow = indexAt(((360 - cur) + 360) % 360);
      if (idxNow !== lastIdx.current) {
        wobblePointer();
        lastIdx.current = idxNow;
      }

      setRot(cur);
      if (t < 1) requestAnimationFrame(step);
      else {
        // Calculate the final result based on where the wheel actually stopped
        const finalAngle = ((360 - final) + 360) % 360;
        const finalIdx = indexAt(finalAngle);
        const finalResult = segments[finalIdx];
        onResult?.(finalResult);
      }
    };
    requestAnimationFrame(step);
  };

  useImperativeHandle(ref, () => ({
    spin,
  }));

  // helper: font size clamps per sweep (keeps narrow slices tidy)
  const fontForSweep = (sweep: number) =>
    Math.max(12, Math.min(20, (sweep / 360) * 160)); // tune if needed

  return (
    <div style={{ width: size, position: "relative", userSelect: "none" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* soft rim (brand-friendly, no black) */}
        <circle cx={cx} cy={cy} r={r + 10} fill="rgba(255,255,255,.28)" />
        <circle cx={cx} cy={cy} r={r + 4} fill="rgba(255,255,255,.40)" />

        {/* POINTER — a down-facing triangle that NEVER rotates */}
        <polygon
          ref={pointerRef}
          points={`${cx},${cy - r - 2} ${cx - 12},${cy - r - 22} ${cx + 12},${cy - r - 22}`}
          fill="#fff"
          style={{ filter: "drop-shadow(0 4px 4px rgba(0,0,0,.35))" }}
        />
        {/* small dark notch under pointer */}
        <rect
          x={cx - 8}
          y={cy - r - 16}
          width={16}
          height={6}
          rx={3}
          fill="#111827"
        />

        {/* ROTATING SLICES ONLY */}
        <g transform={`rotate(${rot} ${cx} ${cy})`}>
          {paths.map((d, i) => (
            <g key={i}>
              <path d={d} fill={segments[i].color} opacity={0.96} />
              <path d={d.replace("Z", "")} fill="none" stroke="rgba(17,24,39,.35)" strokeWidth={1.2}/>
              {/* label at slice center, auto-size by sweep */}
              <text
                x={cx}
                y={cy - r * 0.72}
                transform={`rotate(${arcs[i].mid} ${cx} ${cy})`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontWeight={800}
                fontSize={fontForSweep(arcs[i].sweep)}
                style={{ fontFamily: "Inter, system-ui", textShadow: "0 2px 6px rgba(0,0,0,.35)" }}
              >
                {segments[i].label}
              </text>
            </g>
          ))}
        </g>

        {/* static hub (subtle) */}
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r * 0.26} fill="url(#hub)" />
      </svg>

      {/* center button (never rotates) - shows status */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: r * 0.9,
          maxWidth: 220,
          height: 48,
          borderRadius: 999,
          border: "2px solid rgba(255,255,255,.85)",
          background: "linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.08))",
          color: "#fff",
          fontWeight: 800,
          letterSpacing: 0.4,
          backdropFilter: "blur(6px)",
          boxShadow: "0 10px 20px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        {isSpinning ? (
          <div>
            <div>SPINNING...</div>
            <div style={{ fontSize: "10px", opacity: 0.7 }}>Good luck!</div>
          </div>
        ) : lastResult !== undefined ? (
          <div>
            <div style={{ color: "#FDE047", fontSize: "16px", fontWeight: 900 }}>
              ${(lastResult * 1).toFixed(2)}
            </div>
            <div style={{ fontSize: "10px", opacity: 0.7 }}>
              {lastResult === 0 ? "Try again!" : "You won!"}
            </div>
          </div>
        ) : (
          <div>
            <div>WHEEL OF</div>
            <div>FORTUNE</div>
          </div>
        )}
      </div>
    </div>
  );
});

BetterWheel.displayName = 'BetterWheel';

export default BetterWheel;