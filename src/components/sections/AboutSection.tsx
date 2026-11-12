"use client";

import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import { Badge } from "@/components/ui/badge";

interface AboutSectionProps {
  bio: string;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
}

export function AboutSection({ bio, experience }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6 md:py-28 lg:py-32" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="about-heading" className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground">{bio}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-2xl font-semibold">Skills & Technologies</h3>
            <div className="space-y-6">
              {skillCategories.map((category) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="mb-3 text-lg font-medium capitalize">{category.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((s) => s.category === category.key)
                      .map((skill) => (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className="gap-1 px-3 py-1"
                        >
                          {skill.name}
                          <span className="text-xs text-muted-foreground">
                            {skill.proficiency}/5
                          </span>
                        </Badge>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-2xl font-semibold">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-lg border bg-card"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold">{exp.role}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}