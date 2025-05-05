import { AppSidebar } from "@/app/cms/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./components/site-header";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen bg-black text-zinc-100">
        <SiteHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
