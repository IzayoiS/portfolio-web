"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LogoWeb from "@/public/assets/images/iqbal-logo-white.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectType, useDeleteProject, useProject } from "@/hooks/use-project";
import Image from "next/image";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import AddProject from "./components/addProject";
import EditProject from "./components/editProject";

export default function ProjectCMSPage() {
  const { data: projects, isLoading } = useProject();
  const { mutate: deleteProject } = useDeleteProject();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditingProject(null);
    setIsAddDialogOpen(false);
  };

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer">
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-zinc-100 max-w-md cursor-pointer">
            <DialogTitle>Add New Project</DialogTitle>
            <AddProject onClose={handleDialogClose} />
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
              <Image
                src={project.logo || LogoWeb}
                alt={project.project_name}
                width={75}
                height={75}
                className="object-contain h-16 w-16 rounded-xl"
              />
              <div className="flex gap-2 ml-auto">
                <Dialog
                  open={isEditDialogOpen}
                  onOpenChange={setIsEditDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="cursor-pointer bg-slate-800 text-zinc-100"
                      onClick={() => {
                        setEditingProject(project);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-zinc-100 max-w-md">
                    <DialogHeader>Edit Project</DialogHeader>
                    {editingProject && (
                      <EditProject
                        project={editingProject}
                        onClose={handleDialogClose}
                      />
                    )}
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="cursor-pointer">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black text-zinc-100 border-none">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-zinc-100">
                        This action cannot be undone. This will permanently
                        delete the project.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer text-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteProject(project.id)}
                        className="bg-destructive cursor-pointer hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
