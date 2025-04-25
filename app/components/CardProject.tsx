import ProjectImage from "@/public/assets/images/project.png";
import GithubLogo from "@/public/assets/images/github.png";
import LinkLogo from "@/public/assets/images/external-link.png";
import Image from "next/image";

export default function CardProject() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
}

function ProjectCard() {
  return (
    <div className="w-full bg-white rounded-2xl mt-8">
      <div className="bg-gray-100 dark:bg-[#dee2e6] rounded-t-2xl">
        <Image
          src={ProjectImage}
          alt="Project"
          width={300}
          height={300}
          className="m-auto"
        />
      </div>
      <div className="p-7 rounded-b-xl dark:bg-[#495057]">
        <h1 className="text-xl font-bold pb-2 dark:text-white">Fakturly</h1>
        <p className="text-md font-light dark:text-white">
          Digital invoice and payment reminder solution that makes billing
          management easier. Built with modern tech stack for optimal
          performance.
        </p>
        <div className="flex gap-5 pt-5 pb-5 pr-5 left-0 font-normal text-xs">
          <p className="dark:bg-gray-500 bg-gray-200  p-1 text-center w-20 h-auto rounded-2xl ">
            Next.js
          </p>
          <p className="dark:bg-gray-500 bg-gray-200  p-1 text-center w-20 h-auto rounded-2xl ">
            Typescript
          </p>
          <p className="dark:bg-gray-500 bg-gray-200  p-1 text-center w-20 h-auto rounded-2xl ">
            Node.js
          </p>
          <p className="dark:bg-gray-500 bg-gray-200  p-1 text-center w-20 h-auto rounded-2xl ">
            Tailwind
          </p>
        </div>
        <div className="flex gap-5 items-center p-2 text-center">
          <div className="flex flex-row gap-2 text-center items-center">
            <Image src={GithubLogo} alt="Github" width={15} height={15} />
            <p className="text-sm font-bold text-gray-400">
              Private Repository
            </p>
          </div>
          <div className="flex flex-row gap-2 text-center items-center text-blue-400 cursor-pointer ">
            <Image src={LinkLogo} alt="Github" width={15} height={15} />
            <p className="text-sm font-bold">Live Demo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
