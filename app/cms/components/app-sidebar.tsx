"use client";

import { Briefcase, Code2, FolderKanban, Home, UserCircle } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogoBLack from "@/public/assets/images/iqbal-logo-black.svg";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NavUser from "./nav-user";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/cms",
    icon: Home,
  },
  {
    title: "Experiences",
    url: "/cms/experiences",
    icon: Briefcase,
  },
  {
    title: "Projects",
    url: "/cms/projects",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    url: "/cms/profile",
    icon: UserCircle,
  },
  {
    title: "Tech Stack",
    url: "/cms/tech",
    icon: Code2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) return;

        const res = await api.get(`/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        setUser({
          id: userId,
          username: data.name,
          email: data.User.Email,
          avatar: data.image_url || "/default-avatar.png",
        });
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUsers();
  }, [setUser]);

  return (
    <Sidebar>
      <SidebarHeader className="bg-[#171923] text-zinc-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-black hover:text-zinc-100"
            >
              <a href="/cms">
                <Image src={LogoBLack} alt="Iqbal" className="h-20 w-20" />
                <span className="text-base font-semibold">Iqbal</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#171923] text-zinc-100">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-blue-600 hover:text-zinc-50 active:bg-blue-500"
                >
                  <a
                    href={item.url}
                    className={`${pathname === item.url ? "bg-blue-700" : ""}`}
                  >
                    <item.icon />
                    <span
                      className={`${
                        pathname === item.url ? "text-white font-semibold" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0 m-o">
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
