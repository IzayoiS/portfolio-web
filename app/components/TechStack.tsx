"use client";

import { techType, useTechStacks } from "@/hooks/use-tech";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { TailSpin } from "react-loader-spinner";
import "swiper/css";
import "swiper/css/pagination";

export default function TechStack() {
  const { data: tech, isLoading } = useTechStacks();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <TailSpin visible={true} height={50} width={50} color="#fff" />
      </div>
    );
  }

  return (
    <section id="tech-stack" className="pt-20">
      <h1 className="text-3xl font-extrabold mb-7">
        Tech Stack - Tools I Use Everyday
      </h1>
      <Marquee direction="right" loop={0} autoFill={true}>
        {tech.map((tc: techType) => (
          <div
            key={tc.id}
            className="w-28 h-28 flex flex-col items-center justify-between mx-4 mt-2"
          >
            <div className="bg-white dark:bg-gray-600 rounded-xl p-4 hover:scale-105 transition-transform">
              <Image
                src={tc.icon}
                alt={tc.name}
                width={50}
                height={50}
                className="m-auto"
              />
            </div>
            <p className="text-sm font-light text-center">{tc.name}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
