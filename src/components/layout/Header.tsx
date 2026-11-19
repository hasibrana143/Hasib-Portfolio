"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/data/constants";

const siteHost = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-foreground px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-background"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-40 pt-4 md:pt-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
          <a
            href="#hero"
            className="font-display text-2xl leading-none tracking-tight transition-colors duration-500 hover:text-accent"
          >
            {siteConfig.name}
          </a>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-border bg-background/85 px-2 py-1 backdrop-blur-md">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="label block rounded-full px-4 py-2 text-muted-foreground transition-colors duration-500 hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence presenceAffectsLayout={false}>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex h-full flex-col px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl leading-none">{siteConfig.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav aria-label="Mobile navigation" className="mt-20 flex-1">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <m.li
                      key={link.href}
                      initial={{ y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 * index + 0.1,
                        duration: 0.5,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block font-display text-6xl leading-[1.05] transition-colors duration-500 hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <div className="label flex items-center justify-between border-t border-border pt-5 text-muted-foreground">
                <span>Open to work</span>
                <span>{siteHost}</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="h-10 w-10" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
