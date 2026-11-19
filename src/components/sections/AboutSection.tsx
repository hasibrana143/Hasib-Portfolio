"use client";

import { m } from "framer-motion";
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

const EASE = [0.32, 0.72, 0, 1] as const;

export function AboutSection({ bio, experience }: AboutSectionProps) {
  const [lead, ...rest] = bio.split("\n\n");

  return (
    <section id="about" className="border-t border-border px-6 py-24 md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-border pb-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="label flex items-center gap-3 text-muted-foreground"
            >
              <span aria-hidden="true" className="rule-accent h-px w-12" />
              01 — Profile
            </m.p>
            <m.h2
              id="about-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-6 font-display text-6xl leading-[0.9] tracking-[-0.03em] md:text-8xl"
            >
              About
            </m.h2>
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="font-display text-2xl leading-snug tracking-tight md:text-[1.75rem]">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </m.div>
        </header>

        <div className="grid gap-14 pt-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            aria-labelledby="skills-heading"
          >
            <h3 id="skills-heading" className="label text-muted-foreground">
              01.1 — Skills & technologies
            </h3>
            <div className="mt-8 space-y-8">
              {skillCategories.map((category) => (
                <div key={category.key}>
                  <h4 className="font-display text-xl tracking-tight">{category.label}</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills
                      .filter((s) => s.category === category.key)
                      .map((skill) => (
                        <Badge key={skill.name} variant="outline">
                          {skill.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </m.section>

          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            aria-labelledby="experience-heading"
          >
            <h3 id="experience-heading" className="label text-muted-foreground">
              01.2 — Experience
            </h3>
            <ol className="mt-8 border-t border-border">
              {experience.map((exp, index) => (
                <m.li
                  key={exp.role}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                  className="grid gap-3 border-b border-border py-6 md:grid-cols-[10rem_1fr] md:gap-8"
                >
                  <span className="label pt-1 text-muted-foreground">{exp.period}</span>
                  <div>
                    <h4 className="font-display text-2xl leading-tight tracking-tight">{exp.role}</h4>
                    <p className="mt-1 text-sm text-accent">{exp.company}</p>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                </m.li>
              ))}
            </ol>
          </m.section>
        </div>
      </div>
    </section>
  );
}
