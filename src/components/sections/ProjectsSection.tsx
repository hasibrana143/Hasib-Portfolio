"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Category = "all" | "fullstack" | "frontend" | "backend" | "mobile";

const categoryLabels: Record<Category, string> = {
  all: "All",
  fullstack: "Full-Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
};

// Only offer filters for categories that actually have projects.
const availableCategories = Array.from(
  new Set(projects.map((project) => project.category))
);
const categories = (["all", ...availableCategories] as Category[]).map((value) => ({
  value,
  label: categoryLabels[value],
}));

const EASE = [0.32, 0.72, 0, 1] as const;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filteredProjects = projects.filter((p) =>
    activeCategory === "all" ? true : p.category === activeCategory
  );

  // Native <dialog>.showModal() gives focus containment, inert background and
  // Escape handling for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog.open) dialog.close();

    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="border-t border-border px-6 py-24 md:py-32" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-border pb-10 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-16">
          <div>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="label flex items-center gap-3 text-muted-foreground"
            >
              <span aria-hidden="true" className="rule-accent h-px w-12" />
              02 — Selected work
            </m.p>
            <m.h2
              id="projects-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-6 font-display text-6xl leading-[0.9] tracking-[-0.03em] md:text-8xl"
            >
              Projects
            </m.h2>
          </div>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-lg leading-relaxed text-muted-foreground md:justify-self-end"
          >
            A working record of what I build and how it holds up — the code, the checks, and
            the numbers behind it.
          </m.p>
        </header>

        {availableCategories.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait" presenceAffectsLayout={false}>
          <m.ul
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-10 border-t border-border"
          >
            {filteredProjects.map((project, index) => (
              <li key={project.id} className="border-b border-border">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="group grid w-full grid-cols-[2.5rem_1fr] items-start gap-4 py-8 text-left transition-colors duration-500 hover:bg-secondary/50 md:grid-cols-[4rem_1fr_auto] md:gap-8 md:px-4"
                >
                  <span className="label pt-2 text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="block">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-3xl leading-tight tracking-tight transition-colors duration-500 group-hover:text-accent md:text-4xl">
                        {project.title}
                      </span>
                      {project.featured && (
                        <span className="label text-accent">Featured</span>
                      )}
                    </span>
                    <span className="mt-2 block max-w-xl leading-relaxed text-muted-foreground">
                      {project.shortDescription}
                    </span>
                    <span className="label mt-4 flex flex-wrap gap-x-5 gap-y-1 text-muted-foreground">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span>+{project.techStack.length - 4}</span>
                      )}
                    </span>
                  </span>

                  <span className="hidden items-center gap-4 pt-2 md:flex">
                    <span className="label text-muted-foreground">{project.category}</span>
                    <ArrowUpRight
                      className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </li>
            ))}
          </m.ul>
        </AnimatePresence>

        <AnimatePresence presenceAffectsLayout={false}>
          {selectedProject && (
            <m.dialog
              ref={dialogRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed inset-0 z-50 m-0 flex max-h-none w-full max-w-none items-center justify-center bg-foreground/60 p-4 backdrop:bg-foreground/60 md:p-8"
              onClick={() => setSelectedProject(null)}
              onCancel={(event) => {
                event.preventDefault();
                setSelectedProject(null);
              }}
              aria-labelledby="project-modal-title"
            >
              <m.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-background p-6 md:p-10"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 p-1 text-muted-foreground transition-colors duration-500 hover:text-accent"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <p className="label text-muted-foreground">{selectedProject.category}</p>
                <h3
                  id="project-modal-title"
                  className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl"
                >
                  {selectedProject.title}
                </h3>

                <div className="mt-8 aspect-video w-full overflow-hidden border border-border bg-card">
                  <Image
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    width={1280}
                    height={720}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
                  {selectedProject.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {selectedProject.liveUrl && (
                    <Button asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live demo
                        <ExternalLink aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button asChild variant="outline">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        View code
                        <Github aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                </div>
              </m.div>
            </m.dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
