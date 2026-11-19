import { siteConfig } from "@/data/constants";
import { Hero } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const bio = `My preferred way to build is end to end: interface, API boundary, and the checks that keep a release honest. I work primarily with React, Next.js, and TypeScript, with typecheck, lint, tests, and build required before CI passes.

I care about the parts people actually feel: a fast first paint, a keyboard path that works, a form that fails loudly instead of quietly swallowing input. This site is the working proof — server-rendered into the initial HTML, a production Content-Security-Policy, automated axe-core accessibility scans across five Playwright browser profiles, and a repeatable Lighthouse production audit.`;

const experience = [
  {
    role: "Full-Stack Developer",
    company: "Independent",
    period: "Current",
    description:
      "Building end-to-end web products: a Next.js interface, a small TypeScript API route, shared validation, and CI gates for typecheck, lint, tests, build, and accessibility. This portfolio is the runnable reference.",
  },
];

// Static imports on purpose: the hero is the LCP element, and lazy chunks kept the
// whole page behind hydration. Content is server-rendered and painted immediately.
export function HomeContent() {
  return (
    <>
      <Hero
        name={siteConfig.name}
        title={siteConfig.title}
        description={siteConfig.description}
      />
      <AboutSection bio={bio} experience={experience} />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
