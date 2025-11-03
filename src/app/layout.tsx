import "./globals.css";

import Providers from "@/components/core/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { getToastNotification } from "@/lib/actions/config.actions";
import ServerNotification from "./components/config/server-notification";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverNotification = await getToastNotification();
  console.log(serverNotification)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Providers>
          <Toaster closeButton theme="system" />
          {serverNotification && (
            <ServerNotification {...serverNotification}/>
          )}

          <main className="min-h-[calc(100svh-120px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
