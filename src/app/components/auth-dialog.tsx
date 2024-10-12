import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from "./sign-in-form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log In</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>See more on Marketplace</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1.5">
          <div className="grid gap-3">
            <SignInForm />
            <div className="text-center">
              <Link href={"forgot-password"}>
                <small className="">Forgot password?</small>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full">
              <Separator />
            </div>
            o
            <div className="w-full">
              <Separator />
            </div>
          </div>

          <div className="text-center">
            <Button size={"sm"}>Create new account</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
