"use client";

import Marquee from "react-fast-marquee";
import "swiper/css";
import "swiper/css/pagination";
import StackIcon from "tech-stack-icons";

const techs = [
  "tailwindcss",
  "nodejs",
  "js",
  "typescript",
  "postgresql",
  "nextjs",
  "mysql",
  "zod",
  "chakraui",
  "git",
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="pt-20">
      <h1 className="text-3xl font-extrabold mb-7">
        Tech Stack - Tools I Use Everyday
      </h1>
      <Marquee direction="right" loop={0} autoFill={true}>
        {techs.map((name, index) => (
          <div key={index}>
            <div className="dark:bg-gray-600 bg-white flex flex-col items-center justify-center hover:scale-105 transition-transform rounded-xl p-4 mx-4">
              <StackIcon
                name={name}
                className="w-12 h-12 flex items-center justify-center"
              />
            </div>
            <p className="mt-2 text-sm font-light capitalize text-center">
              {name}
            </p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
