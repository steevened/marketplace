"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormState } from "@/lib/types";
import React, { useTransition } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";
import { resetAuthProcess } from "@/lib/actions/auth.actions";

export default function EmailFormContent({
  action,
  state,
  pending,
  processEmail,
  type,
}: {
  action: (payload: FormData) => void;
  pending: boolean;
  processEmail?: string;
  state: FormState;
  type: "sign-in" | "sign-up";
}) {
  return (
    <form action={action} className="">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Ingresa el código OTP</h1>
          <p className=" text-muted-foreground text-sm">
            Si {type === "sign-in" ? "tienes" : "no tienes"} una cuenta
            registrada, te enviaremos un código OTP a{" "}
            <strong>{processEmail}</strong>, ingrésalo a continuación.
          </p>
        </div>

        <div className="grid gap-2">
          <div className="grid gap-2 justify-center">
            <InputOTP name="otp" id="otp" maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {state?.errors?.otp ? (
              <small className="text-red-500 text-center">
                {state.errors.otp}
              </small>
            ) : null}
          </div>

          {state?.message && (
            <small className="text-red-500 text-center">{state.message}</small>
          )}

          <input
            className="hidden"
            //   defaultValue={redirect}
            name="redirect"
            id="redirect"
          />

          {!state?.errors?.otpExpired ? (
            <Button isLoading={pending} loadingText="Cargando" type="submit">
              Verificar
            </Button>
          ) : null}

          <div className="flex justify-center">
            {type === "sign-in" ? (
              <ResetAuthSession />
            ) : (
              <>reset register session</>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

function ResetAuthSession() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size={"sm"}
      className="group bg-transparent hover:bg-transparent shadow-none w-min"
      variant={"subtle"}
      type="button"
      isLoading={isPending}
      loadingText="Cargando"
      onClick={() => {
        startTransition(() => {
          resetAuthProcess();
        });
      }}
    >
      <ArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
      Regresar
    </Button>
  );
}
