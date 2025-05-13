"use client";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return router.replace("/login");
      }

      try {
        const res = await api.get("/check");
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router, setUser]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
