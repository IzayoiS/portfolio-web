import CircleLogo from "@/public/assets/images/circle-logo.svg";
import ProjectImage from "@/public/assets/images/project.png";

export const projects = [
  {
    title: "Personal Portfolio Website",
    logo: CircleLogo,
    description:
      "A personal website showcasing experiences, projects, and technologies used.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://b59-circle-frontend-sable.vercel.app/",
    github: "https://github.com/IzayoiS/b59-circle-frontend",
  },
  {
    title: "Todo App Fullstack",
    logo: ProjectImage,
    description:
      "A task management application for tracking daily tasks, featuring user registration, login, and task management functionalities.",
    stack: ["React", "Express", "PostgreSQL", "Prisma"],
    link: "#",
    github: "#",
  },
];
