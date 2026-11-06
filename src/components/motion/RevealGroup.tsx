"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function RevealGroup({
  className,
  as: Tag = "div",
  children,
}: {
  className?: string;
  as?: "div" | "ol" | "ul" | "dl";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set("[data-reveal]", { opacity: 0, y: 24 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
              },
            ),
        });
      });
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
