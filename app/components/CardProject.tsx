import { projects } from "@/app/data/projects";
import LinkLogo from "@/public/assets/images/link.svg";
import LinkLogoBlack from "@/public/assets/images/link-black.svg";
import GithubLogo from "@/public/assets/images/github.png";
import Image from "next/image";

export default function CardProject() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
      {projects.map((pr, idx) => (
        <div
          key={idx}
          className="w-full bg-white rounded-2xl mt-8 min-h-[400px] shadow-xs"
        >
          <div className="flex justify-center bg-gray-100 dark:bg-[#dee2e6] rounded-t-2xl h-60 items-center">
            <Image
              src={pr.logo}
              alt="Project"
              width={300}
              className="object-contain"
            />
          </div>
          <div className="p-7 rounded-b-xl dark:bg-[#495057]">
            <h1 className="text-xl font-bold pb-2 dark:text-white">
              {pr.title}
            </h1>
            <p className="text-md font-light dark:text-white">
              {pr.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-5 pb-5 font-normal text-xs">
              {pr.stack.map((tech, i) => (
                <p
                  key={i}
                  className="dark:bg-gray-500 bg-gray-200 p-1 text-center w-auto px-3 h-auto rounded-2xl"
                >
                  {tech}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-5 items-center p-2">
              {pr.github && pr.github !== "#" ? (
                <a
                  href={pr.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-2 text-center items-center text-blue-400 cursor-pointer"
                >
                  <Image src={GithubLogo} alt="Github" width={15} height={15} />
                  <p className="text-sm font-normal">View on GitHub</p>
                </a>
              ) : (
                <div className="flex flex-row gap-2 text-center items-center">
                  <Image src={GithubLogo} alt="Github" width={15} height={15} />
                  <p className="text-sm font-normal text-gray-400">
                    Private Repository
                  </p>
                </div>
              )}

              {pr.link && pr.link !== "#" ? (
                <a
                  href={pr.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-2 text-center items-center text-blue-400 cursor-pointer"
                >
                  <Image
                    src={LinkLogoBlack}
                    alt="Live Demo"
                    width={15}
                    className="block dark:hidden"
                  />
                  <Image
                    src={LinkLogo}
                    alt="Live Demo"
                    width={15}
                    className="hidden dark:block"
                  />
                  <p className="text-sm font-normal">Live Demo</p>
                </a>
              ) : (
                <div className="flex flex-row gap-2 text-center items-center">
                  <Image
                    src={LinkLogoBlack}
                    alt="Demo Unavailable"
                    width={15}
                    className="block dark:hidden"
                  />
                  <Image
                    src={LinkLogo}
                    alt="Demo Unavailable"
                    width={15}
                    className="hidden dark:block"
                  />
                  <p className="text-sm font-light">Demo Unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
