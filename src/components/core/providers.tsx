"use client";

import * as React from "react";
import { Toaster } from "@/app/components/config/toaster";



export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
