import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Hasib Rana",
  title: "Full-Stack Developer",
  description:
    "Full-stack developer building fast, accessible web products — interface, API and deployment pipeline — with React, Next.js and TypeScript.",
  // Set NEXT_PUBLIC_SITE_URL in production; localhost is the local fallback.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/opengraph-image",
  // Social profiles. Updated 2026-11-19 with real handles.
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/hasibrana143",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/hasib-rana-199147367/",
      icon: "linkedin",
    },
    {
      name: "X",
      url: "https://x.com/hasib_rana76829",
      icon: "twitter",
    },
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
