"use client";

import BrandLink from "@/app/components/brand/brand-link";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const pathname = usePathname();
  return (
    <header className="h-16 flex items-center  shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4 ">
      <nav className="w-full justify-between max-w-screen-xl flex mx-auto ">
        <BrandLink />
        <div className="flex gap-2">
          {pathname === "/sign-up" ? (
            <Button variant={"outline"} asChild>
              <Link href={"/sign-in"}>Iniciar sesión</Link>
            </Button>
          ) : null}
          {pathname === "/sign-in" ? (
            <Button variant={"outline"} asChild>
              <Link href={"/sign-up"}>Registrarse</Link>
            </Button>
          ) : null}
          <Button>Contacto</Button>
        </div>
      </nav>
    </header>
  );
}
