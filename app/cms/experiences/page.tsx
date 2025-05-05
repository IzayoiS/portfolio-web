"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { experiences } from "@/utils/data/experiences";
import Image from "next/image";
import { useState } from "react";
import NewExperience from "./components/addExperience";
import EditExperience, { Experience } from "./components/editExperience";
import { Button } from "@/components/ui/button";

export default function ExperienceCMSPage() {
  const [data] = useState(experiences);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  return (
    <div className="p-4">
      <div className="flex flex-row gap-5 items-center mb-6">
        <h1 className="text-2xl font-bold">List Experiences</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto text-md font-semibold bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer">
              ADD
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-zinc-100 overflow-y-auto">
            <DialogTitle>Add Experience</DialogTitle>
            <NewExperience />
          </DialogContent>
        </Dialog>
      </div>

      {data.map((exp, idx) => (
        <div key={idx} className="border p-4 rounded mb-4 dark:bg-gray-800">
          <div className="flex justify-between items-center">
            <Image
              src={exp.logo}
              alt={exp.company}
              width={75}
              className="object-contain h-16 mr-5 dark:bg-white p-2 rounded-xl"
            />
            <Dialog>
              <DialogTrigger>
                <Button
                  onClick={() => {
                    setSelectedExperience(exp);
                  }}
                  className="bg-slate-800 text-slate-200 text-md font-semibold rounded-xl px-4 py-2 cursor-pointer"
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black text-zinc-100">
                <DialogTitle>Edit Experience</DialogTitle>
                <EditExperience data={selectedExperience} />
              </DialogContent>
            </Dialog>
          </div>
          <h2 className="font-semibold text-xl">{exp.role}</h2>
          <p className="text-green-500">{exp.company}</p>
          <p className="text-sm text-gray-400">{exp.period}</p>
          <ul className="list-disc pl-5 my-2">
            {exp.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
