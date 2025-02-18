"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormState } from "@/lib/types";
import React from "react";

export default function EmailFormContent({
  action,
  state,
  pending,
  processEmail,
  inputRef,
  type,
}: {
  action: (payload: FormData) => void;
  pending: boolean;
  processEmail?: string;
  state: FormState;
  inputRef?: React.RefObject<HTMLInputElement>;
  type: "sign-in" | "sign-up";
}) {
  return (
    <form action={action} className="">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">
            {type === "sign-in" ? "Iniciar sesión" : "Registrarse"}
          </h1>
          <p className="text-balance text-muted-foreground">
            Ingresa tu email para continuar
          </p>
        </div>

        <div className="grid gap-2">
          <div className="grid gap-2">
            <Input
              defaultValue={
                state?.formData?.get("email")?.toString() || processEmail
              }
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
