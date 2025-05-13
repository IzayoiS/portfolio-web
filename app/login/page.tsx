"use client";

import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";
import { LoginSchema, LoginSchemaDTO } from "@/utils/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import GuestRoute from "../components/GuestRoute";
import { useAuth } from "@/store/user";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginSchemaDTO) {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      login(
        {
          id: user.ID,
          username: user.Name,
          email: user.Email,
          avatar: user.image_url || "/default-avatar.png",
        },
        token
      );

      toast("Login success!");
      router.push("/cms");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.error || "Login failed";
        console.error("Axios login error", error);
        return toast(message);
      }

      toast("Something went wrong");
    }
  }

  return (
    <GuestRoute>
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="bg-black text-zinc-100 p-8 w-full max-w-md shadow-md flex flex-col gap-5 border-slate-200 border rounded-lg">
          <h1 className="text-2xl font-bold text-center">Login to CMS</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <Input
                type="text"
                placeholder="Email address"
                className="outline-none focus:outline-none shadow-none focus:shadow-none"
                autoComplete="off"
                {...register("email")}
              />
              {errors.email && (
                <AlertDescription className="text-red-400 m-2">
                  {errors.email.message}
                </AlertDescription>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                className="border-2 outline-none p-3 rounded w-full"
                {...register("password")}
              />
              {errors.password && (
                <AlertDescription className="text-red-400 m-2">
                  {errors.password.message}
                </AlertDescription>
              )}
            </div>

            <Button
              type="submit"
              className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 cursor-pointer transition"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </GuestRoute>
  );
}
