import LinkedInLogo from "@/public/assets/images/linkedin.png";
import GithubLogoBlack from "@/public/assets/images/github.png";
import GithubLogo from "@/public/assets/images/github-white.png";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col items-center p-10 text-sm font-extralight border-t border-gray-200 dark:border-gray-600">
      <p className="text-md font-light text-center mb-3">
        © 2025 Designed and coded with ❤️ by Iqbal Muhammad Hasbi
      </p>
      <div className="flex w-20 justify-center gap-3">
        <a href="https://github.com/IzayoiS" target="_blank">
          <Image
            src={GithubLogoBlack}
            alt="GitHub"
            width={20}
            height={20}
            className="block dark:hidden cursor-pointer filter grayscale-100 hover:grayscale-0 transition duration-300"
          />
          <Image
            src={GithubLogo}
            alt="GitHub"
            width={20}
            height={20}
            className="hidden dark:block cursor-pointer filter grayscale-100 hover:grayscale-0 transition duration-300"
          />
        </a>
        <a href="https://www.linkedin.com/in/iqbalmhasbi/" target="_blank">
          <Image
            src={LinkedInLogo}
            alt="Instagram"
            width={20}
            height={20}
            className="cursor-pointer filter grayscale-100 hover:grayscale-0 transition duration-300"
          />
        </a>
      </div>
    </div>
  );
}
