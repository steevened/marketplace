// import { LoginForm } from "@/components/login-form"

import SignInForm from "@/app/components/sign-in-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <SignInForm />
      </div>
    </div>
  );
}