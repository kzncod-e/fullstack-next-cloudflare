import Dashboard from "@/modules/dashboard/dashboard.page";
import authRoutes from "@/modules/auth/auth.route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getSession } from "@/modules/auth/utils/auth-utils";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/navigation";
export default async function Page() {
    const session = await getSession();
    
    if (!session) {
        redirect(authRoutes.login);
    }
    return (
        <div className="flex w-full min-h-screen">
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
            <Navigation />
        <SidebarTrigger />
            <div className="w-full  mx-auto py-8 px-4">  <Dashboard/></div>
     
      </main>
    </SidebarProvider>
        </div>
    )

}
 

