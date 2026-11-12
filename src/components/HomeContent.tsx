"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/constants";

const Hero = dynamic(() => import("@/components/sections/HeroSection").then((mod) => mod.Hero), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then((mod) => mod.ProjectsSection), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then((mod) => mod.ContactSection), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-3 bg-muted rounded w-1/4 mx-auto mb-6" />
        <div className="h-12 bg-muted rounded w-3/4 mx-auto mb-4" />
        <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-6" />
        <div className="h-4 bg-muted rounded w-1/3 mx-auto mb-8" />
        <div className="flex justify-center gap-4">
          <div className="h-10 bg-muted rounded w-40" />
          <div className="h-10 bg-muted rounded w-40" />
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="py-20 px-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4" />
          <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="h-48 bg-muted rounded mb-4" />
              <div className="h-6 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeContent() {
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
      <Suspense fallback={<HeroSkeleton />}>
        <Hero
          name={siteConfig.name}
          title={siteConfig.title}
          description={siteConfig.description}
        />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection bio={bio} experience={experience} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </>
  );
}