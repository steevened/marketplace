"use client";

import * as React from "react";
import { Toaster } from "@/app/components/config/toaster";
import VisitorProvider from "./visitor-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <VisitorProvider>{children}</VisitorProvider>
    </>
  );
}
