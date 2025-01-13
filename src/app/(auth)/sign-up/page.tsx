"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  const [state, action] = useFormState(signup, undefined);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);

  return (
    <form
      action={action}
      className="grid gap-6 p-6 border max-w-sm mx-auto rounded-lg"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Name" />
        <small className="text-red-500">
          {state?.errors?.name && <p>{state.errors.name}</p>}
        </small>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Email" />
        <small className="text-red-500">
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </small>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
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
      Sign Up
    </Button>
  );
}
