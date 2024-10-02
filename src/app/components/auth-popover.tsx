import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import AuthForm from "./auth-form";

export default function AuthPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <AuthForm />
      </PopoverContent>
    </Popover>
  );
}
