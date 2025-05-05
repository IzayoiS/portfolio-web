"use client";

import Image from "next/image";
import ProfileImage from "@/public/assets/images/iqbal.jpg";
import { useState } from "react";

export default function EditProfile() {
  const [, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  return (
    <form className="bg-black text-zinc-100 p-5 rounded shadow flex flex-col gap-4">
      <div className="flex justify-center mb-4">
        <div className="relative w-36 h-36 rounded-full overflow-hidden">
          <Image
            src={imagePreview || ProfileImage}
            alt="Profile"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>
      </div>

      <label
        htmlFor="profile-image"
        className="flex justify-center w-50 m-auto items-center cursor-pointer text-blue-500"
      >
        Change Profile Image
      </label>
      <input
        type="file"
        id="profile-image"
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <label className="text-md ">Name</label>
      <input type="text" className="border p-1 rounded  " />

      <label className="text-md ">Job Title</label>
      <input type="text" className="border p-1 rounded " />

      <label className="text-md ">Bio</label>
      <textarea className="border p-1 rounded  resize-none" rows={2}></textarea>

      <label className="text-md ">Location</label>
      <input type="text" className="border p-1 rounded " />

      <label className="text-md ">Available for Work</label>
      <select name="" id="" className="border p-1 rounded w-full mb-2 ">
        <option
          value="available"
          className="bg-slate-800
"
        >
          Available
        </option>
        <option
          value="not-available"
          className="bg-slate-800
"
        >
          Not Available
        </option>
      </select>

      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
