"use client";
import SignInForm from "@/app/components/sign-in-form";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import carRental from "/public/car-rental.webp";

export default function SignInCard({
  className,
  searchParams,
}: {
  className?: string;
  searchParams?: Record<string, string>;
}) {
  return <div className={cn("flex flex-col gap-6", className)}></div>;
}
