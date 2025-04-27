"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";

export default function AccountButton({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="subtle"
      className={cn("", className)}
      asChild
      onClick={() => startTransition(() => {})}
    >
      <Link href={`/sell${searchParams ? `?${searchParams.toString()}` : ""}`}>
        <PlusIcon className="size-4" />
        Publicar
      </Link>
    </Button>
  );
}
