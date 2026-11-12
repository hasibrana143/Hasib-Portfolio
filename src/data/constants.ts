import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Your Name",
  title: "Full-Stack Developer",
  description:
    "Full-stack developer specializing in React, Next.js, TypeScript, and cloud-native applications. Building scalable, accessible, and performant web experiences.",
  url: "https://your-portfolio.vercel.app",
  ogImage: "/images/og-image.svg",
  email: "your-email@example.com",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "twitter",
    },
    {
      name: "Email",
      url: "mailto:your-email@example.com",
      icon: "mail",
    },
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];