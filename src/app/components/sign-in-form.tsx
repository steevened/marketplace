"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/actions/auth.actions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function SignInForm() {
  const [state, action] = useFormState(signIn, undefined);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);

  return (
    <form action={action} className="grid gap-3">
      <div className="grid gap-1.5">
        <Input
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
        />
        <small className="text-red-500">
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </small>
      </div>
      <div className="grid gap-1.5">
        <Input
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          type="password"
        />
        {state?.errors?.password && (
          <div className="text-red-500">
            <small>Password must:</small>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>
                  <small>- {error}</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} loadingText="Submitting" type="submit">
      Log In
    </Button>
  );
}
