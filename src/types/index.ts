export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    location: string;
    role: string;
  };
  navigation: NavItem[];
  social: SocialLink[];
  languages: { label: string; href: string }[];
  footerTools: { label: string; href: string }[];
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}