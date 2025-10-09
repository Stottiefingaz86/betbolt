"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

type Reel = { id: string; render: (active: boolean, reelId: string) => React.ReactNode; };

export default function ReelsSwiper({ items, onSlideChange, initialIndex = 0 }: { items: Reel[]; onSlideChange?: (index: number) => void; initialIndex?: number }) {
  const ref = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  
  return (
    <div className="h-app no-overscroll" style={{ touchAction: "pan-y" }}>
      <Swiper
        ref={ref}
        direction="vertical"
        slidesPerView={1}
        initialSlide={initialIndex}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
          thresholdDelta: 20,
          thresholdTime: 150
        }}
        resistanceRatio={0.35}
        speed={350}
        modules={[Mousewheel]}
        style={{ height: "100%" }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          onSlideChange?.(swiper.activeIndex);
        }}
      >
        {items.map((r, index) => (
          <SwiperSlide key={r.id}>
            <div className="h-app w-full">{r.render(index === activeIndex, r.id)}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

