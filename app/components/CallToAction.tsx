"use client";

import { useProfile } from "@/hooks/use-profile";
import MailLogo from "@/public/assets/images/mail-white.svg";
import MailLogoBlack from "@/public/assets/images/mail.svg";
import WhatsappLogo from "@/public/assets/images/whatsapp.png";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function CallToAction() {
  const { data: profile, isLoading } = useProfile(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <TailSpin visible={true} height={50} width={50} color="#fff" />
      </div>
    );
  }

  return (
    <section className="text-center py-20">
      <h2 className="text-3xl font-extrabold mb-4">
        Let’s build something together
      </h2>
      <p className="text-gray-600 mb-6 dark:text-white">
        Feel free to reach out if you&apos;re looking for a developer, have a
        question, or just want to connect.
      </p>
      <div className="flex flex-col gap-8 justify-center sm:flex sm:flex-row items-center">
        <div className="md:border-r-1">
          <a href="mailto:iqbalmhasbi@gmail.com" className="flex gap-3">
            <Image
              src={MailLogoBlack}
              alt="Mail"
              width={20}
              height={25}
              className="block dark:hidden"
            />
            <Image
              src={MailLogo}
              alt="Mail"
              width={20}
              height={25}
              className="hidden dark:block dark:w-6"
            />
            <p className="text-sm md:mr-6 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
              {profile?.email}
            </p>
          </a>
        </div>
        <div>
          <a
            href="https://wa.me/6282122989338"
            target="_blank"
            className="flex flex-row gap-3"
          >
            <Image src={WhatsappLogo} alt="Whatsapp" width={20} />
            <p className="text-sm">
              {profile?.phone.match(/.{1,4}/g)?.join("-")}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
