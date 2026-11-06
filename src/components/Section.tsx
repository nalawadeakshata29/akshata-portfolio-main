import { profile, ui } from "@/content/profile";
import { TitleReveal } from "./motion/TitleReveal";

export function Section({
  id,
  eyebrow,
  title,
  aside,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  aside?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section-y ${className ?? ""}`}
    >
      <div className="container-page">
        <TitleReveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <p
              data-eyebrow
              className="text-label text-ash uppercase sm:font-stretch-expanded"
            >
              {eyebrow}
            </p>
            <h2
              id={`${id}-heading`}
              className="text-h2 mt-3 text-fog uppercase"
            >
              {title}
            </h2>
          </div>
          {aside && (
            <p data-eyebrow className="text-label text-ash uppercase">
              {aside}
            </p>
          )}
        </TitleReveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-ash uppercase"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.1em] uppercase transition-colors hover:text-pink"
    >
      {children} <span aria-hidden>↗</span>
    </a>
  );
}

export function AvailabilityPill() {
  return (
    <p className="text-label inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 whitespace-nowrap text-fog/80 uppercase max-[420px]:text-[0.625rem] max-[420px]:tracking-[0.1em]">
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-live opacity-60" />
        <span className="relative size-2 rounded-full bg-live" />
      </span>
      {ui.availability} · Class of {profile.classOf}
    </p>
  );
}
