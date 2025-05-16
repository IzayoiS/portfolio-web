"use client";

import { useProfile } from "@/hooks/use-profile";
import PinLocationWhite from "@/public/assets/images/arrows.png";
import CircleLocation from "@/public/assets/images/button.png";
import ProfileImage from "@/public/assets/images/iqbal.jpg";
import PinLocation from "@/public/assets/images/pin.png";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import ButtonDownloadCV from "./ButtonDownloadCV";
import ButtonWhatsapp from "./ButtonWhatsapp";

export default function Intro() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <TailSpin visible={true} height={50} width={50} color="#fff" />
      </div>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-10 pt-26 px-6">
      <div className="xl:m-auto xl:p-10">
        <div className="w-full max-w-[350px] aspect-square rounded-2xl overflow-hidden shadow-xl xl:mr-20">
          <Image
            src={profile?.image_url || ProfileImage}
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
          {profile?.job_title}
        </h2>
        <p className="text-gray-600 mb-4 text-xl dark:text-gray-400">
          {profile?.bio}
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
          <span className="dark:text-gray-400">{profile?.location}</span>
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
            {profile?.availability === "available"
              ? "Available for new projects"
              : "Currently employed, but open to new opportunities"}
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
