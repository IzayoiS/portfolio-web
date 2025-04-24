import NocolaLogo from "@/public/assets/images/nocola.png";
import Image from "next/image";

export default function CardExperience() {
  return (
    <div className="p-1 flex flex-row gap-4 justify-between md:flex-row ">
      <div className="flex gap-4 items-start ">
        <Image
          src={NocolaLogo}
          alt="Nocola"
          width={64}
          height={64}
          className="mt-5 mr-5"
        />
        <div>
          <h1 className="text-lg font-semibold">
            Internship Full Stack Web Developer
          </h1>
          <p className="text-md font-light text-green-500">
            Nocola IOT Solution
          </p>
          <ul className="list-disc mt-4 ml-4">
            <li className="text-md font-light">
              Assisted in developing web applications using HTML, CSS, and
              JavaScript
            </li>
            <li className="text-md font-light">
              Worked on IoT projects involving hardware integration and PCB
              assembly
            </li>
            <li className="text-md font-light">
              Identified and fixed software bugs, ensuring optimal performance
              and security
            </li>
          </ul>
          <div className="flex gap-5 m-3 font-normal text-xs">
            <p className="bg-gray-200 p-1 text-center w-20 h-auto rounded-2xl ">
              JavaScript
            </p>
            <p className="bg-gray-200 p-1 text-center w-20 h-auto rounded-2xl ">
              React.js
            </p>
            <p className="bg-gray-200 p-1 text-center w-20 h-auto rounded-2xl ">
              PostgreSQL
            </p>
            <p className="bg-gray-200 p-1 text-center w-20 h-auto rounded-2xl ">
              Tailwind
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end text-sm font-extralight ">
        May 2019 - Oct 2019
      </div>
    </div>
  );
}
