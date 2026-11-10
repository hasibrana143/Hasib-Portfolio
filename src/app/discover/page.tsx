import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Discover",
  description: "Learn more about my freelance web design and development services, process, and approach.",
};

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8" aria-labelledby="discover-heading">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-16 lg:mb-24">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Discover
              </span>
              <h1 id="discover-heading" className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                What I do
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                I offer a comprehensive range of web design and development services tailored to your unique needs.
                From initial concept to final deployment, I handle every aspect of your digital presence.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Web Design</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Custom website design focused on user experience, visual appeal, and brand alignment.
                  Including UI/UX design, prototyping, and design systems.
                </p>
              </article>

              <article className="p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Web Development</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Modern, performant web development using React, Next.js, TypeScript, and Tailwind CSS.
                  Clean code, best practices, and scalable architecture.
                </p>
              </article>

              <article className="p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Branding</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Complete brand identity design including logo design, color palette, typography,
                  and brand guidelines for consistent visual communication.
                </p>
              </article>

              <article className="p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Performance</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Website optimization for speed, Core Web Vitals, SEO, and accessibility.
                  Ensuring your site performs flawlessly across all devices.
                </p>
              </article>

              <article className="p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">SEO & Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Search engine optimization, technical SEO, and analytics setup to help you
                  understand your audience and improve visibility.
                </p>
              </article>

              <article className="p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Maintenance</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ongoing support, updates, security patches, and content management to keep
                  your website running smoothly and securely.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950" aria-labelledby="process-heading">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-16 lg:mb-24">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                My approach
              </span>
              <h2 id="process-heading" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                How I work
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="relative p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                <span className="absolute -top-3 left-6 bg-white dark:bg-gray-900 px-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">01</span>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discover & Plan</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We start by understanding your vision, goals, and target audience.
                    I research your industry and competitors to create a strategic plan.
                  </p>
                </div>
              </article>

              <article className="relative p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                <span className="absolute -top-3 left-6 bg-white dark:bg-gray-900 px-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">02</span>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Design & Prototype</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    I create wireframes and high-fidelity designs with interactive prototypes.
                    You review and approve before any code is written.
                  </p>
                </div>
              </article>

              <article className="relative p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                <span className="absolute -top-3 left-6 bg-white dark:bg-gray-900 px-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">03</span>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Develop & Launch</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Clean, performant code with modern tech stack. Thorough testing,
                    optimization, and smooth deployment to production.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Ready to start your project?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss your ideas and create something amazing together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get in touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}