import ThemeToggle from "@/components/core/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import AuthPopover from "./auth-popover";

export default function Menu({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <AuthPopover />
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
