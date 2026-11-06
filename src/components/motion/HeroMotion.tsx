"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

export function HeroMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const pinEl = root.querySelector("[data-hero-pin]");
      const mm = gsap.matchMedia();

      mm.add(MQ.heroPin, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: "+=60%",
            pin: true,
            scrub: true,
            refreshPriority: 1,
          },
        });
        tl.fromTo(
          "[data-hero-title]",
          { scale: 1, yPercent: 0, opacity: 1, transformOrigin: "50% 100%" },
          { scale: 0.86, yPercent: -18, opacity: 0.12 },
          0,
        )
          .fromTo(
            "[data-hero-orb-scroll]",
            { yPercent: 0, scale: 1 },
            { yPercent: -28, scale: 1.18 },
            0,
          )
          .fromTo(
            "[data-hero-fade]",
            { opacity: 1, y: 0 },
            { opacity: 0, y: -24 },
            0,
          )
          .fromTo(
            "[data-hero-chip]",
            { opacity: 1 },
            { opacity: 0, stagger: 0.04 },
            0,
          );
      });

      mm.add(MQ.mobile, () => {
        gsap.fromTo(
          "[data-hero-orb-scroll]",
          { yPercent: 0 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      mm.add(MQ.pointer, () => {
        const orbX = gsap.quickTo("[data-hero-orb-pointer]", "x", {
          duration: 0.8,
          ease: "power3",
        });
        const orbY = gsap.quickTo("[data-hero-orb-pointer]", "y", {
          duration: 0.8,
          ease: "power3",
        });
        const lightX = gsap.quickTo("[data-orb-light]", "x", {
          duration: 0.8,
          ease: "power3",
        });
        const lightY = gsap.quickTo("[data-orb-light]", "y", {
          duration: 0.8,
          ease: "power3",
        });
        // Floating tags drift further than the photo, by their data-depth.
        const depth = gsap.utils
          .toArray<HTMLElement>("[data-depth]")
          .map((el) => ({
            d: parseFloat(el.dataset.depth ?? "1"),
            x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }),
            y: gsap.quickTo(el, "y", { duration: 1, ease: "power3" }),
          }));
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
          orbX(nx * 16);
          orbY(ny * 16);
          lightX(nx * -10);
          lightY(ny * -10);
          for (const m of depth) {
            m.x(nx * 10 * m.d);
            m.y(ny * 10 * m.d);
          }
        };
        root.addEventListener("pointermove", onMove);
        return () => root.removeEventListener("pointermove", onMove);
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <div data-hero-pin>{children}</div>
    </div>
  );
}
