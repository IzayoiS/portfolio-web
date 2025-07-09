"use client";

import "swiper/css";
import "swiper/css/pagination";
import CardTechStack from "./TechStackCard";

export default function TechStack() {
  return (
    <section id="tech-stack" className="pt-20">
      <h1 className="text-3xl font-extrabold mb-7">
        Tech Stack - Tools I Use Everyday
      </h1>
      <CardTechStack />
    </section>
  );
}
