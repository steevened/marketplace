"use client";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider open={true}>{children}</SidebarProvider>;
}
