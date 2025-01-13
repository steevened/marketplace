"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  resendEmailToken,
  resetAuthProcess,
  verifyEmailToken,
} from "@/lib/actions/auth.actions";
import { ArrowLeft } from "lucide-react";
import { useActionState, useTransition } from "react";

export default function EmailTokenForm({ email }: { email: string }) {
  const [isPendingResetProcess, startTransitionResetProcess] = useTransition();
  const [state, action, pending] = useActionState(verifyEmailToken, undefined);
  // const router = useRouter();

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

            {state?.errors?.otp ? (
              <small className="text-red-500 text-center">
                {state.errors.otp}
              </small>
            ) : null}
          </div>

          {state?.message && (
            <small className="text-red-500 text-center">{state.message}</small>
          )}

          {!state?.errors?.otpExpired ? (
            <Button isLoading={pending} loadingText="Cargando" type="submit">
              Verificar
            </Button>
          ) : null}

          {state?.errors?.otpExpired ? <ResendEmailToken /> : null}

          <Button
            size={"sm"}
            className="group bg-transparent hover:bg-transparent shadow-none"
            variant={"subtle"}
            type="button"
            isLoading={isPendingResetProcess}
            loadingText="Cargando"
            onClick={() => {
              startTransitionResetProcess(() => {
                resetAuthProcess();
              });
            }}
          >
            <ArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Regresar
          </Button>
        </div>
      </div>
    </form>
  );
}

function ResendEmailToken() {
  const [state, formAction, isPending] = useActionState(
    resendEmailToken,
    undefined
  );
  return (
    <div className="w-full grid gap-2">
      <Button
        variant={"secondary"}
        type="button"
        size={"sm"}
        isLoading={isPending}
        loadingText="Enviando código OTP"
        formAction={formAction}
      >
        <p>Enviar nuevo código</p>
      </Button>

      {state?.message ? (
        <div className="text-red-500 text-center leading-4">
          <small>{state.message}</small>
        </div>
      ) : null}
    </div>
  );
}
