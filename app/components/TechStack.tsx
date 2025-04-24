"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
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
    <section id="tech-stack">
      <h1 className="text-3xl font-extrabold mb-7">
        Tech Stack - Tools I Use Everyday
      </h1>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        loop={true}
        centeredSlides={true}
        speed={7000}
        autoplay-disable-on-interaction="false"
        autoplay={{
          delay: 10,
          disableOnInteraction: false,
          reverseDirection: true,
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
            <div className="bg-white flex items-center justify-center hover:scale-105 transition-transform ">
              <StackIcon name={name} className="w-12 h-12" />
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
