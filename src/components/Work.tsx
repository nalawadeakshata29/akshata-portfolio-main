import Image from "next/image";
import { projects, ui, type Project } from "@/content/profile";
import { BeforeAfter } from "./BeforeAfter";
import { ProjectStack } from "./motion/ProjectStack";
import { ProjectVisual } from "./ProjectVisual";
import { ArrowLink, Section, Tags } from "./Section";

function Media({ p }: { p: Project }) {
  const inset = p.images?.[0];
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink">
      {p.image ? (
        <Image
          src={p.image.src}
          alt={p.image.alt}
          fill
          sizes="(min-width: 1280px) 672px, (min-width: 768px) 56vw, 100vw"
          className="object-cover"
        />
      ) : (
        <ProjectVisual kind={p.visual} title={p.title} />
      )}
      {p.image && inset && (
        <div
          className="absolute right-3 bottom-3 w-[46%] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
          style={{ aspectRatio: `${inset.width} / ${inset.height}` }}
        >
          <Image
            src={inset.src}
            alt={inset.alt}
            fill
            sizes="(min-width: 768px) 310px, 45vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

function Featured({ p }: { p: Project }) {
  const comps = p.comparisons ?? [];
  const landscape = comps.filter((c) => c.after.width >= c.after.height);
  const portrait = comps.filter((c) => c.after.width < c.after.height);
  const labels = {
    before: ui.work.before,
    after: ui.work.after,
    dragHint: ui.work.dragHint,
    sliderLabel: ui.work.sliderLabel,
    pairsLabel: ui.work.pairsLabel,
  };

  return (
    <article id={p.slug}>
      {comps.length > 0 ? (
        <div className="grid items-start gap-4 md:grid-cols-[2.56fr_1fr] md:gap-5">
          {landscape.length > 0 && (
            <BeforeAfter
              pairs={landscape}
              labels={labels}
              hint
              sizes="(min-width: 1280px) 830px, (min-width: 768px) 70vw, 100vw"
            />
          )}
          {portrait.length > 0 && (
            <BeforeAfter
              pairs={portrait}
              labels={labels}
              className="max-w-[20rem] md:max-w-none"
              sizes="(min-width: 1280px) 325px, (min-width: 768px) 27vw, 80vw"
            />
          )}
        </div>
      ) : (
        <Media p={p} />
      )}

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="text-label text-ash uppercase">{ui.work.flagship}</p>
          <h3 className="text-h3 mt-3 uppercase">{p.title}</h3>
          {p.kicker && <p className="text-lead mt-4 text-fog">{p.kicker}</p>}
          <p className="mt-3 text-[0.9375rem] text-ash">{p.summary}</p>
          <div className="mt-6">
            <Tags items={p.tech} />
          </div>
          {p.repo && (
            <p className="mt-6">
              <ArrowLink href={p.repo}>{ui.work.viewCode}</ArrowLink>
            </p>
          )}
        </div>
        {p.points && (
          <ol className="grid gap-x-8 gap-y-5 md:col-span-7 lg:grid-cols-2">
            {p.points.map((pt, i) => (
              <li key={pt}>
                <span className="text-label block text-ash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-fog/80">
                  {pt}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </article>
  );
}

export function Work() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      eyebrow={ui.sections.projects.eyebrow}
      title={ui.sections.projects.title}
      aside={`${projects.length} ${ui.work.countSuffix}`}
    >
      {featured && <Featured p={featured} />}

      <ProjectStack className="mt-16 flex flex-col gap-6 md:mt-24 stack:gap-[8vh] stack:pb-[8vh]">
        {rest.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            data-stack-card
            style={{ "--i": i } as React.CSSProperties}
            className="stack:sticky stack:top-[calc(5.5rem+var(--i)*1.25rem)]"
          >
            <div
              data-stack-inner
              className="relative grid origin-top gap-6 overflow-hidden rounded-[1.75rem] border border-line bg-panel p-5 sm:p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:p-8 stack:h-[min(calc(100svh-9rem),38rem)]"
            >
              <div className="flex flex-col">
                {p.context && (
                  <p className="text-label text-ash uppercase">{p.context}</p>
                )}
                <h3 className="text-h3 mt-4 uppercase">{p.title}</h3>
                {p.kicker && (
                  <p className="text-lead mt-4 text-fog">{p.kicker}</p>
                )}
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ash">
                  {p.summary}
                </p>
                <div className="mt-auto pt-6">
                  <Tags items={p.tech} />
                  {p.repo && (
                    <p className="mt-6">
                      <ArrowLink href={p.repo}>{ui.work.viewCode}</ArrowLink>
                    </p>
                  )}
                </div>
              </div>
              <div className="order-first md:order-none md:self-center">
                <Media p={p} />
              </div>
              <div
                data-stack-shade
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink opacity-0"
              />
            </div>
          </article>
        ))}
      </ProjectStack>
    </Section>
  );
}
