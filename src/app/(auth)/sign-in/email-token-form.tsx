"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyEmailToken } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function EmailTokenForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(verifyEmailToken, undefined);
  const router = useRouter();

  return (
    <form action={action} className="">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Verifica tu email</h1>
          <p className=" text-muted-foreground text-sm">
            Si tienes una cuenta registrada, te enviaremos un código OTP a{" "}
            <strong>{email}</strong>, ingrésalo a continuación.
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
            <small className="text-red-500 text-center">
              {state?.errors?.otp && <p>{state.errors.otp}</p>}
            </small>
          </div>

          {state?.message && (
            <div className="text-red-500 text-center leading-4">
              <small>{state.message}</small>
            </div>
          )}

          <Button isLoading={pending} loadingText="Cargando" type="submit">
            Verificar
          </Button>

          {state?.errors?.otpExpired ? (
            <Button
              variant={"ghost"}
              type="button"
              size={"sm"}
              onClick={() => router.refresh()}
              className="text-primary text-center mt-2 text-sm hover:text-primary/90"
            >
              <p>Enviar nuevo código</p>
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
