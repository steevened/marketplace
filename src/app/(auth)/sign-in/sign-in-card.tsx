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
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6">
            <SignInForm searchParams={searchParams} />
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={carRental}
              alt="Image"
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
