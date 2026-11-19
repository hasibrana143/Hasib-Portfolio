import { Skill } from "@/types";

// The tools this portfolio actually ships with. Add or trim entries here.
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
  { name: "Server Actions", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Zod validation", category: "backend" },
  { name: "Resend", category: "backend" },

  // Database
  { name: "PostgreSQL", category: "database" },
  { name: "Supabase", category: "database" },

  // DevOps
  { name: "Vercel", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "CI/CD pipelines", category: "devops" },
  { name: "Docker", category: "devops" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "Playwright", category: "tools" },
  { name: "Vitest", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Lighthouse", category: "tools" },
];

export const skillCategories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Data" },
  { key: "devops", label: "DevOps" },
  { key: "tools", label: "Tools" },
] as const;
