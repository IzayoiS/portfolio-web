import { projects } from "@/utils/data/projects";
import LinkLogo from "@/public/assets/images/link.svg";
import LinkLogoBlack from "@/public/assets/images/link-black.svg";
import GithubLogo from "@/public/assets/images/github.png";
import Image from "next/image";

export default function CardProject() {
  function truncateText(text: string, wordLimit: number) {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((pr, idx) => (
        <div
          key={idx}
          className=" bg-white rounded-2xl mt-8 min-h-[400px] shadow-xs flex flex-col"
        >
          <div className="flex justify-center bg-gray-100 dark:bg-[#dee2e6] rounded-t-2xl h-55 items-center">
            <Image
              src={pr.logo}
              alt="Project"
              width={300}
              className="object-contain"
            />
          </div>
          <div className="p-7 rounded-b-xl dark:bg-gray-700">
            <h1 className="text-xl font-semibold pb-2">{pr.projectName}</h1>
            <p className="text-md font-light text-gray-600 dark:text-gray-400">
              {truncateText(pr.descriptions, 12)}
            </p>

            <div className="flex flex-wrap gap-3 pt-5 pb-5 font-normal text-xs">
              {pr.techStack.map((tech, i) => (
                <p
                  key={i}
                  className="dark:bg-gray-600 bg-gray-200 p-1 text-center w-auto px-3 h-auto rounded-2xl text-gray-600 dark:text-gray-400"
                >
                  {tech}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-5 items-center p-2">
              {pr.linkGithub && pr.linkGithub !== "#" ? (
                <a
                  href={pr.linkGithub}
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

              {pr.linkWebsite && pr.linkWebsite !== "#" ? (
                <a
                  href={pr.linkWebsite}
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
                  <p className="text-sm font-normal text-gray-400">
                    Demo Unavailable
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
