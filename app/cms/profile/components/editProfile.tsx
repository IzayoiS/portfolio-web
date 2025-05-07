"use client";

import Image from "next/image";
import ProfileImage from "@/public/assets/images/iqbal.jpg";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "sonner";

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("available");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      try {
        const res = await api.get(`/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profile = res.data;
        console.log("profile", profile);

        setName(profile.name);
        setJobTitle(profile.job_title);
        setBio(profile.bio);
        setLocation(profile.location);
        setAvailability(profile.availability);
        setImagePreview(profile.image_url || null);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast("Failed to fetch profile!");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("job_title", jobTitle);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("availability", availability);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      const res = await api.patch(`/profile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile updated", res.data);
      toast("Profile updated successfully!");
      setImagePreview(res.data.imageURL);
    } catch (err) {
      console.error("Failed to update profile", err);
      toast("Update failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-zinc-100 p-5 rounded shadow flex flex-col gap-4"
    >
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
      <input
        type="text"
        className="border p-1 rounded"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label className="text-md ">Job Title</label>
      <input
        type="text"
        className="border p-1 rounded"
        onChange={(e) => setJobTitle(e.target.value)}
        value={jobTitle}
      />

      <label className="text-md ">Bio</label>
      <textarea
        className="border p-1 rounded  resize-none"
        rows={2}
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      ></textarea>

      <label className="text-md ">Location</label>
      <input
        type="text"
        className="border p-1 rounded"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />

      <label className="text-md ">Available for Work</label>
      <select
        name=""
        id=""
        className="border p-1 rounded w-full mb-2 "
        onChange={(e) => setAvailability(e.target.value)}
        value={availability}
      >
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
