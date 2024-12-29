"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SellButton() {
  const searchParams = useSearchParams();

  return (
    <Button variant={"subtle"} size={"sm"} asChild>
      <Link
        href={{
          pathname: "/sell",
          search: searchParams.toString(),
        }}
      >
        Vende tu auto
      </Link>
    </Button>
  );
}
