import { Project } from "@/types";

// Real work only — every detail below is verifiable in this repository.
// Add another entry with the same shape to extend the index.
export const projects: Project[] = [
  {
    id: "1",
    title: "Editorial Swiss Portfolio",
    description:
      "The site you are reading. A single-page portfolio built on Next.js 16 App Router with `cacheComponents`, so every section is server-rendered into the HTML — crawlable, readable without JavaScript, and painted before hydration. The public API route validates with a shared Zod schema, escapes every user-supplied value before it reaches the email body, and rejects requests over 16 KB, non-JSON bodies, and anything that fills the honeypot. The Content-Security-Policy allows no `unsafe-eval` in production, the project modal uses a native `<dialog>` for focus containment, and GitHub Actions gates every push on typecheck, lint, unit tests, a production build and 35 axe-core accessibility checks across five browser engines.",
    shortDescription:
      "This site — server-rendered Next.js, strict CSP, 35 accessibility checks, CI-gated",
    image: "/images/projects/portfolio.svg",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Zod",
      "Resend",
      "Vitest",
      "Playwright",
      "GitHub Actions",
    ],
    featured: true,
    category: "fullstack",
  },
];
