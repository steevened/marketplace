import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import Link from "next/link";
import BrandText from "./brand-text";

export default function BrandLink() {
  return (
    <Button asChild className="justify-center" variant={"ghost"}>
      <Link href={"/"}>
        <BrandText className="text-center" />
      </Link>
    </Button>
  );
}
