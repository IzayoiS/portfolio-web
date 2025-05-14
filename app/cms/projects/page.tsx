"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectType, useDeleteProject, useProject } from "@/hooks/use-project";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import AddProject from "./components/addProject";
import EditProject from "./components/editProject";

export default function ProjectCMSPage() {
  const { data: projects, isLoading } = useProject();
  const { mutate: deleteProject } = useDeleteProject();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height={50} width={50} color="#fff" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-row gap-5 items-center mb-6">
        <h1 className="text-2xl font-bold">List Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer">
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-zinc-100 max-w-md cursor-pointer">
            <DialogHeader>Add New Project</DialogHeader>
            <AddProject />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects?.map((project: ProjectType) => (
          <div
            key={project.id}
            className="border border-gray-700 rounded-lg p-4 "
          >
            <div className="flex justify-between items-center mb-4">
              {project.logo && (
                <Image
                  src={project.logo}
                  alt={project.project_name}
                  width={75}
                  height={75}
                  className="object-contain h-16 w-16 rounded-xl"
                />
              )}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer bg-slate-800 text-zinc-100">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-zinc-100 max-w-md">
                    <DialogHeader>Edit Project</DialogHeader>
                    <EditProject project={project} onClose={() => {}} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => deleteProject(project.id)}
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {project.project_name}
            </h2>
            <p className="text-sm mb-3 text-gray-300">{project.descriptions}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech_stack?.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-full"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {project.link_website && (
                <a
                  href={project.link_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Live Link
                </a>
              )}
              {project.link_github && (
                <a
                  href={project.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
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
