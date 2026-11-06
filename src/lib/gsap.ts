import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  heroPin:
    "(min-width: 768px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  stack:
    "(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
  pointer:
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;
