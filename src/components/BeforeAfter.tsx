"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Comparison } from "@/content/profile";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Labels = {
  before: string;
  after: string;
  dragHint: string;
  sliderLabel: string;
  pairsLabel: string;
};

export function BeforeAfter({
  pairs,
  sizes,
  labels,
  hint = false,
  className,
}: {
  pairs: Comparison[];
  sizes: string;
  labels: Labels;
  hint?: boolean;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hintTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!hint) return;
      const el = frameRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const o = { v: 50 };
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          once: true,
          onEnter: () => {
            hintTween.current = gsap.to(o, {
              v: 32,
              yoyo: true,
              repeat: 1,
              duration: 0.7,
              ease: "power2.inOut",
              onUpdate: () => setPos(Math.round(o.v)),
            });
          },
        });
        return () => {
          st.kill();
          hintTween.current?.kill();
        };
      });
    },
    { scope: frameRef },
  );

  const pair = pairs[active];
  if (!pair) return null;

  const setFromX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.round(Math.min(100, Math.max(0, p))));
  };
  const stopHint = () => hintTween.current?.kill();

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className="relative cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl border border-line bg-ink select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-pink"
        style={{
          aspectRatio: `${pair.after.width} / ${pair.after.height}`,
        }}
        onPointerDown={(e) => {
          stopHint();
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={pair.before.src}
            alt={pair.before.alt}
            fill
            sizes={sizes}
            draggable={false}
            className="object-cover"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-fog/90"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fog text-ink shadow-lg">
            ‹ ›
          </span>
        </div>

        <span className="text-label pointer-events-none absolute top-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 uppercase backdrop-blur">
          {labels.before}
        </span>
        <span className="text-label pointer-events-none absolute top-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 uppercase backdrop-blur">
          {labels.after}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          onFocus={stopHint}
          aria-label={labels.sliderLabel}
          aria-valuetext={`${pos}% ${labels.before}`}
          className="sr-only"
        />
      </div>

      {pairs.length > 1 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label={labels.pairsLabel}
            className="flex flex-wrap gap-2"
          >
            {pairs.map((p, i) => (
              <button
                key={p.label}
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  stopHint();
                  setActive(i);
                  setPos(50);
                }}
                className={`text-label rounded-full border px-3 py-1.5 uppercase transition-colors ${
                  i === active
                    ? "border-fog text-fog"
                    : "border-line text-ash hover:text-fog"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <span className="text-label text-ash uppercase">
            {labels.dragHint}
          </span>
        </div>
      )}
    </div>
  );
}
