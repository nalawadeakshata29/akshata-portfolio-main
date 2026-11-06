import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About, Contact, Experience, Skills } from "@/components/Sections";
import { Work } from "@/components/Work";
import { ui } from "@/content/profile";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-pink focus:px-4 focus:py-2 focus:text-ink"
      >
        {ui.skipLink}
      </a>
      <Hero />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
