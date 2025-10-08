import React, { useMemo, useRef, useState } from "react";

/** Each segment can set a weight (visual width + probability) */
type Segment = {
  label: string;   // e.g. "50x"
  value: number;   // 50
  weight: number;  // higher = bigger slice + more likely
  color: string;   // slice color
};

const SEGMENTS: Segment[] = [
  { label: "0x",   value: 0,   weight: 28, color: "#3B82F6" },
  { label: "0.5x", value: 0.5, weight: 18, color: "#7C3AED" },
  { label: "1x",   value: 1,   weight: 16, color: "#8B5CF6" },
  { label: "2x",   value: 2,   weight: 12, color: "#A78BFA" },
  { label: "5x",   value: 5,   weight: 10, color: "#F472B6" },
  { label: "10x",  value: 10,  weight: 8,  color: "#F59E0B" },
  { label: "20x",  value: 20,  weight: 5,  color: "#FACC15" },
  { label: "50x",  value: 50,  weight: 3,  color: "#FDBA2D" },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function pickWeighted<T extends { weight: number }>(arr: T[]) {
  const total = arr.reduce((s, a) => s + a.weight, 0);
  let r = Math.random() * total;
  for (const item of arr) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return arr[arr.length - 1];
}

type Props = {
  size?: number;
  segments?: Segment[];
  onResult?: (s: Segment) => void;
  spinCostLabel?: string;
};

export default function Wheel({
  size = 360,
  segments = SEGMENTS,
  onResult,
  spinCostLabel = "SPIN FOR $1",
}: Props) {
  // geometry
  const pad = 14;
  const r = (size - pad * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // precompute angles from weights (bigger weight = bigger arc)
  const { arcs, totalWeight } = useMemo(() => {
    const total = segments.reduce((s, x) => s + x.weight, 0);
    const arcs = [];
    let acc = 0;
    for (const s of segments) {
      const sweep = (s.weight / total) * 360;
      const start = acc;           // degrees, 0 = pointer/top
      const mid = start + sweep / 2;
      const end = start + sweep;
      arcs.push({ start, mid, end, sweep });
      acc = end;
    }
    return { arcs, totalWeight: total };
  }, [segments]);

  // paths with variable sweep
  const paths = useMemo(() => {
    const toRad = (d: number) => (Math.PI / 180) * (d - 90); // SVG 0deg at 3 o'clock → shift by -90
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

  // state
  const [angle, setAngle] = useState(0);      // we rotate a wrapper div → no wobble
  const [spinning, setSpinning] = useState(false);
  const pointerRef = useRef<HTMLDivElement>(null);
  const lastTick = useRef(-1);

  // tick wobble on pointer
  const wobblePointer = () => {
    const el = pointerRef.current;
    if (!el) return;
    el.animate(
      [
        { transform: "translateX(-50%) rotate(0deg)" },
        { transform: "translateX(-50%) rotate(-5deg)" },
        { transform: "translateX(-50%) rotate(0deg)" },
      ],
      { duration: 90, easing: "ease-out" }
    );
  };

  // get index under pointer for a given rotation
  const indexAtAngle = (deg: number) => {
    const norm = ((deg % 360) + 360) % 360; // 0..359
    // when wheel rotated by 'deg', the slice under pointer is the one whose [start,end) contains 'norm'
    // pointer is at 0deg; slices are laid clockwise from 0→360
    for (let i = 0; i < arcs.length; i++) {
      const { start, end } = arcs[i];
      if (norm >= start && norm < end) return i;
    }
    return arcs.length - 1;
  };

  const spin = () => {
    if (spinning) return;

    // pick a result with same weights as the slices
    const target = pickWeighted(segments);
    const idx = segments.indexOf(target);

    // we want the wheel to stop so that the pointer (0deg) hits the slice's center.
    // That means the wheel's rotation modulo 360 must equal the slice's 'mid' angle.
    const targetMid = arcs[idx].mid;
    const base = ((angle % 360) + 360) % 360;
    const spins = 5 + Math.floor(Math.random() * 2);       // 5–6 full spins
    const final = base + spins * 360 + (targetMid - base); // lands exactly on mid

    setSpinning(true);
    lastTick.current = -1;

    const t0 = performance.now();
    const dur = 4200 + Math.random() * 600;

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = easeOutCubic(t);
      const current = angle + (final - angle) * eased;

      // fire tick when crossing any slice boundary
      const idxNow = indexAtAngle(((360 - current) + 360) % 360);
      if (idxNow !== lastTick.current) {
        wobblePointer();
        lastTick.current = idxNow;
      }

      setAngle(current);
      if (t < 1) requestAnimationFrame(step);
      else {
        setSpinning(false);
        onResult?.(target);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div style={{ width: size, position: "relative", userSelect: "none" }}>
      {/* pointer (white ▼) */}
      <div
        ref={pointerRef}
        style={{
          position: "absolute",
          top: 6,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          width: 0,
          height: 0,
          borderLeft: "14px solid transparent",
          borderRight: "14px solid transparent",
          borderBottom: "18px solid #fff",
          filter: "drop-shadow(0 6px 6px rgba(0,0,0,.25))",
        }}
      >
        {/* small black notch */}
        <div
          style={{
            position: "absolute",
            left: -8,
            top: 10,
            width: 16,
            height: 6,
            borderRadius: 3,
            background: "#111827",
          }}
        />
      </div>

      {/* wheel wrapper (rotates — no SVG wobble) */}
      <div
        style={{
          width: size,
          height: size,
          transform: `rotate(${angle}deg)`,
          transition: spinning ? "none" : "transform .2s ease-out",
          filter: "drop-shadow(0 12px 30px rgba(0,0,0,.35))",
          borderRadius: "50%",
          position: "relative",
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* soft rim (no black ring) */}
          <circle cx={cx} cy={cy} r={r + 10} fill="rgba(255,255,255,.28)" />
          <circle cx={cx} cy={cy} r={r + 4} fill="rgba(255,255,255,.40)" />
          <circle cx={cx} cy={cy} r={r} fill="#0e0e1a" opacity={0.04} />

          {paths.map((d, i) => (
            <g key={i}>
              <path d={d} fill={segments[i].color} opacity={0.96} />
              {/* divider */}
              <path d={d.replace("Z", "")} fill="none" stroke="rgba(17,24,39,.35)" strokeWidth={1.4}/>
              {/* label upright at slice center */}
              <text
                x={cx}
                y={cy - r * 0.72}
                transform={`rotate(${arcs[i].mid} ${cx} ${cy})`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontWeight={800}
                fontSize={18}
                style={{ textShadow: "0 2px 6px rgba(0,0,0,.35)", fontFamily: "Inter, system-ui" }}
              >
                {segments[i].label}
              </text>
            </g>
          ))}

          {/* hub */}
          <circle cx={cx} cy={cy} r={r * 0.26} fill="#0B1020" />
          <defs>
            <radialGradient id="hubglow">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r * 0.26} fill="url(#hubglow)" opacity={0.6} />
        </svg>

        {/* center button */}
        <button
          onClick={spin}
          disabled={spinning}
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
            cursor: spinning ? "default" : "pointer",
          }}
        >
          {spinning ? "GOOD LUCK…" : spinCostLabel}
        </button>
      </div>
    </div>
  );
}