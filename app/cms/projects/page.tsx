"use client";

import { projects } from "@/utils/data/projects";
import { useState } from "react";
import NewProject from "./components/addProject";
import Image from "next/image";

export default function ProjectCMSPage() {
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return (
      <div className="p-6">
        <div className="flex flex-row gap-5 items-center mb-6">
          <button
            onClick={() => setIsAdding(false)}
            className="ml-auto text-md font-semibold bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
        <NewProject />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-row gap-5 items-center mb-6">
        <h1 className="text-2xl font-bold">List Projects</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="ml-auto text-md font-semibold bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer"
        >
          ADD
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-5 ">
            <Image
              src={project.logo}
              alt={project.title}
              width={75}
              className="object-contain h-16 mr-5  p-2 rounded-xl "
            />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-sm mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Live Link
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
