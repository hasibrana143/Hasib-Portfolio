"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { processSteps } from "@/data/process";
import { sectionReveal, fadeInUp, staggerContainer, textReveal } from "@/lib/animations";

export function ProcessSection() {
  return (
    <section id="process" className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950" aria-labelledby="process-heading">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div className="text-center mb-16 lg:mb-24" variants={sectionReveal} viewport={{ once: true, margin: "-100px" }}>
          <motion.span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider" variants={fadeInUp}>
            What to expect
          </motion.span>
          <motion.h2
            id="process-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
            variants={fadeInUp}
            style={{ transitionDelay: "0.1s" }}
          >
            My process
          </motion.h2>
        </motion.div>

        <motion.div
          className="space-y-16 lg:space-y-20"
          variants={staggerContainer}
          role="list"
          aria-label="Process steps"
        >
          {processSteps.map((step, index) => (
            <motion.article
              key={step.number}
              className={`relative flex flex-col lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""} gap-8 lg:gap-16 items-start`}
              variants={fadeInUp}
              role="listitem"
            >
              <div className={`flex-1 ${index % 2 === 1 ? "lg:pr-8" : "lg:pl-8"} lg:pt-4`}>
                <div className="flex items-baseline gap-3 mb-4">
                  <motion.span
                    className="text-5xl lg:text-6xl font-bold text-emerald-600/20 dark:text-emerald-400/20"
                    aria-hidden="true"
                  >
                    {step.number}
                  </motion.span>
                  <motion.h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white" variants={textReveal} viewport={{ once: true, margin: "-50px" }}>
                    {step.title}
                  </motion.h3>
                </div>

                <motion.div className="prose prose-gray dark:prose-invert max-w-none" variants={textReveal} viewport={{ once: true, margin: "-50px" }} style={{ transitionDelay: "0.1s" }}>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                </motion.div>

                <motion.ul className="mt-6 space-y-3" variants={staggerContainer} style={{ transitionDelay: "0.2s" }} role="list" aria-label="Key highlights">
                  {step.highlights.map((highlight, hi) => (
                    <motion.li key={hi} className="flex items-start gap-3 text-gray-600 dark:text-gray-300" variants={fadeInUp}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium text-gray-900 dark:text-white">{highlight}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="relative flex-1 min-h-[300px] lg:min-h-[400px]">
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden" aria-hidden="true">
                  <Image
                    src={`/images/process/step-${step.number}.jpg`}
                    alt={`Step ${step.number}: ${step.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {index < processSteps.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 opacity-30" aria-hidden="true">
                    <Image
                      src="/images/forest/tree-decoration.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}