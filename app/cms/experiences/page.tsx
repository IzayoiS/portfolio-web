"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExpType, useExperience } from "@/hooks/use-experience";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import NewExperience from "./components/addExperience";
import EditExperience from "./components/editExperience";
import LogoWeb from "@/public/assets/images/iqbal-logo-white.svg";
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
import { useDeleteExperience } from "@/hooks/use-experience";
import { useState } from "react";

export default function ExperienceCMSPage() {
  const { data: experiences, isLoading } = useExperience();
  const { mutate: deleteExperience } = useDeleteExperience();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ExpType | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditingExperience(null);
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
        <h1 className="text-2xl font-bold">List Experiences</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer">
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-zinc-100 max-w-md">
            <DialogHeader>Add New Experience</DialogHeader>
            <NewExperience onClose={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {experiences?.map((exp: ExpType) => (
          <div key={exp.id} className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <Image
                src={exp.logo || LogoWeb}
                alt={exp.company}
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
                      className="bg-slate-800 text-slate-200 cursor-pointer"
                      onClick={() => {
                        setEditingExperience(exp);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-zinc-100 max-w-md">
                    <DialogHeader>Edit Experience</DialogHeader>
                    {editingExperience && (
                      <EditExperience
                        experience={editingExperience}
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
                  <AlertDialogContent className="bg-black text-zinc-100">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this experience.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer text-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteExperience(exp.id)}
                        className=" bg-destructive cursor-pointer hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-1">{exp.role}</h2>
            <p className="text-green-500 mb-3">{exp.company}</p>
            <p className="text-sm text-gray-400">
              {exp.start_month} {exp.start_year} -{" "}
              {exp.currently_working
                ? "Present"
                : `${exp.end_month} ${exp.end_year}`}
            </p>
            <ul className="list-disc pl-5 mt-3">
              {exp.descriptions?.map((desc, i) => (
                <li key={i} className="text-sm mb-1">
                  {desc}
                </li>
              )) || (
                <li className="text-sm text-gray-500 italic">
                  No descriptions
                </li>
              )}
            </ul>
            <div className="flex flex-wrap gap-2 py-3">
              {exp.tech_stack ? (
                exp.tech_stack.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-full"
                  >
                    {tech.trim()}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 italic mt-2">
                  No Tech Stack
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
