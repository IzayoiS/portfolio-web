"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoBLack from "@/public/assets/images/iqbal-logo-black.svg";
import Logo from "@/public/assets/images/iqbal-logo-white.svg";
import BtnDownloadCV from "./ButtonDownloadCV";
import ButtonWhatsapp from "./ButtonWhatsapp";
import ModeToggle from "./ModeToggle";

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
    <nav className="w-full fixed top-0 left-0 dark:bg-black bg-white z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src={LogoBLack}
            alt="Iqbal Muhammad Hasbi"
            width={100}
            className="block dark:hidden"
          />
          <Image
            src={Logo}
            alt="Iqbal Muhammad Hasbi"
            width={100}
            className="hidden dark:block"
          />
        </Link>

        {/* Desktop menu (tampilkan di lg ke atas) */}
        <div className="hidden md:flex gap-5 items-center">
          <button
            onClick={() => handleScroll("tech-stack")}
            className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black"
          >
            Tech Stack
          </button>
          <button
            onClick={() => handleScroll("experience")}
            className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black"
          >
            Experience
          </button>
          <button
            onClick={() => handleScroll("projects")}
            className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black"
          >
            Projects
          </button>
          <ButtonWhatsapp />
          <BtnDownloadCV />
          <ModeToggle />
        </div>

        {/* Hamburger (muncul di bawah lg) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Side drawer menu mobile */}
      <div
        className={`fixed  top-0 right-0 h-full w-[60%] sm:w-[30%] bg-white dark:bg-[#495057] transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button di dalam drawer */}
        <div className="flex justify-end p-4 absolute top-2 right-1">
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} className="text-black dark:text-white" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 mt-16 items-start">
          <button
            onClick={() => handleScroll("tech-stack")}
            className="dark:text-white"
          >
            Tech Stack
          </button>
          <button
            onClick={() => handleScroll("experience")}
            className="dark:text-white"
          >
            Experience
          </button>
          <button
            onClick={() => handleScroll("projects")}
            className="dark:text-white"
          >
            Projects
          </button>
          <ButtonWhatsapp variant="drawer" />
          <BtnDownloadCV variant="drawer" />
          <ModeToggle />
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
