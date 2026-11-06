# Akshata Nalawade — Portfolio

Personal portfolio site, built with Next.js (App Router), React, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Updating the content

All of the text on the site — projects, experience, skills, education, links — lives in one file:

```
src/content/profile.ts
```

Edit the values there and the page updates. You don't need to touch the components for content changes.

- **Add a project:** add an entry to `projects`. The one with `featured: true` is the large showcase at the top; every other entry becomes a stacking card.
- **Project images:** put files in `public/projects/` and set `image: { src, alt, width, height }` on the project (optionally `images` for an inset screenshot, or `comparisons` for before/after sliders). Projects without an image show a drawn `visual`; adding an image replaces it automatically.
- **Add a 3D avatar:** put the image in `public/` (a transparent PNG works best) and set `avatar` in `profile.ts`, e.g. `avatar: "/avatar.png"`. Until then the hero shows a gradient orb.
- **Update the resume:** replace `public/Akshata_Nalawade_Resume.pdf` with the new file, keeping the same name. The "Download resume" buttons point to it.

## Where things are

| What | File |
| --- | --- |
| Site copy and data | `src/content/profile.ts` |
| Colours, gradient, and the 3D orb | `src/app/globals.css` |
| Font | `src/app/layout.tsx` |
| Hero (nav, big headline, avatar, Contact me button) | `src/components/Hero.tsx` |
| Scrolling skills ticker | `src/components/Marquee.tsx` |
| Projects (showcase + stacking cards) | `src/components/Work.tsx` |
| Before/after slider, drawn project artwork | `src/components/BeforeAfter.tsx`, `src/components/ProjectVisual.tsx` |
| Footer with the big wordmark | `src/components/Footer.tsx` |
| Scroll animations (GSAP + Lenis) | `src/lib/gsap.ts`, `src/components/motion/*` |
| About (with education), Experience, Skills, Contact | `src/components/Sections.tsx` |
| Page title and link-preview text | `metadata` in `src/app/layout.tsx` |
| Favicon | `src/app/icon.svg` |

## Motion

Scroll animations use GSAP, ScrollTrigger and Lenis (smooth scroll). Everything animated switches off when the visitor's OS has "Reduce motion" enabled, and the page is fully readable without JavaScript.

## Running locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Before pushing, check that the production build passes:

```bash
npm run lint
npm run build
```

## Deploying

The repo is connected to Vercel, so every push to `main` deploys to production automatically, and every other branch or pull request gets its own preview URL.

### Taking over the project

1. **GitHub:** accept the collaborator invite, or ask for the repository to be transferred to your account (Settings → General → Transfer ownership).
2. **Vercel:** once the repo is in your account, go to [vercel.com/new](https://vercel.com/new), import the repository, and click Deploy. No environment variables are needed.
3. **Custom domain (optional):** in your Vercel project, open Settings → Domains and add your domain.
