import CircleLogo from "@/public/assets/images/circle-logo.svg";
import ProjectImage from "@/public/assets/images/project.png";

export const projects = [
  {
    projectName: "Personal Portfolio Website",
    logo: CircleLogo,
    descriptions:
      "A personal website showcasing experiences, personal website showcasing experiences, personal website showcasing experiences, projects, and technologies used.",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    linkGithub: "https://b59-circle-frontend-sable.vercel.app/",
    linkWebsite: "https://github.com/IzayoiS/b59-circle-frontend",
  },
  {
    projectName: "Todo App Fullstack",
    logo: ProjectImage,
    descriptions:
      "A task management application for tracking daily tasks, featuring user registration, login, and task management functionalities.",
    techStack: ["React", "Express", "PostgreSQL", "Prisma"],
    linkGithub: "#",
    linkWebsite: "#",
  },
];
