"use client";

import { useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

export function TitleReveal({
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
      if (!el) return;
      const heading = el.querySelector("h2");
      const eyebrows = el.querySelectorAll("[data-eyebrow]");
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const trigger = { trigger: el, start: "top 85%", once: true };
        if (heading) {
          SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.lines,
                { yPercent: 105 },
                {
                  yPercent: 0,
                  duration: 1,
                  ease: "expo.out",
                  stagger: 0.08,
                  scrollTrigger: trigger,
                },
              ),
          });
        }
        if (eyebrows.length) {
          gsap.fromTo(
            eyebrows,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { ...trigger },
            },
          );
        }
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
