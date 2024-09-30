"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex gap-3 justify-between [&>*]:w-full overflow-x-auto">
      <Button
        asChild
        variant={pathname !== "/" ? "secondary" : "default"}
        size={"lg"}
      >
        <Link className="" href={"/"}>
          Explorar
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname !== "/arriendos" ? "secondary" : "default"}
        size={"lg"}
      >
        <Link className="" href={"/arriendos"}>
          Arriendos
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname !== "/autos" ? "secondary" : "default"}
        size={"lg"}
      >
        <Link className="" href={"/autos"}>
          Autos
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname !== "/servicios" ? "secondary" : "default"}
        size={"lg"}
      >
        <Link className="" href={"/servicios"}>
          Servicios
        </Link>
      </Button>
    </div>
  );
}
