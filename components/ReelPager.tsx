"use client";
import React, { useMemo, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";

type Reel = { id: string; render: () => React.ReactNode; };

type Props = {
  items: Reel[];
  initialIndex?: number;
  rubberBand?: boolean;
  onIndexChange?: (i: number) => void;
  minSwipeDistance?: number;
  minSwipeVelocity?: number; // px/s
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(n, b));

export default function ReelPager({
  items, initialIndex = 0, rubberBand = true, onIndexChange,
  minSwipeDistance = 80, minSwipeVelocity = 800,
}: Props) {
  const [index, setIndex] = useState(() => clamp(initialIndex, 0, items.length - 1));
  const y = useMotionValue(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const windowed = useMemo(() => {
    const start = clamp(index - 1, 0, items.length - 1);
    const end = clamp(index + 1, 0, items.length - 1);
    return Array.from({ length: end - start + 1 }, (_, k) => {
      const i = start + k;
      return { i, item: items[i] };
    });
  }, [index, items]);

  const H = () => viewportRef.current?.clientHeight || window.innerHeight || 0;

  const snapToIndex = useCallback((next: number) => {
    const controls = animate(y, 0, { type: "spring", stiffness: 420, damping: 36 });
    controls.then(() => {
      if (next !== index) { setIndex(next); onIndexChange?.(next); }
    });
  }, [index, onIndexChange, y]);

  const decideNextIndex = (offsetY: number, velocityY: number) => {
    const atTop = index === 0, atBottom = index === items.length - 1;
    const velPerSec = Math.abs(velocityY) * 1000;
    if (velPerSec > minSwipeVelocity) {
      if (offsetY < 0 && !atBottom) return index + 1;
      if (offsetY > 0 && !atTop) return index - 1;
      return index;
    }
    if (Math.abs(offsetY) > minSwipeDistance) {
      if (offsetY < 0 && !atBottom) return index + 1;
      if (offsetY > 0 && !atTop) return index - 1;
    }
    return index;
  };

  const onDragStart = () => { isDraggingRef.current = true; };
  const onDrag = (_: any, info: PanInfo) => {
    const atTop = index === 0, atBottom = index === items.length - 1;
    const next = y.get() + info.delta.y * (rubberBand && ((atTop && y.get() > 0) || (atBottom && y.get() < 0)) ? 0.35 : 1);
    y.set(next);
  };
  const onDragEnd = (_: any, info: PanInfo) => {
    isDraggingRef.current = false;
    const next = decideNextIndex(y.get(), info.velocity.y);
    snapToIndex(next);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (isDraggingRef.current) return;
    const deltaY = e.deltaY, h = H();
    if (Math.abs(deltaY) > h * 0.15) {
      if (deltaY > 0 && index < items.length - 1) setIndex(i => i + 1);
      else if (deltaY < 0 && index > 0) setIndex(i => i - 1);
      return;
    }
    y.set(y.get() - deltaY);
    window.clearTimeout((onWheel as any)._t);
    (onWheel as any)._t = window.setTimeout(() => snapToIndex(index), 90);
  };

  return (
    <div
      ref={viewportRef}
      className="relative h-app w-full overflow-hidden no-overscroll"
      style={{ touchAction: "none", contain: "layout paint size" }}
      onWheel={onWheel}
    >
      {windowed.map(({ i, item }) => {
        const pos = i - index;
        const baseY = pos * (viewportRef.current?.clientHeight || window.innerHeight || 0);
        return (
          <motion.div key={item.id} className="absolute inset-0 will-change-transform" style={{ transform: `translate3d(0, ${baseY}px, 0)` }}>
            <motion.div
              drag={pos === 0 ? "y" : false}
              dragElastic={rubberBand ? 0.2 : 0}
              dragConstraints={{ top: -Infinity, bottom: Infinity }}
              style={{ y: pos === 0 ? y : 0 }}
              onDragStart={onDragStart}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
              className="h-app w-full"
            >
              {item.render()}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
