"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function SignInLinkButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    // <Button
    //   onClick={() => {
    //     console.log(
    //       `/sign-in${
    //         searchParams
    //           ? `?redirect=${pathname + `?${searchParams.toString()}`}`
    //           : ""
    //       }`
    //     );
    //   }}
    // >
    //   Inicia sesión
    // </Button>
    <Button size={"sm"} asChild>
      <Link
        href={`/sign-in${
          searchParams
            ? `?redirect=${encodeURIComponent(
                pathname + `?${searchParams.toString()}`
              )}`
            : ""
        }`}
      >
        Inicia sesión
      </Link>
    </Button>
  );
}
