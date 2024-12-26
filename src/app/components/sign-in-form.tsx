"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signInWithRedirect } from "@/lib/actions/auth.actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const [state, action, pending] = useActionState(
    signInWithRedirect,
    undefined
  );

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

        {state?.message && (
          <div className="text-red-500">
            <small>{state.message}</small>
          </div>
        )}
      </div>
      <Button isLoading={pending} loadingText="Submitting" type="submit">
        Log In
      </Button>
    </form>
  );
}
