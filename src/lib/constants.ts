import { SiteConfig, NavItem, SocialLink } from "@/types";

export const navigation: NavItem[] = [
  { label: "welcome", href: "/" },
  { label: "discover", href: "/discover" },
  { label: "explore", href: "/explore" },
  { label: "contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/iamcodemaster/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/iamcodemaster", icon: "facebook" },
  { label: "GitHub", href: "https://github.com/iamcodemaster", icon: "github" },
  { label: "Dribbble", href: "https://dribbble.com/iamcodemaster", icon: "dribbble" },
];

export const languages = [
  { label: "english", href: "/" },
  { label: "romanian", href: "/ro" },
];

export const footerTools = [
  { label: "Free AI Background Remover", href: "https://free-background-remover.com" },
  { label: "Privacy-first Audio Remover", href: "https://remove-audio.com" },
  { label: "HEIC to JPG Converter", href: "https://fromheictojpg.com" },
  { label: "Bytes of Us", href: "https://bytesofus.com" },
];

export const siteConfig: SiteConfig = {
  name: "CodeMaster",
  description: "Freelance web design and web development from Belgium. Creative designer and developer based in Antwerp with 5+ years of experience.",
  url: "https://code-master.be",
  ogImage: "/images/og-image.jpg",
  author: {
    name: "CodeMaster",
    location: "Antwerp, Belgium",
    role: "Creative Freelance Designer & Developer",
  },
  navigation,
  social: socialLinks,
  languages,
  footerTools,
};