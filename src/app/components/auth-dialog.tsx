import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from "./sign-in-form";

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
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
