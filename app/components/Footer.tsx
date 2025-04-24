import InstagramLogo from "@/public/assets/images/instagram.png";
import GithubLogo from "@/public/assets/images/github.png";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col items-center p-10 text-sm font-extralight border-t border-gray-200">
      <p className="text-md font-light text-center mb-3">
        © 2025 Designed and coded with ❤️ by Iqbal Muhammad Hasbi
      </p>
      <div className="flex w-20 justify-center gap-3">
        <Image
          src={GithubLogo}
          alt="GitHub"
          width={20}
          height={20}
          className="cursor-pointer filter grayscale-100 hover:grayscale-0 transition duration-300"
        />
        <Image
          src={InstagramLogo}
          alt="Instagram"
          width={20}
          height={20}
          className="cursor-pointer filter grayscale-100 hover:grayscale-0 transition duration-300"
        />
      </div>
    </div>
  );
}
