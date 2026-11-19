"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  name: string;
  title: string;
  description: string;
}

const EASE = [0.32, 0.72, 0, 1] as const;

export function Hero({ name, title, description }: HeroProps) {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const status = [
    { label: "Currently", value: "Building full-stack products" },
    { label: "Focus", value: "React · Next.js · TypeScript" },
    { label: "Status", value: "Open to work — 2026" },
    { label: "Principle", value: "Ship small, measure, iterate" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <div aria-hidden="true" className="editorial-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-48 top-1/4 h-[30rem] w-[30rem] rounded-full border border-accent/30 md:-right-32 md:h-[36rem] md:w-[36rem]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid items-end gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <m.p
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="label flex items-center gap-3 text-muted-foreground"
            >
              <span aria-hidden="true" className="rule-accent h-px w-12" />
              00 — Portfolio
            </m.p>

            <m.h1
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.08, duration: 0.9, ease: EASE }}
              className="mt-8 font-display text-[clamp(3.75rem,12vw,9rem)] leading-[0.88] tracking-[-0.03em]"
            >
              Hi, I&apos;m{" "}
              <span className="italic text-accent">{name}</span>
            </m.h1>

            <m.p
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.16, duration: 0.8, ease: EASE }}
              className="mt-8 font-display text-2xl tracking-tight md:text-3xl"
            >
              {title}
            </m.p>

            <m.p
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.24, duration: 0.8, ease: EASE }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {description}
            </m.p>

            <m.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.32, duration: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Button size="lg" onClick={() => scrollToSection("#projects")}>
                View projects
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("#contact")}>
                Get in touch
              </Button>
            </m.div>
          </div>

          <m.aside
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
            aria-label="Current status"
          >
            <p className="label text-muted-foreground">Status</p>
            <dl className="mt-5 space-y-5">
              {status.map((row) => (
                <div key={row.label} className="border-b border-border pb-4 last:border-b-0">
                  <dt className="label text-muted-foreground">{row.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed md:text-base">{row.value}</dd>
                </div>
              ))}
            </dl>
          </m.aside>
        </div>

        <m.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          className="label mt-16 flex flex-wrap gap-x-10 gap-y-2 border-t border-border pt-6 text-muted-foreground md:mt-24"
        >
          <span>Clean code</span>
          <span>Performance</span>
          <span>Accessibility</span>
          <span>Design systems</span>
        </m.div>
      </div>
    </section>
  );
}
