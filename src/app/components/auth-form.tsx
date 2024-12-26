"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signUpWithRedirect } from "../(auth)/sign-up/actions";

export default function AuthForm() {
  const [state, action, pending] = useActionState(
    signUpWithRedirect,
    undefined
  );

  return (
    <form action={action} className="grid gap-3">
      <div className="grid gap-1.5">
        <Input autoComplete="name" id="name" name="name" placeholder="Name" />
        <small className="text-red-500">
          {state?.errors?.name && <p>{state.errors.name}</p>}
        </small>
      </div>
      <div>
        <Input
          autoComplete="email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <small className="text-red-500">
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </small>
      </div>
      <div>
        <Input
          id="password"
          name="password"
          autoComplete="new-password"
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
      <Button isLoading={pending} loadingText="Submitting" type="submit">
        Sign Up
      </Button>
    </form>
  );
}
