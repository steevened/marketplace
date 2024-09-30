import ThemeToggle from "@/components/core/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingBag, User } from "lucide-react";

export default function Menu({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Button variant={"ghost"} size={"icon"}>
        <User />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <Heart />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <ShoppingBag />
      </Button>
      <ThemeToggle />
    </div>
  );
}
