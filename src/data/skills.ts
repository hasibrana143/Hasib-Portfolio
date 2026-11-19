import { Skill } from "@/types";

// Technologies used in this portfolio, plus explicitly marked deployment targets.
export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "HTML & CSS", category: "frontend" },
  { name: "WCAG / ARIA", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Route Handlers", category: "backend" },
  { name: "HTTP APIs", category: "backend" },
  { name: "Zod validation", category: "backend" },
  { name: "Resend", category: "backend" },

  // DevOps
  { name: "Vercel (deployment target)", category: "devops" },
  { name: "GitHub Actions", category: "devops" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "Playwright", category: "tools" },
  { name: "Vitest", category: "tools" },
  { name: "Lighthouse", category: "tools" },
];

export const skillCategories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "tools", label: "Tools" },
] as const;
