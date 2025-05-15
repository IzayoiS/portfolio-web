"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace(pathname.startsWith("/login") ? "/cms" : pathname);
    }
    setAuthChecked(true);
  }, [router, pathname]);

  if (!authChecked)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height={50} width={50} color="#fff" />
      </div>
    );

  return <>{children}</>;
}
