import WhatsappLogo from "@/public/assets/images/whatsapp.png";
import MailLogo from "@/public/assets/images/mail.png";
import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="text-center py-20">
      <h2 className="text-3xl font-extrabold mb-4">
        Let’s build something together
      </h2>
      <p className="text-gray-600 mb-6">
        Feel free to reach out if you&apos;re looking for a developer, have a
        question, or just want to connect.
      </p>
      <div className="flex flex-row gap-8 justify-center">
        <div className="flex flex-row gap-3 border-r-1">
          <Image src={MailLogo} alt="Mail" width={20} height={25} />
          <p className="mr-6 text-gray-500">iqbalmhasby54@gmail.com</p>
        </div>
        <div className="flex flex-row gap-3 ">
          <Image src={WhatsappLogo} alt="Whatsapp" width={20} height={25} />
          <p>+62 821-2298-9338</p>
        </div>
      </div>
    </section>
  );
}
