import { ArrowUpRight } from "lucide-react";
import { siteConfig, navLinks } from "@/data/constants";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-24">
          <div>
            <p className="label text-muted-foreground">Colophon</p>
            <p className="mt-4 max-w-md font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Full-stack developer building accessible, performant, and considered web experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex min-h-6 items-center gap-1.5 text-muted-foreground transition-colors duration-500 hover:text-accent"
                >
                  {social.name}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="label text-muted-foreground">Index</p>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-baseline gap-3 font-display text-2xl leading-tight transition-colors duration-500 hover:text-accent"
                  >
                    <span className="label text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-muted-foreground">Contact</p>
            <address className="mt-4 not-italic">
              <a
                href="#contact"
                className="font-display text-2xl leading-tight transition-colors duration-500 hover:text-accent"
              >
                Send a message
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Open to freelance work & collaboration
              </p>
            </address>
          </div>
        </div>

        <div className="label flex flex-col items-start justify-between gap-3 border-t border-border py-6 text-muted-foreground sm:flex-row sm:items-center">
          <span>
            &copy; {currentYear} {siteConfig.name}
          </span>
          <span>Next.js · TypeScript · Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
