import Image from "next/image";
import DownloadCV from "@/public/assets/images/file.png";

interface ButtonDownloadCVProps {
  variant?: "default" | "drawer";
}

export default function ButtonDownloadCV({
  variant = "default",
}: ButtonDownloadCVProps) {
  const baseStyle =
    "px-3 py-2 text-white font-medium rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer";
  const styleMap = {
    default: "bg-black hover:bg-gray-800",
    drawer: "bg-black hover:bg-gray-800 px-13 rounded-xl",
  };

  return (
    <a
      href="https://drive.usercontent.google.com/download?id=16ghmvJ9dKO86tw5oP3w96R9JQs6Knydv&export=download&authuser=0&confirm=t&uuid=5789f477-fa1c-465b-a4a0-d1f78772aa1a&at=AENtkXaWa2qV_6zp8VxsN0QAdB_6:1733158632176"
      rel="noopener noreferrer"
    >
      <button className={`${baseStyle} ${styleMap[variant]}`}>
        <Image
          src={DownloadCV}
          alt="Download CV"
          width={20}
          height={20}
          color="white"
        />
        Download CV
      </button>
    </a>
  );
}
