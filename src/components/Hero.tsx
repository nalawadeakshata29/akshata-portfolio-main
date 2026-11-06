import Image from "next/image";
import { profile, projects, ui } from "@/content/profile";
import { HeroMotion } from "./motion/HeroMotion";
import { AvailabilityPill } from "./Section";

const AVATAR_SIZE = "size-[min(56vw,14rem)] sm:size-[clamp(12rem,22vw,21rem)]";

function Avatar() {
  if (profile.avatar) {
    // Profile picture: gradient "story" ring, glow behind, soft floor shadow below.
    return (
      <div className={`relative ${AVATAR_SIZE}`}>
        <div aria-hidden className="orb-glow" />
        <div className="dp-ring dp-float size-full">
          <div className="dp-photo">
            <Image
              src={profile.avatar}
              alt={`Portrait of ${profile.name.first} ${profile.name.last}`}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 640px) 22vw, 56vw"
              className="object-cover"
            />
            <div aria-hidden data-orb-light className="dp-sheen" />
          </div>
        </div>
        <div aria-hidden className="orb-floor" />
      </div>
    );
  }
  return (
    <div aria-hidden className={`relative ${AVATAR_SIZE}`}>
      <div className="orb-glow" />
      <div className="orb animate-float size-full">
        <div data-orb-light className="orb-light" />
      </div>
      <div className="orb-floor" />
    </div>
  );
}

// Where each floating tag sits around the photo on large screens, and how far it
// drifts with the pointer (data-depth).
const chipLayout = [
  { pos: "right-[calc(100%+1.25rem)] top-[14%]", tilt: "-rotate-6", dot: "bg-violet", depth: 1.4, delay: "[animation-delay:0s]" },
  { pos: "left-[calc(100%+1.5rem)] top-[40%]", tilt: "rotate-[5deg]", dot: "bg-pink", depth: 2, delay: "[animation-delay:-2.5s]" },
  { pos: "right-[calc(100%+0.25rem)] top-[72%]", tilt: "rotate-3", dot: "bg-tangerine", depth: 1.1, delay: "[animation-delay:-5s]" },
];

const chipStyle =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[0.75rem] font-semibold tracking-[0.04em] whitespace-nowrap text-fog shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-md";

function FocusChips() {
  return (
    <>
      {/* Large screens: tags float around the photo. */}
      <ul className="hidden lg:block">
        {ui.focus.map((label, i) => {
          const c = chipLayout[i % chipLayout.length];
          return (
            <li key={label} data-hero-chip className={`absolute ${c.pos}`}>
              <div data-depth={c.depth}>
                <span className={`${chipStyle} ${c.tilt} dp-float ${c.delay}`}>
                  <span className={`size-1.5 rounded-full ${c.dot}`} />
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function FocusRow() {
  // Small screens: the same tags as a simple row under the photo.
  return (
    <ul className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden">
      {ui.focus.map((label, i) => (
        <li key={label} className={chipStyle}>
          <span
            className={`size-1.5 rounded-full ${chipLayout[i % chipLayout.length].dot}`}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const { first, last } = profile.name;
  const featured = projects.find((p) => p.featured);
  const thumb = featured?.comparisons?.[0]?.after ?? featured?.image;

  return (
    <header id="top" className="relative isolate">
      <HeroMotion>
        <div className="relative">
          <div aria-hidden className="hero-backdrop" />

          <div className="container-page flex min-h-[min(100svh,58rem)] flex-col pt-5 pb-10 sm:pt-6">
            {/* Top bar */}
            <div data-hero-fade>
              <nav
                aria-label="Main"
                className="flex items-center justify-between gap-4"
              >
                <a
                  href="#top"
                  aria-label={`${first} ${last}, back to top`}
                  className="flex items-center gap-2.5"
                >
                  <span className="bg-signature grid size-8 place-items-center rounded-full text-[0.7rem] font-black tracking-[0.02em] text-white">
                    {first[0]}
                    {last[0]}
                  </span>
                  <span className="text-label hidden text-fog uppercase md:inline">
                    {first} {last}
                  </span>
                </a>
                <ul className="flex items-center gap-4 text-[0.6875rem] font-bold tracking-[0.08em] uppercase sm:gap-8 sm:text-label">
                  {ui.nav.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="link-underline transition-colors hover:text-pink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={profile.links.resume}
                  download
                  className="text-label hidden rounded-full border border-line px-4 py-2 text-fog uppercase transition-colors hover:border-fog md:inline-flex"
                >
                  Resume ↓
                </a>
              </nav>
            </div>

            {/* Centre: availability, headline, photo with floating tags */}
            <div className="flex flex-1 flex-col items-center justify-center pt-12 sm:pt-10">
              <div data-hero-fade className="mb-6 sm:mb-8">
                <div className="enter">
                  <AvailabilityPill />
                </div>
              </div>
              <div data-hero-title>
                <h1 className="enter text-center text-[15.5vw] leading-[0.86] font-black tracking-[-0.045em] text-fog uppercase sm:text-display">
                  <span className="block sm:inline">{ui.greeting} </span>
                  <span className="block sm:inline">{first}</span>
                </h1>
              </div>
              <div
                data-hero-orb-scroll
                className="relative z-10 mt-[2.5vw] sm:-mt-[2.6vw]"
              >
                <div data-hero-orb-pointer>
                  <div className="enter relative [animation-delay:150ms]">
                    <Avatar />
                    <FocusChips />
                  </div>
                </div>
              </div>
              <div data-hero-fade>
                <FocusRow />
              </div>
            </div>

            {/* Bottom: intro + CTA, and a link into the flagship project */}
            <div
              data-hero-fade
              className="relative z-20 mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
            >
              <div className="enter [animation-delay:250ms]">
                <p className="max-w-[24rem] text-[0.8125rem] leading-snug font-bold tracking-[0.02em] uppercase sm:text-sm">
                  {profile.intro}
                </p>
                <p className="text-label mt-3 text-ash uppercase">
                  {profile.location} · B.Tech ECS, VIT &apos;
                  {profile.classOf.slice(2)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a href="#contact" className="pill-cta">
                    {ui.contactCta}
                  </a>
                  <a
                    href={profile.links.resume}
                    download
                    className="text-label link-underline text-ash uppercase hover:text-fog md:hidden"
                  >
                    {ui.resumeCta} ↓
                  </a>
                </div>
              </div>

              {featured && (
                <a
                  href={`#${featured.slug}`}
                  className="enter group flex items-center gap-4 rounded-2xl border border-line bg-panel/70 p-2.5 pr-5 backdrop-blur transition-colors [animation-delay:400ms] hover:border-fog/40 md:max-w-[23rem]"
                >
                  {thumb && (
                    <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={thumb.src}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="text-label block text-ash uppercase">
                      {ui.latestProject}
                    </span>
                    <span className="mt-1 block text-base font-extrabold tracking-[-0.01em] uppercase">
                      {featured.title}{" "}
                      <span
                        aria-hidden
                        className="inline-block transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                    <span className="block truncate text-[0.8125rem] text-ash">
                      {featured.kicker}
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </HeroMotion>
    </header>
  );
}
