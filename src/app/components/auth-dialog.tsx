"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import SignInForm from "./sign-in-form";
import AuthForm from "./auth-form";

type AuthSection = "login" | "register" | "forgot-password";

export default function AuthDialog() {
  const [authSection, setAuthSection] = useState<AuthSection>("login");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log In</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>See more on Marketplace</DialogTitle>
        </DialogHeader>
        {authSection === "login" ? (
          <LoginSection setAuthSection={setAuthSection} />
        ) : null}
        {authSection === "register" ? (
          <SignUpSection setAuthSection={setAuthSection} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function LoginSection({
  setAuthSection,
}: {
  setAuthSection: React.Dispatch<React.SetStateAction<AuthSection>>;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="grid gap-3">
        <SignInForm />
        <button
          onClick={() => setAuthSection("forgot-password")}
          className="text-center"
        >
          <small className="">Forgot password?</small>
        </button>
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
        <Button onClick={() => setAuthSection("register")} size={"sm"}>
          Create new account
        </Button>
      </div>
    </div>
  );
}

function SignUpSection({
  setAuthSection,
}: {
  setAuthSection: React.Dispatch<React.SetStateAction<AuthSection>>;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="grid gap-3">
        <AuthForm />
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
        <Button onClick={() => setAuthSection("login")} size={"sm"}>
          Log in
        </Button>
      </div>
    </div>
  );
}
