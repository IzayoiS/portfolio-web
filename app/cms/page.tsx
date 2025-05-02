import DashboardCMS from "@/public/assets/images/dashboard.jpg";
import Image from "next/image";

export default function CMS() {
  return (
    <div className="p-4">
      <Image
        src={DashboardCMS}
        alt="Dashboard"
        className="object-cover h-100 mb-5"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Experiences</h2>
          <p className="text-slate-400">
            Add, edit, or delete your work experiences.
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Projects</h2>
          <p className="text-slate-400">Add, edit, or delete your projects.</p>
        </div>
      </div>
    </div>
  );
}
