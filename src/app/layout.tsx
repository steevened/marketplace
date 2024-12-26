import Providers from "@/components/core/providers";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Menu as MenuIcon } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import UserMenuProvider from "./components/user-menu-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Autos Usados | Ecuador",
  description: "Compra y vende autos usados en Ecuador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Providers>
          <Toaster position="top-center" closeButton theme="system" />
          {/* <header className="flex items-center justify-between p-3 h-16 border-b shadow sticky top-0 bg-background/90 backdrop-blur ">
            <div className="flex items-center gap-3">
              <div className="block md:hidden">
                <Button variant={"ghost"} size={"icon"}>
                  <MenuIcon />
                </Button>
              </div>
              <Link href={"/"}>
                <h1 className="font-bold">Marketplace</h1>
              </Link>
            </div>
            <UserMenuProvider />
          </header> */}
          <main className="min-h-[calc(100svh-120px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
