import Image from "next/image";
import { experiences } from "@/app/data/experiences";

export default function CardExperience() {
  return (
    <div className="flex flex-col gap-6">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="mb-3 w-full dark:bg-gray-700 rounded-xl p-5 justify-between flex "
        >
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Image
              src={exp.logo}
              alt={exp.company}
              width={75}
              className="object-contain h-16 mt-5 mr-5 dark:bg-white p-2 rounded-xl "
            />
            <div>
              <h1 className="text-lg font-semibold">{exp.role}</h1>
              <p className="text-md font-light text-green-500">{exp.company}</p>
              <p className="text-sm font-extralight mt-1 md:hidden">
                {exp.period}
              </p>

              <ul className="list-disc mt-4 ml-4">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-md font-light">
                    {desc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-3 font-normal text-xs">
                {exp.stack.map((tech, i) => (
                  <p
                    key={i}
                    className="dark:bg-gray-500 bg-gray-200 p-1 text-center w-auto px-3 h-auto rounded-2xl"
                  >
                    {tech}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex text-sm font-extralight text-right whitespace-nowrap">
            <p>{exp.period}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
