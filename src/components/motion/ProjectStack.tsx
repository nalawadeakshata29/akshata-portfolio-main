"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ProjectStack({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
      const mm = gsap.matchMedia();

      mm.add(MQ.stack, () => {
        cards.slice(0, -1).forEach((card, i) => {
          const next = cards[i + 1];
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => `top ${parseFloat(getComputedStyle(next).top)}px`,
              scrub: true,
            },
          });
          tl.fromTo(
            card.querySelector("[data-stack-inner]"),
            { scale: 1 },
            { scale: 0.92, transformOrigin: "50% 0%", ease: "none" },
            0,
          ).fromTo(
            card.querySelector("[data-stack-shade]"),
            { opacity: 0 },
            { opacity: 0.6, ease: "none" },
            0,
          );
        });
      });

      mm.add(MQ.mobile, () => {
        gsap.set(cards, { opacity: 0, y: 24 });
        ScrollTrigger.batch(cards, {
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
