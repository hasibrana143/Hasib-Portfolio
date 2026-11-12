import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", proficiency: 5 },
  { name: "Next.js", category: "frontend", proficiency: 5 },
  { name: "TypeScript", category: "frontend", proficiency: 5 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 5 },
  { name: "Framer Motion", category: "frontend", proficiency: 4 },
  { name: "HTML5 / CSS3", category: "frontend", proficiency: 5 },
  { name: "JavaScript (ES6+)", category: "frontend", proficiency: 5 },
  { name: "Redux / Zustand", category: "frontend", proficiency: 4 },

  // Backend
  { name: "Node.js", category: "backend", proficiency: 5 },
  { name: "Express.js", category: "backend", proficiency: 4 },
  { name: "Next.js API Routes", category: "backend", proficiency: 5 },
  { name: "Server Actions", category: "backend", proficiency: 5 },
  { name: "REST APIs", category: "backend", proficiency: 5 },
  { name: "GraphQL", category: "backend", proficiency: 3 },
  { name: "Authentication (NextAuth, JWT)", category: "backend", proficiency: 4 },

  // Database
  { name: "PostgreSQL", category: "database", proficiency: 4 },
  { name: "MongoDB", category: "database", proficiency: 3 },
  { name: "Prisma ORM", category: "database", proficiency: 4 },
  { name: "Redis", category: "database", proficiency: 3 },
  { name: "Supabase", category: "database", proficiency: 4 },

  // DevOps
  { name: "Vercel", category: "devops", proficiency: 5 },
  { name: "Docker", category: "devops", proficiency: 3 },
  { name: "GitHub Actions", category: "devops", proficiency: 4 },
  { name: "CI/CD Pipelines", category: "devops", proficiency: 4 },
  { name: "AWS (Basics)", category: "devops", proficiency: 2 },

  // Tools
  { name: "Git", category: "tools", proficiency: 5 },
  { name: "VS Code", category: "tools", proficiency: 5 },
  { name: "Figma", category: "tools", proficiency: 3 },
  { name: "Postman", category: "tools", proficiency: 4 },
  { name: "Playwright", category: "tools", proficiency: 3 },
  { name: "Vitest / Jest", category: "tools", proficiency: 3 },
];

export const skillCategories = [
  { key: "frontend", label: "Frontend", color: "blue" },
  { key: "backend", label: "Backend", color: "green" },
  { key: "database", label: "Database", color: "purple" },
  { key: "devops", label: "DevOps", color: "orange" },
  { key: "tools", label: "Tools", color: "gray" },
] as const;