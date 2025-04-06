import AppSidebar from "@/components/AppSideBar";
import TopBar from "@/components/TopBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <TopBar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
