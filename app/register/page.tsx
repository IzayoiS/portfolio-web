import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-full max-w-md rounded shadow-md flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">Register to CMS</h1>
        <div className="flex flex-row gap-2 justify-center text-sm">
          <p>Have an account?</p>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
        <Input
          type="text"
          placeholder="Full Name"
          className="border-2 outline-none p-3 rounded"
        />
        <Input
          type="text"
          placeholder="Email address"
          className="border-2 outline-none p-3 rounded"
        />
        <Input
          type="password"
          placeholder="Password"
          className="border-2 outline-none p-3 rounded"
        />
        <Button className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 cursor-pointer transition">
          Register
        </Button>
      </div>
    </div>
  );
}
