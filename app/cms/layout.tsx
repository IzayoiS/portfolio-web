import { AppSidebar } from "@/app/cms/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./components/site-header";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen bg-slate-900 text-slate-400">
        <SiteHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
