import { useState } from "react";

export default function NewExperience() {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const currentYear = new Date().getFullYear();
  const [descriptions, setDescriptions] = useState<string[]>([""]);

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
    <form className="bg-slate-800 text-slate-200 p-6 rounded shadow flex flex-col gap-4">
      <label className="text-md">Company *</label>
      <input type="text" className="border p-1 rounded" />

      <label className="text-md">Role *</label>
      <input type="text" className="border p-1 rounded" />

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
            <select className="border p-1 rounded w-full">
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <select className="border p-1 rounded w-full">
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
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
            >
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <select
              className="border p-1 rounded w-full disabled:bg-slate-600 disabled:text-slate-400"
              disabled={isCurrentlyWorking}
            >
              <option value="" className="dis">
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
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
          <textarea
            className="border rounded resize-none w-full"
            rows={2}
            value={desc}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRemoveDescription(index)}
            className="bg-red-500 text-white px-3 py-3 rounded cursor-pointer"
          >
            Delete
          </button>
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
        Submit
      </button>
    </form>
  );
}
