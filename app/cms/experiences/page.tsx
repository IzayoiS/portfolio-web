"use client";

import { experiences } from "@/utils/data/experiences";
import { useState } from "react";
import NewExperience from "./components/addExperience";
import Image from "next/image";

export default function ExperienceCMSPage() {
  const [data] = useState(experiences);
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return (
      <div className="p-4">
        <div className="flex flex-row gap-5 items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Experience</h1>
          <button
            onClick={() => setIsAdding(false)}
            className="ml-auto text-md font-semibold bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
        <NewExperience />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-row gap-5 items-center mb-6">
        <h1 className="text-2xl font-bold">List Experiences</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="ml-auto text-md font-semibold bg-slate-800 text-slate-200 rounded-xl px-4 py-2 cursor-pointer"
        >
          ADD
        </button>
      </div>

      {data.map((exp, idx) => (
        <div key={idx} className="border p-4 rounded mb-4 dark:bg-gray-800">
          <Image
            src={exp.logo}
            alt={exp.company}
            width={75}
            className="object-contain h-16 mr-5 dark:bg-white p-2 rounded-xl "
          />
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
