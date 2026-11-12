"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  name: string;
  title: string;
  description: string;
}

export function Hero({ name, title, description }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6 text-sm font-medium text-primary"
          >
            <Zap className="h-4 w-4" aria-hidden="true" />
            <span>Full-Stack Developer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Hi, I&apos;m <span className="text-primary">{name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-10 text-xl text-muted-foreground sm:text-2xl md:text-3xl"
          >
            {title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-10 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="lg" asChild>
              <a href="#projects" className="flex items-center gap-2">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact" className="flex items-center gap-2">
                Get In Touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" aria-hidden="true" />
              <span>Clean Code</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span>Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>Accessible</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at center, var(--background) 0%, transparent 70%)" }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: 'url("/grid.svg")', opacity: 0.03 }} />
      </div>
    </section>
  );
}