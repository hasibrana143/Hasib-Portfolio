"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { sectionReveal, fadeInUp, staggerContainer } from "@/lib/animations";
import { OptimizedImage } from "@/components/ui/Image";

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8" aria-labelledby="projects-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-16" variants={sectionReveal} viewport={{ once: true, margin: "-100px" }}>
          <motion.div variants={fadeInUp}>
            <motion.span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider" variants={fadeInUp}>
              Latest work
            </motion.span>
            <motion.h2
              id="projects-heading"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
              variants={fadeInUp}
              style={{ transitionDelay: "0.1s" }}
            >
              Check my latest projects
            </motion.h2>
          </motion.div>

          <motion.div className="mt-4 sm:mt-0" variants={fadeInUp} style={{ transitionDelay: "0.2s" }}>
            <Link href="/explore" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              Explore more projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          role="list"
          aria-label="Featured projects"
        >
          {featuredProjects.map((project) => (
            <motion.article
              key={project.id}
              className="group"
              variants={fadeInUp}
              role="listitem"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link
                href={project.link}
                className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 rounded-2xl overflow-hidden bg-white dark:bg-gray-900"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <OptimizedImage
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>

                <div className="p-6">
                  <motion.h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </motion.h3>

                  <motion.p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </motion.p>

                  <motion.div className="flex flex-wrap gap-2 mb-4" variants={staggerContainer} style={{ transitionDelay: "0.1s" }} role="list" aria-label="Technologies">
                    {project.technologies.slice(0, 3).map((tech, ti) => (
                      <motion.span key={ti} className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full" variants={fadeInUp}>
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <motion.span className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full" variants={fadeInUp}>
                        +{project.technologies.length - 3}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" variants={fadeInUp} style={{ transitionDelay: "0.15s" }}>
                    See details
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}