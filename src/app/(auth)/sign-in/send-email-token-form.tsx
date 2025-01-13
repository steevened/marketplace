"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmailVerificationToken } from "@/lib/actions/auth.actions";
import React, { useActionState } from "react";
import { toast } from "sonner";

export default function SendVerificationEmail({
  searchParams,
  authSessionEmail,
}: {
  searchParams?: Record<string, string>;
  authSessionEmail?: string;
}) {
  const [state, action, pending] = useActionState(
    sendEmailVerificationToken,
    undefined
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  React.useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);

  return (
    <form action={action} className="">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Bienvenido</h1>
          <p className="text-balance text-muted-foreground">
            Ingresa tu email para continuar
          </p>
        </div>

        <div className="grid gap-2">
          <div className="grid gap-2">
            <Input
              defaultValue={authSessionEmail}
              id="email"
              ref={inputRef}
              name="email"
              autoComplete="email"
              placeholder="Email"
            />
            {state?.errors?.email && (
              <small className="text-red-500">{state.errors.email}</small>
            )}
          </div>

          <Button isLoading={pending} loadingText="Cargando" type="submit">
            Continuar
          </Button>
        </div>
      </div>
    </form>
  );
}
