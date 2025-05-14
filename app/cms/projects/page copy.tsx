"use client";

import { projects } from "@/utils/data/projects";
import { useState } from "react";
import NewProject from "./components/addProject";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProject, { Project } from "./components/editProject";

export default function ProjectCMSPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <div className="p-4">
      <div className="flex flex-row gap-5 items-center mb-6">
        <h1 className="text-2xl font-bold">List Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto text-md font-semibold bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer">
              ADD
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black w-fit text-zinc-100">
            <DialogTitle>Add Project</DialogTitle>
            <NewProject />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-5">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <Image
                src={project.logo}
                alt={project.projectName}
                width={75}
                className="object-contain h-16 mr-5  p-2 rounded-xl "
              />
              <Dialog>
                <DialogTrigger>
                  <Button
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                    className="bg-slate-800 text-slate-200 text-md font-semibold rounded-xl px-4 py-2 cursor-pointer"
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black text-zinc-100 ">
                  <DialogTitle>Edit Project</DialogTitle>
                  <EditProject data={selectedProject} />
                </DialogContent>
              </Dialog>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {project.projectName}
            </h2>
            <p className="text-sm mb-3">{project.descriptions}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {project.linkWebsite && (
                <a
                  href={project.linkWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Live Link
                </a>
              )}
              {project.linkGithub && (
                <a
                  href={project.linkGithub}
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
