import { siteConfig } from "@/data/constants";
import { Hero } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const bio = `I build complete web products — interface, API, data layer and the pipeline that ships them. My default stack is React and Next.js on the front, TypeScript everywhere, and a CI gate that has to pass before anything reaches production.

I care about the parts people actually feel: a fast first paint, a keyboard path that works, a form that fails loudly instead of quietly swallowing input. This site is the working proof — server-rendered for crawlers, a strict Content-Security-Policy, 35 automated accessibility checks across five browsers, and a Lighthouse run that lands at 98.`;

const experience = [
  {
    role: "Independent Full-Stack Developer",
    company: "Freelance",
    period: "Current",
    description:
      "Taking projects from idea to production: Next.js interfaces, TypeScript APIs, PostgreSQL schemas and the CI/CD setup that keeps them deployable. Scope, stack and timeline are agreed up front; the code is handed over documented, with the checks that guard it still running.",
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
