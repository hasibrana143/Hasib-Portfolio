import { Suspense } from "react";
import { Hero } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { siteConfig } from "@/data/constants";

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4" />
        <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-6" />
        <div className="h-6 bg-muted rounded w-1/3 mx-auto" />
      </div>
    </div>
  );
}

export default function Home() {
  const bio = `I'm a passionate Full-Stack Developer with 5+ years of experience building scalable web applications. I specialize in the React ecosystem (Next.js, TypeScript) and love creating beautiful, accessible, and performant user experiences.

When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or exploring new technologies. I believe in clean code, thoughtful architecture, and continuous learning.`;

  const experience = [
    {
      role: "Senior Full-Stack Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description: "Leading frontend architecture for a SaaS platform serving 100k+ users. Migrated legacy codebase to Next.js 14, improving performance by 40%.",
    },
    {
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built and maintained multiple client projects using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and automated testing.",
    },
    {
      role: "Junior Web Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description: "Developed responsive websites and web applications for diverse clients. Collaborated with designers to implement pixel-perfect UIs.",
    },
  ];

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Hero
          name={siteConfig.name}
          title={siteConfig.title}
          description={siteConfig.description}
        />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <AboutSection bio={bio} experience={experience} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ContactSection />
      </Suspense>
    </>
  );
}