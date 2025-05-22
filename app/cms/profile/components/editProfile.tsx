"use client";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import ProfileImage from "@/public/assets/images/iqbal.jpg";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

export default function EditProfile() {
  const { data: profile, isLoading } = useProfile(1);
  const { user, token } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.patch(`/profile/${user?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setImagePreview(data.image_url);
      toast("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update profile", error);
      toast("Update failed!");
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (user?.id) {
      formData.append("userId", user.id);
    }

    updateProfileMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <TailSpin visible={true} height={50} width={50} color="#fff" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-zinc-100 p-5 rounded shadow flex flex-col gap-4"
    >
      <div className="flex justify-center mb-4">
        <div className="relative w-36 h-36 rounded-full overflow-hidden">
          <Image
            src={imagePreview || profile?.image_url || ProfileImage}
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
        name="image"
        accept="image/*"
        className="hidden"
      />

      <div className="space-y-4">
        <div>
          <label className="text-md">Name</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            className="w-full border p-2 rounded"
            defaultValue={profile?.name || ""}
          />
        </div>

        <div>
          <label className="text-md">Job Title</label>
          <input
            type="text"
            name="job_title"
            className="w-full border p-2 rounded"
            defaultValue={profile?.job_title || ""}
          />
        </div>

        <div>
          <label className="text-md">Bio</label>
          <textarea
            name="bio"
            className="w-full border p-2 rounded resize-none"
            rows={3}
            defaultValue={profile?.bio || ""}
          ></textarea>
        </div>

        <div>
          <label className="text-md">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border p-2 rounded"
            autoComplete="off"
            defaultValue={profile?.location || ""}
          />
        </div>

        <div>
          <label className="text-md">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            autoComplete="off"
            defaultValue={profile?.email || ""}
          />
        </div>

        <div>
          <label className="text-md">Phone Number</label>
          <input
            type="text"
            name="phone"
            className="w-full border p-2 rounded"
            autoComplete="off"
            defaultValue={profile?.phone || ""}
          />
        </div>

        <div>
          <label className="text-md">Available for Work</label>
          <select
            name="availability"
            className="w-full border p-2 rounded bg-black"
            defaultValue={profile?.availability || "available"}
          >
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={updateProfileMutation.isPending}
        className="cursor-pointer text-white py-2 rounded transition-colors "
      >
        {updateProfileMutation.isPending ? (
          <div className="flex justify-center items-center">
            <TailSpin visible={true} height={25} width={25} color="#fff" />
          </div>
        ) : (
          "Save"
        )}
      </Button>
    </form>
  );
}
