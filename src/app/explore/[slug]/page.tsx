import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/projects";
import { OptimizedImage } from "@/components/ui/Image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.slug);
  
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <article className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12 lg:mb-16">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors mb-8"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to projects
              </Link>
              <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </header>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-16 lg:mb-20">
              <OptimizedImage
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="lg:col-span-2 space-y-12">
                <section aria-labelledby="highlights-heading">
                  <h2 id="highlights-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key highlights</h2>
                  <ul className="space-y-4" role="list">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <span className="w-2 h-2 mt-2 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="details-heading">
                  <h2 id="details-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project details</h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      This project was crafted with attention to detail, focusing on creating a seamless user experience
                      while maintaining a strong visual identity. The development process involved close collaboration
                      with stakeholders to ensure the final product met all requirements and exceeded expectations.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      The technical implementation leverages modern web technologies to deliver optimal performance,
                      accessibility, and maintainability. Clean code architecture and best practices ensure the project
                      can scale and evolve with future needs.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      From initial concept through final deployment, every decision was made with the end user in mind.
                      The result is a polished, professional web presence that effectively communicates the brand message
                      and drives meaningful engagement.
                    </p>
                  </div>
                </section>
              </div>

              <aside className="space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project info</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Role</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">Designer & Developer</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Timeline</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">8-12 weeks</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Status</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">Completed</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Technologies</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">{project.technologies.join(", ")}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Highlights</h3>
                  <ul className="space-y-3" role="list">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span className="text-sm leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="block bg-black text-white text-center px-6 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Interested in a similar project?
                </Link>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}