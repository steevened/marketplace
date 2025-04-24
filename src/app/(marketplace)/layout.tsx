import ClientProviders from "@/app/components/config/client-providers";
import MktSidebar from "@/app/components/marketplace/layout/mkp-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <MktSidebar>{children}</MktSidebar>
    </ClientProviders>
  );
}
