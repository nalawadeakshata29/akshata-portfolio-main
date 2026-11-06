"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function VelocityMarquee({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const track = el?.querySelector<HTMLElement>("[data-track]");
      if (!el || !track) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        let x = 0;
        let dir = 1;
        let boost = 0;
        let active = false;
        const wrap = gsap.utils.wrap(-50, 0);
        const setX = gsap.quickSetter(track, "xPercent");

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (s) => {
            active = s.isActive;
          },
          onUpdate: (s) => {
            dir = s.direction;
            boost = gsap.utils.clamp(0, 8, Math.abs(s.getVelocity()) / 300);
          },
        });

        const tick = () => {
          if (!active) return;
          boost *= 0.92;
          x = wrap(x - ((2 + boost) * dir * gsap.ticker.deltaRatio(60)) / 60);
          setX(x);
        };
        gsap.ticker.add(tick);

        return () => {
          gsap.ticker.remove(tick);
          st.kill();
        };
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`overflow-hidden ${className ?? ""}`}
    >
      <div data-track className="flex w-max will-change-transform">
        {children}
      </div>
    </div>
  );
}
