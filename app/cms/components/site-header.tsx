"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  console.log("pathname", pathname);

  const navHeaders = [
    { href: "/cms", label: "Dashboard CMS" },
    { href: "/cms/experiences", label: "CMS - Experiences" },
    { href: "/cms/projects", label: "CMS - Projects" },
    { href: "/cms/profile", label: "Edit Profile" },
    { href: "/cms/tech", label: "Add Tech Stack" },
  ];

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center">
        <SidebarTrigger className="ml-4 cursor-pointer hover:bg-muted/20 hover:text-zinc-100" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {navHeaders.map((header) => (
          <h1 key={header.href} className="text-base font-medium">
            {pathname === header.href ? header.label : ""}
          </h1>
        ))}
      </div>
    </header>
  );
}
