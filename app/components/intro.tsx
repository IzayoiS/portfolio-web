"use client";

import Image from "next/image";
import ButtonDownloadCV from "./ButtonDownloadCV";
import ButtonWhatsapp from "./ButtonWhatsapp";
import PinLocation from "@/public/assets/images/pin.png";
import CircleLocation from "@/public/assets/images/button.png";
import PinLocationWhite from "@/public/assets/images/arrows.png";
import ProfileImage from "@/public/assets/images/iqbal.jpg";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "sonner";

interface Profile {
  id: number;
  user_id: number;
  name: string;
  job_title: string;
  bio: string;
  location: string;
  availability: string;
  image_url: string;
}

export default function Intro() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/1");
        const profile = res.data;
        console.log("respon profile FE", profile);
        setProfile(profile);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        toast("Failed to fetch profile!");
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-10 pt-26 px-6">
      <div className="xl:m-auto xl:p-10">
        <div className="w-full max-w-[350px] aspect-square rounded-2xl overflow-hidden shadow-xl xl:mr-20">
          <Image
            src={ProfileImage}
            alt="Iqbal Muhammad Hasbi"
            width={350}
            height={350}
            className="object-cover "
          />
        </div>
      </div>
      <div className="max-w-2xl text-center lg:text-left">
        <h1 className="text-6xl font-extrabold mb-3">
          Hi, I&apos;m {profile?.name} 👋
        </h1>
        <h2 className="text-2xl text-gray-700 mb-4 dark:text-gray-400">
          A passionate Web Developer
        </h2>
        <p className="text-gray-600 mb-4 text-xl dark:text-gray-400">
          I build and ship digital products from scratch to production.
          Passionate about creating end-to-end solutions and turning ideas into
          fully functional applications. With expertise in both frontend and
          backend development
        </p>
        <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-700 mb-2">
          <Image
            src={PinLocation}
            alt="Location"
            width={18}
            height={18}
            className="block dark:hidden"
          />
          <Image
            src={PinLocationWhite}
            alt="Location"
            width={18}
            height={18}
            className="hidden dark:block"
          />
          <span className="dark:text-gray-400">Depok, Sawangan, Indonesia</span>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-700 mb-2">
          <Image
            src={CircleLocation}
            alt="Location"
            width={10}
            height={10}
            className="m-1"
          />
          <span className="ml-0 dark:text-gray-400">
            Available for new projects
          </span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-4">
          <ButtonWhatsapp />
          <ButtonDownloadCV />
        </div>
      </div>
    </section>
  );
}
