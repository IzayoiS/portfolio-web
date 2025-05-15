"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function NavUser({
  user,
}: {
  user: {
    username: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    Cookies.remove("token");
    router.push("/login");
  }

  return (
    <SidebarMenu className="bg-black pb-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="hover:bg-muted/25 hover:text-zinc-100 cursor-pointer  text-zinc-100 w-full focus-visible:ring-0"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden text-left text-sm">
              <span className="truncate font-medium">{user.username}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            <MoreVerticalIcon className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="border-gray-800 p-0 m-0 min-w-56 bg-black text-zinc-100 w-50 h-10"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer hover:bg-muted/25 focus:text-zinc-100 focus:bg-muted/25 hover:text-zinc-100 "
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  );
}
