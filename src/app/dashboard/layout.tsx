import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        {/* <div className="sticky top-16 h-[calc(100vh-4rem)] left-0 border-r">
        <AsideLayout />
        </div> */}

        <SidebarTrigger>collapse</SidebarTrigger>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
