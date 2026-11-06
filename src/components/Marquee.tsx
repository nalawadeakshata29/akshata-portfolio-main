import { skills } from "@/content/profile";
import { VelocityMarquee } from "./motion/VelocityMarquee";

// A slow ticker of everything she works with. Decorative: the Skills section lists it properly.
const items = skills.flatMap((s) => s.items).slice(0, 24);

function Row() {
  return (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-5">{item}</span>
          <span className="text-[0.625rem] text-pink/80">✦</span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <VelocityMarquee className="text-ticker border-y border-line py-4 text-ash uppercase">
      <Row />
      <Row />
    </VelocityMarquee>
  );
}
