"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { sectionReveal, fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8" aria-labelledby="about-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:pr-8">
            <motion.h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              variants={sectionReveal}
              viewport={{ once: true, margin: "-100px" }}
            >
              Need a freelance web designer<span className="hidden sm:inline"> for your website?</span>
            </motion.h2>

            <motion.div variants={fadeInUp} style={{ transitionDelay: "0.1s" }}>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Hey there! I am a{" "}
                <strong className="text-gray-900 dark:text-white">creative freelance designer and developer</strong>
                based in Antwerp, Belgium. With more than 5 years of experience in the field, I aim to create
                websites that offer a{" "}
                <strong className="text-gray-900 dark:text-white">modern look and feel</strong>
                and that are powered by code that&apos;s just as beautiful, as well as scalable.
              </p>

              <motion.p className="text-gray-500 dark:text-gray-400 leading-relaxed" variants={fadeInUp} style={{ transitionDelay: "0.2s" }}>
                I believe in the power of clean design and robust code working together in harmony.
                Every project is a chance to craft something unique that not only looks great but performs flawlessly.
              </motion.p>
            </motion.div>

            <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" variants={fadeInUp} style={{ transitionDelay: "0.3s" }}>
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Let&apos;s get started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View projects
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div className="relative" variants={fadeInUp} style={{ transitionDelay: "0.15s" }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src="/images/workspace.jpg"
                alt="The place where all the coding and the designing happens"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3" aria-hidden="true">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Live coding
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Designing
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Deploying
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-32 h-32 sm:w-48 sm:h-48 opacity-50" aria-hidden="true">
              <Image
                src="/images/forest/tree-decoration.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 opacity-50" aria-hidden="true">
              <Image
                src="/images/forest/tree-decoration.svg"
                alt=""
                fill
                className="object-contain rotate-45"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}