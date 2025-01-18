"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import UserLogo from "@/app/components/user-logo";

export default function AccountButton({ className }: { className?: string }) {
  const searchParams = useSearchParams();

  return (
    <Button
      variant="ghost"
      //   size=""
      className={cn("", className)}
      asChild
    >
      <Link href={`/sell${searchParams ? `?${searchParams.toString()}` : ""}`}>
        <UserLogo />
        Anónimo
      </Link>
    </Button>
  );
}
