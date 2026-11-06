"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    const tick = (t: number) => {
      lenisRef.current?.lenis?.raf(t * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.fonts.ready.then(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, anchors: true }}
      ref={lenisRef}
    />
  );
}
