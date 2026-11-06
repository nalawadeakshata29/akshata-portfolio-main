import {
  beyondCode,
  education,
  experience,
  profile,
  skills,
  stats,
  ui,
} from "@/content/profile";
import { RevealGroup } from "./motion/RevealGroup";
import { WordReveal } from "./motion/WordReveal";
import { AvailabilityPill, Section } from "./Section";

export function About() {
  const label = "text-label text-ash uppercase";
  return (
    <Section
      id="about"
      eyebrow={ui.sections.about.eyebrow}
      title={ui.sections.about.title}
    >
      <WordReveal
        text={profile.about[0]}
        className="text-statement max-w-[24em] text-fog"
      />

      <RevealGroup className="mt-12 grid gap-3 md:mt-16 md:grid-cols-6 md:gap-4 lg:grid-cols-12">
        <article
          data-reveal
          className="bento flex flex-col md:col-span-6 lg:col-span-7 lg:row-span-2"
        >
          <p className={label}>{ui.bento.now}</p>
          <p className="text-lead mt-4 max-w-[34em] text-fog/85">
            {profile.about[1]}
          </p>
          <p className="text-label mt-auto pt-8 text-fog uppercase">
            {profile.role}
          </p>
        </article>

        {education.map((ed) => (
          <article
            key={ed.school}
            data-reveal
            className="bento md:col-span-3 lg:col-span-5"
          >
            <p className={label}>
              {ui.bento.education} · {ed.when}
            </p>
            <p className="mt-4 text-xl leading-tight font-extrabold uppercase">
              {ed.school}
            </p>
            <p className="mt-1 text-[0.9375rem] text-ash">{ed.detail}</p>
            <p className="text-label mt-5 text-fog uppercase">{ed.score}</p>
          </article>
        ))}

        <article data-reveal className="bento md:col-span-3 lg:col-span-5">
          <p className={label}>{ui.bento.basedIn}</p>
          <p className="mt-4 text-xl leading-tight font-extrabold uppercase">
            {profile.location}
          </p>
          <div className="mt-5">
            <AvailabilityPill />
          </div>
        </article>

        <article data-reveal className="bento md:col-span-6 lg:col-span-7">
          <p className={label}>{ui.bento.numbers}</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {stats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-[0.8125rem] leading-snug text-ash">
                  {st.label}
                </dt>
                <dd className="text-h2">{st.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article data-reveal className="bento md:col-span-6 lg:col-span-5">
          <p className={label}>{ui.bento.beyond}</p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ash">
            {beyondCode}
          </p>
        </article>
      </RevealGroup>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow={ui.sections.experience.eyebrow}
      title={ui.sections.experience.title}
    >
      <RevealGroup as="ol" className="border-t border-line">
        {experience.map((e) => (
          <li
            key={e.title}
            data-reveal
            className="grid gap-3 border-b border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10 md:py-10"
          >
            <p className="text-label text-ash uppercase md:pt-1.5">{e.when}</p>
            <div>
              <h3 className="text-xl leading-tight font-extrabold tracking-[-0.01em] uppercase md:text-2xl">
                {e.title}
              </h3>
              <p className="mt-1 text-[0.9375rem] font-semibold text-fog/70">
                {e.org}
              </p>
              {e.points.length > 0 && (
                <ul className="mt-4 max-w-2xl space-y-1.5 text-[0.9375rem] leading-relaxed text-ash">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow={ui.sections.skills.eyebrow}
      title={ui.sections.skills.title}
    >
      <RevealGroup
        as="dl"
        className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((s) => (
          <div key={s.group} data-reveal className="border-t border-line pt-5">
            <dt className="text-label text-ash uppercase">{s.group}</dt>
            <dd className="mt-4 flex flex-wrap gap-1.5">
              {s.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 text-[0.8125rem] font-medium text-fog/90"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function Contact() {
  const { email, github, linkedin, resume } = profile.links;
  return (
    <Section
      id="contact"
      eyebrow={ui.sections.contact.eyebrow}
      title={ui.sections.contact.title}
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="text-lead max-w-xl text-ash">{profile.contactNote}</p>
          <a
            href={`mailto:${email}`}
            className="link-underline mt-8 inline-block text-[clamp(1.125rem,0.6rem+2.4vw,2.25rem)] font-extrabold tracking-[-0.02em] break-all"
          >
            {email}
          </a>
        </div>
        <div className="flex flex-col items-start gap-4 md:col-span-5 md:items-end">
          <AvailabilityPill />
          <a href={`mailto:${email}`} className="pill-cta">
            {ui.emailCta}
          </a>
          <a href={resume} download className="pill-ghost">
            {ui.resumeCta} ↓
          </a>
          <ul className="text-label flex gap-6 uppercase">
            <li>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ash transition-colors hover:text-pink"
              >
                {ui.social.github} ↗
              </a>
            </li>
            <li>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ash transition-colors hover:text-pink"
              >
                {ui.social.linkedin} ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
