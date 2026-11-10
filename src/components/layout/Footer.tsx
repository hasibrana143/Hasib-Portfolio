import Link from "next/link";
import { siteConfig, socialLinks, languages, footerTools } from "@/lib/constants";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300" role="contentinfo">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-t from-emerald-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Are you ready to start?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-md">
              Let&apos;s talk about it!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact me
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">Explore our tools:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {footerTools.map((tool, index) => (
                  <span key={tool.href} className="flex items-center gap-1">
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {tool.label}
                    </a>
                    {index < footerTools.length - 1 && <span className="text-gray-600">,</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">pages</h3>
            <ul className="space-y-3" role="list">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">languages</h3>
            <ul className="space-y-3" role="list">
              {languages.map((lang) => (
                <li key={lang.href}>
                  <Link
                    href={lang.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-white">CodeMaster.</span>
              <p className="text-gray-500">All rights reserved - {CURRENT_YEAR}</p>
            </div>

            <div className="flex items-center gap-6" role="list" aria-label="Social links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {social.icon === "facebook" && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    )}
                    {social.icon === "github" && (
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    )}
                    {social.icon === "dribbble" && (
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.355 15.828c-.375.967-1.543 1.577-2.731 1.577-1.093 0-1.845-.427-2.238-1.073l.683-1.295c.376.62 1.052 1.04 1.892 1.04 1.093 0 1.845-.427 2.238-1.073zm-1.814-3.79c-.172-.59-.334-1.18-.485-1.769h1.868l-.313 2.491h-1.07zm3.335 3.248c.546 0 1.007-.251 1.238-.665l-1.098-1.213c-.335.385-.823.628-1.384.628-.846 0-1.475-.428-1.704-1.014l-1.22 1.342c.553.93 1.652 1.54 2.93 1.54 2.406 0 3.975-1.353 3.975-3.51 0-2.09-1.59-3.51-3.818-3.51-1.214 0-2.116.478-2.558 1.093H5.039c.437-1.795 2.06-3.093 4.185-3.093 3.072 0 4.815 2.013 4.815 4.733 0 1.513-.89 2.647-2.073 3.053l1.012 1.102c1.054-.315 1.777-1.166 1.777-2.293 0-1.874-1.187-2.93-2.977-2.93-1.978 0-3.292 1.504-3.292 3.578 0 1.424.643 2.375 1.562 2.899.92.525 1.987.806 3.234.806zm-8.436-8.295c1.268 0 2.126.836 2.126 1.97 0 1.188-.92 1.945-2.238 1.945-1.094 0-1.912-.674-2.068-1.562h2.18zm7.807.565l-.89 2.254h1.577c.246-.78.452-1.482.578-2.102.236 1.05-.188 1.984-1.265 2.187zm-2.374-2.67c-.428 1.055-1.112 1.643-2.017 1.643-.974 0-1.76-.626-1.993-1.434h1.74l.447 1.268h2.265c-.184-.534-.418-1.06-.71-1.578zm-3.623 5.065c-.806 0-1.414-.347-1.775-.86l1.248-1.168c.24.367.665.575 1.194.575.622 0 1.028-.335 1.128-.785l-.776.587c-.13.653-.71 1.078-1.495 1.078z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" aria-hidden="true" />
      </div>
    </footer>
  );
}