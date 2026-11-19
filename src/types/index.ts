export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "fullstack" | "frontend" | "backend" | "mobile";
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  socialLinks: SocialLink[];
}
