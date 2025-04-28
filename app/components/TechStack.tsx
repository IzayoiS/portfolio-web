"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
import StackIcon from "tech-stack-icons";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  return (
    <section id="tech-stack" className="pt-20">
      <h1 className="text-3xl font-extrabold mb-7">
        Tech Stack - Tools I Use Everyday
      </h1>

      <Swiper
        key={theme}
        modules={[Autoplay]}
        spaceBetween={10}
        loop={true}
        centeredSlides={true}
        speed={7000}
        autoplay={{
          delay: 10,
          disableOnInteraction: false,
          reverseDirection: true,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          480: { slidesPerView: 3 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1920: { slidesPerView: 9 },
        }}
      >
        {techs.map((name, index) => (
          <SwiperSlide key={index} className="py-10 ">
            <div className="dark:bg-gray-600 light:bg-white flex items-center justify-center hover:scale-105 transition-transform rounded-xl p-2 w-25 m-auto ">
              <StackIcon
                name={name}
                className="w-12 h-12 flex items-center justify-center"
              />
            </div>
            <p className="mt-2 text-sm font-light capitalize text-center">
              {name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
