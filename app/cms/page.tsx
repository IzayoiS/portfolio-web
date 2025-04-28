import DashboardCMS from "@/public/assets/images/dashboard.jpg";
import Image from "next/image";

export default function CMS() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard CMS</h1>
      <Image
        src={DashboardCMS}
        alt="Dashboard"
        className="object-cover h-100 mb-5"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Experiences</h2>
          <p className="text-gray-600">
            Add, edit, or delete your work experiences.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Projects</h2>
          <p className="text-gray-600">Add, edit, or delete your projects.</p>
        </div>
      </div>
    </div>
  );
}
