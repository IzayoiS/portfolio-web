import Whatsapp from "@/public/assets/images/whatsapp.png";
import Image from "next/image";

interface ButtonWhatsappProps {
  variant?: "default" | "drawer";
}

export default function ButtonWhatsapp({
  variant = "default",
}: ButtonWhatsappProps) {
  const baseStyle =
    "px-3 py-2 text-white font-medium rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer";
  const styleMap = {
    default: "bg-green-500 hover:bg-green-600",
    drawer: "bg-green-500 rounded-xl px-18",
  };

  return (
    <a
      href="https://wa.me/6282122989338"
      rel="noopener noreferrer"
      target="_blank"
    >
      <button className={`${baseStyle} ${styleMap[variant]}`}>
        <Image src={Whatsapp} alt="Whatsapp" width={20} height={20} />
        Lets Talk
      </button>
    </a>
  );
}
