"use client";

import { useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

export function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const p = el?.querySelector<HTMLElement>("[data-words]");
      if (!el || !p) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const split = SplitText.create(p, { type: "words", aria: "none" });
        gsap.fromTo(
          split.words,
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <p className="sr-only">{text}</p>
      <p aria-hidden="true" data-words className={className}>
        {text}
      </p>
    </div>
  );
}
