import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with authentication, payment processing, admin dashboard, and real-time inventory management. Built with Next.js 14, PostgreSQL, Prisma, Stripe, and NextAuth.",
    shortDescription: "Full-stack e-commerce with payments & admin panel",
    image: "/images/projects/ecommerce.svg",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "NextAuth", "Tailwind CSS"],
    liveUrl: "https://demo-ecommerce.example.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true,
    category: "fullstack",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Real-time collaborative task management application with drag-and-drop boards, team workspaces, notifications, and offline support. Built with React, Node.js, Socket.io, and MongoDB.",
    shortDescription: "Real-time collaborative task manager",
    image: "/images/projects/taskmanager.svg",
    techStack: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://demo-tasks.example.com",
    githubUrl: "https://github.com/yourusername/task-manager",
    featured: true,
    category: "fullstack",
  },
  {
    id: "3",
    title: "Developer Portfolio Template",
    description:
      "Modern, accessible portfolio template with dark mode, animations, and CMS integration. Optimized for performance and SEO. Built with Next.js 15, Framer Motion, and MDX.",
    shortDescription: "High-performance portfolio template",
    image: "/images/projects/portfolio.svg",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "MDX", "Vercel"],
    liveUrl: "https://portfolio-template.example.com",
    githubUrl: "https://github.com/yourusername/portfolio-template",
    featured: true,
    category: "frontend",
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description:
      "Real-time weather dashboard with location-based forecasts, historical data visualization, and PWA support for offline access. Built with React, OpenWeather API, and Chart.js.",
    shortDescription: "Real-time weather dashboard with PWA",
    image: "/images/projects/weather.svg",
    techStack: ["React", "TypeScript", "Chart.js", "OpenWeather API", "PWA", "Vite"],
    liveUrl: "https://weather-dashboard.example.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    featured: false,
    category: "frontend",
  },
  {
    id: "5",
    title: "API Gateway Service",
    description:
      "Microservices API gateway with rate limiting, authentication, request/response transformation, and distributed tracing. Built with Node.js, Express, Redis, and OpenTelemetry.",
    shortDescription: "Microservices API gateway with observability",
    image: "/images/projects/apigateway.svg",
    techStack: ["Node.js", "Express", "Redis", "OpenTelemetry", "Docker", "TypeScript"],
    liveUrl: undefined,
    githubUrl: "https://github.com/yourusername/api-gateway",
    featured: false,
    category: "backend",
  },
  {
    id: "6",
    title: "Mobile Expense Tracker",
    description:
      "Cross-platform mobile app for expense tracking with receipt scanning, budget alerts, and cloud sync. Built with React Native, Expo, Firebase, and TypeScript.",
    shortDescription: "Cross-platform expense tracker with receipt scanning",
    image: "/images/projects/expense-tracker.svg",
    techStack: ["React Native", "Expo", "Firebase", "TypeScript", "TypeScript", "Tailwind CSS"],
    liveUrl: undefined,
    githubUrl: "https://github.com/yourusername/expense-tracker",
    featured: false,
    category: "mobile",
  },
];