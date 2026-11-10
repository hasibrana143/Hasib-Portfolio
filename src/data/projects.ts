import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "mywaypro",
    title: "mywaypro",
    description:
      "Due to the minimalist design and flexibility, illustrations have become more and more used nowadays. MyWay Pro is a project designed and coded by me using the latest technologies. In addition to the minimalist look and corporate seriousness, this project also has a very strong SEO structure.",
    highlights: ["minimalist design and flexibility", "using the latest technologies", "very strong SEO structure"],
    image: "/images/projects/mywaypro.jpg",
    imageAlt: "Preview of mywaypro project made by CodeMaster",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    link: "/explore/mywaypro",
    featured: true,
  },
  {
    id: "trimiday",
    title: "trimiday",
    description:
      "Collaboration with the fantastic team from TripleTwin to design the full UI and develop the new Trimiday app. Trimiday is an application that makes the ads more interesting by simply rewarding you for looking at them.",
    highlights: ["TripleTwin collaboration", "makes the ads more interesting", "rewarding you for looking at them"],
    image: "/images/projects/trimiday.jpg",
    imageAlt: "Preview of trimiday project made by CodeMaster",
    technologies: ["React Native", "UI/UX Design", "Mobile Development"],
    link: "/explore/trimiday",
    featured: true,
  },
  {
    id: "codemaster",
    title: "codemaster",
    description:
      "Sometimes, the place where you can show all your creativity is your own project. CodeMaster is the branding created by me since my college years and is still one of my most creative projects with a unique and special reputation for me. This name represents my passion for design and programming. Enjoy!",
    highlights: ["one of my most creative projects", "passion for design and programming"],
    image: "/images/projects/codemaster.jpg",
    imageAlt: "Preview of codemaster project made by CodeMaster",
    technologies: ["Branding", "Web Design", "Development"],
    link: "/explore/codemaster",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);