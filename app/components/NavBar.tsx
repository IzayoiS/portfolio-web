"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/public/assets/images/logo.svg";
import BtnDownloadCV from "./ButtonDownloadCV";
import ButtonWhatsapp from "./ButtonWhatsapp";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white  z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} alt="Iqbal Muhammad Hasbi" width={100} />
        </Link>

        {/* Desktop menu (tampilkan di lg ke atas) */}
        <div className="hidden lg:flex gap-4 items-center">
          <button onClick={() => handleScroll("tech-stack")}>Tech Stack</button>
          <button onClick={() => handleScroll("experience")}>Experience</button>
          <button onClick={() => handleScroll("projects")}>Projects</button>
          <Link href="/">Contact</Link>
          <ButtonWhatsapp />
          <BtnDownloadCV />
        </div>

        {/* Hamburger (muncul di bawah lg) */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Side drawer menu mobile */}
      <div
        className={`fixed  top-0 right-0 h-full w-[80%] sm:w-[30%] bg-white transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button di dalam drawer */}
        <div className="flex justify-end p-4 absolute top-2 right-1">
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 mt-16 items-start">
          <button onClick={() => handleScroll("tech-stack")}>Tech Stack</button>
          <button onClick={() => handleScroll("experience")}>Experience</button>
          <button onClick={() => handleScroll("projects")}>Projects</button>
          <ButtonWhatsapp variant="drawer" />
          <BtnDownloadCV variant="drawer" />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
