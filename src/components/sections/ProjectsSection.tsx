"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Category = "all" | "fullstack" | "frontend" | "backend" | "mobile";

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter((p) =>
    activeCategory === "all" ? true : p.category === activeCategory
  );

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 px-6 md:py-28 lg:py-32" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 id="projects-heading" className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            A selection of projects I&apos;ve built, showcasing various technologies and problem-solving approaches.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.value)}
              className="transition-all"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {otherProjects.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 mb-8 text-center text-2xl font-semibold"
            >
              Other Projects
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </motion.div>
          </>
        )}

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedProject(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-gray-800"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="aspect-video w-full rounded-lg overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Project Image Placeholder
                  </div>
                </div>

                <h3 id="project-modal-title" className="mb-2 text-2xl font-bold">
                  {selectedProject.title}
                </h3>
                <p className="mb-6 text-muted-foreground">{selectedProject.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveUrl && (
                    <Button asChild variant="default">
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button asChild variant="outline">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      aria-label={`View ${project.title} project details`}
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-xl">
        <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {project.image}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <CardContent className="p-6">
          <div className="mb-3 flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
          <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.shortDescription}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-0">
          <span className="text-xs text-muted-foreground capitalize">{project.category}</span>
          <span className="text-sm font-medium text-primary group-hover:underline">View Details</span>
        </CardFooter>
      </Card>
    </motion.article>
  );
}