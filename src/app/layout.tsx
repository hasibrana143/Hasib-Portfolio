import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadataBase = new URL("https://code-master.be");

export const metadata: Metadata = {
  title: {
    default: "CodeMaster - Freelance Web Design & Development from Belgium",
    template: "%s | CodeMaster",
  },
  description: "Creative freelance designer and developer based in Antwerp, Belgium. 5+ years of experience crafting modern websites with beautiful code.",
  keywords: ["freelance web designer", "web developer", "Antwerp", "Belgium", "web design", "web development", "portfolio"],
  authors: [{ name: "CodeMaster", url: "https://code-master.be" }],
  creator: "CodeMaster",
  publisher: "CodeMaster",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://code-master.be",
    siteName: "CodeMaster",
    title: "CodeMaster - Freelance Web Design & Development",
    description: "Creative freelance designer and developer based in Antwerp, Belgium.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeMaster Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMaster - Freelance Web Design & Development",
    description: "Creative freelance designer and developer based in Antwerp, Belgium.",
    images: ["/images/og-image.jpg"],
    creator: "@iamcodemaster",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}