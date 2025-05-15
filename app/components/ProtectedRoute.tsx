"use client";
import { useAuth } from "@/store/user";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authChecked, setAuthChecked] = useState<boolean | null>(null);
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/check");
        if (res.ok) {
          setUser(await res.json());
        }
      } finally {
        setAuthChecked(false);
      }
    };
    verifyAuth();
  }, [setUser]);

  if (!authChecked)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height={50} width={50} color="#fff" />
      </div>
    );

  return <>{children}</>;
}
