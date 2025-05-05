import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo: StaticImageData;
  stack: string[];
}

function convertMonthNameToFull(shortMonth: string) {
  const months = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
    Des: "December",
  };
  return months[shortMonth as keyof typeof months] || "";
}

export default function EditExperience({ data }: { data: Experience | null }) {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const currentYear = new Date().getFullYear();
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");

  useEffect(() => {
    if (data) {
      setCompany(data.company || "");
      setDescriptions(data.description || "");
      setRole(data.role || "");
      if (data.period) {
        const [start, end] = data.period.split(" - ");
        if (start) {
          const [startMonthName, startYearNum] = start.split(" ");
          setStartMonth(convertMonthNameToFull(startMonthName));
          setStartYear(startYearNum);
        }
        if (end) {
          if (end.toLowerCase() === "present") {
            setIsCurrentlyWorking(true);
          } else {
            const [endMonthName, endYearNum] = end.split(" ");
            setEndMonth(convertMonthNameToFull(endMonthName));
            setEndYear(endYearNum);
          }
        }
      }
    }
  }, [data]);

  const years = [];
  for (let i = 2000; i <= currentYear; i++) {
    years.push(i);
  }

  const handleCheckboxChange = () => {
    setIsCurrentlyWorking(!isCurrentlyWorking);
  };

  const handleAddDescription = () => {
    setDescriptions((prev) => [...prev, ""]);
  };

  const handleRemoveDescription = (index: number) => {
    setDescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setDescriptions((prev) =>
      prev.map((desc, i) => (i === index ? value : desc))
    );
  };

  return (
    <form className="bg-black text-zinc-100 p-6 rounded shadow flex flex-col gap-4">
      <label className="text-md">Company *</label>
      <input
        type="text"
        className="border p-1 rounded"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <label className="text-md">Role *</label>
      <input
        type="text"
        className="border p-1 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="currentlyWorking"
          checked={isCurrentlyWorking}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="currentlyWorking" className="text-md">
          I am currently working in this role
        </label>
      </div>

      <label className="text-md">Period *</label>
      <div className="flex flex-col gap-4 w-100">
        <div className="flex flex-col gap-5">
          <label className="text-md">Start Date *</label>
          <div className="flex items-center gap-5">
            <select
              className="border p-1 rounded w-full"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              <option value="" className="bg-slate-800">
                Month
              </option>
              <option value="January" className="bg-slate-800">
                January
              </option>
              <option value="February" className="bg-slate-800">
                February
              </option>
              <option value="March" className="bg-slate-800">
                March
              </option>
              <option value="April" className="bg-slate-800">
                April
              </option>
              <option value="May" className="bg-slate-800">
                May
              </option>
              <option value="June" className="bg-slate-800">
                June
              </option>
              <option value="July" className="bg-slate-800">
                July
              </option>
              <option value="August" className="bg-slate-800">
                August
              </option>
              <option value="September" className="bg-slate-800">
                September
              </option>
              <option value="October" className="bg-slate-800">
                October
              </option>
              <option value="November" className="bg-slate-800">
                November
              </option>
              <option value="December" className="bg-slate-800">
                December
              </option>
            </select>

            <select
              className="border p-1 rounded w-full"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              <option value="" className="bg-slate-800">
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year} className="bg-slate-800">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-md">End Date *</label>
          <div className="flex items-center gap-5">
            <select
              className="border p-1 rounded w-full disabled:bg-slate-600 disabled:text-slate-400"
              disabled={isCurrentlyWorking}
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            >
              <option value="" className="bg-slate-800">
                Month
              </option>
              <option value="January" className="bg-slate-800">
                January
              </option>
              <option value="February" className="bg-slate-800">
                February
              </option>
              <option value="March" className="bg-slate-800">
                March
              </option>
              <option value="April" className="bg-slate-800">
                April
              </option>
              <option value="May" className="bg-slate-800">
                May
              </option>
              <option value="June" className="bg-slate-800">
                June
              </option>
              <option value="July" className="bg-slate-800">
                July
              </option>
              <option value="August" className="bg-slate-800">
                August
              </option>
              <option value="September" className="bg-slate-800">
                September
              </option>
              <option value="October" className="bg-slate-800">
                October
              </option>
              <option value="November" className="bg-slate-800">
                November
              </option>
              <option value="December" className="bg-slate-800">
                December
              </option>
            </select>

            <select
              className="border p-1 rounded w-full disabled:bg-slate-600 disabled:text-slate-400"
              disabled={isCurrentlyWorking}
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            >
              <option value="" className="bg-slate-800 dis">
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year} className="bg-slate-800">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-md">Description</label>
        <button
          type="button"
          onClick={handleAddDescription}
          className="bg-green-500 text-white px-3 py-1 rounded w-fit cursor-pointer"
        >
          Add Description
        </button>
      </div>

      {descriptions.map((desc, index) => (
        <div key={index} className="flex items-center gap-2">
          <Textarea
            className="border rounded resize-none w-full pl-1"
            rows={2}
            value={desc}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleRemoveDescription(index)}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>
      ))}

      <label className="text-md">Logo</label>
      <input
        type="file"
        className="bg-slate-800 h-10 w-100 p-2 cursor-pointer rounded-xs"
      />

      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white py-2 rounded mt-3"
      >
        Save
      </button>
    </form>
  );
}
