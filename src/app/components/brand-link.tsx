import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import Link from "next/link";

export default function BrandLink() {
  return (
    <Button
      asChild
      className="justify-start px-2"
      size={"lg"}
      variant={"ghost"}
    >
      <Link href={"/"}>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Car className="size-6" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Autos Usados</span>
          <span className="truncate text-xs">Ecuador</span>
        </div>
      </Link>
    </Button>
  );
}
