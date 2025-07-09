"use client";

import { techType, useTechStacks } from "@/hooks/use-tech";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import "swiper/css";
import "swiper/css/pagination";
import { Tech } from "./skeleton/Tech";

export default function CardTechStack() {
  const { data: tech, isLoading } = useTechStacks();

  if (isLoading) return <Tech />;

  return (
    <section id="tech-stack">
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
