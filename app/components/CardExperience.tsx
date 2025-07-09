"use client";

import { ExpType, useExperience } from "@/hooks/use-experience";
import Image from "next/image";
import { Experience } from "./skeleton/Experience";

export default function CardExperience() {
  const { data: experience, isLoading } = useExperience();

  if (isLoading) return <Experience />;

  return (
    <div className="flex flex-col gap-6">
      {experience.map((exp: ExpType) => (
        <div
          key={exp.id}
          className="mb-3 w-full dark:bg-gray-700 rounded-xl p-5 justify-between flex "
        >
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Image
              src={exp.logo}
              alt={exp.company}
              width={75}
              height={75}
              className="object-contain h-16 mt-5 mr-5 dark:bg-white p-2 rounded-xl "
            />
            <div>
              <h1 className="text-lg font-semibold">{exp.role}</h1>
              <p className="text-md font-light text-green-500">{exp.company}</p>
              <p className="text-sm font-extralight dark:text-gray-400 md:hidden mt-1">
                {exp.start_month} {exp.start_year} -{" "}
                {exp.currently_working
                  ? "Present"
                  : `${exp.end_month} ${exp.end_year}`}
              </p>

              <ul className="list-disc mt-3 ml-4 dark:text-gray-400">
                {exp.descriptions.map((desc, i) => (
                  <li key={i} className="text-md font-light">
                    {desc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-3 font-medium text-xs">
                {exp.tech_stack.split(",").map((tech, i) => (
                  <p
                    key={i}
                    className="dark:bg-gray-600 dark:text-gray-400 bg-gray-200 p-1 text-center w-auto px-3 h-auto rounded-2xl text-gray-600 font-semibold"
                  >
                    {tech}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex text-sm font-light text-right whitespace-nowrap dark:text-gray-400">
            <p>
              {exp.start_month} {exp.start_year} -{" "}
              {exp.currently_working
                ? "Present"
                : `${exp.end_month} ${exp.end_year}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
