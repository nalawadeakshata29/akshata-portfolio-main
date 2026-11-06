import { profile, ui } from "@/content/profile";
import { Parallax } from "./motion/Parallax";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-page text-label flex flex-wrap justify-between gap-3 py-6 text-ash uppercase">
        <span>
          {profile.name.first} {profile.name.last}
        </span>
        <span>{profile.location}</span>
        <a href="#top" className="link-underline hover:text-fog">
          {ui.backToTop} ↑
        </a>
      </div>
      <Parallax from={30} to={0}>
        <p
          aria-hidden
          className="wordmark -mb-[3.2vw] text-center text-[16vw] leading-[0.8] font-black tracking-[-0.05em] whitespace-nowrap uppercase select-none"
        >
          {profile.name.first}
        </p>
      </Parallax>
    </footer>
  );
}
