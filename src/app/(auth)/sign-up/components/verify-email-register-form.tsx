"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormState } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  resetRegisterProcess,
  verifyRegisterEmail,
} from "@/lib/actions/sign-up.actions";
type EmailTokenState = "verify" | "resend";

export default function VerifyEmailRegisteForm({
  email,
  redirect,
}: {
  email: string;
  redirect?: string;
}) {
  const [emailTokenState, setEmailTokenState] =
    useState<EmailTokenState>("verify");

  if (emailTokenState === "verify")
    return (
      <EmailTokenForm
        redirect={redirect}
        email={email}
        setEmailTokenState={setEmailTokenState}
      />
    );

  return <ResendEmailToken setEmailTokenState={setEmailTokenState} />;
}

function EmailTokenForm({
  email,
  setEmailTokenState,
  redirect,
}: {
  email: string;
  setEmailTokenState: Dispatch<SetStateAction<EmailTokenState>>;
  redirect?: string;
}) {
  const [state, action, pending] = useActionState(
    verifyRegisterEmail,
    undefined
  );

  useEffect(() => {
    if (state?.errors?.otpExpired) {
      setEmailTokenState("resend");
    }
  }, [state, setEmailTokenState]);

  return (
    <form action={action} className="">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Ingresa el código OTP</h1>
          <p className=" text-muted-foreground text-sm">
            Te hemos enviado el código OTP a tu correo electrónico{" "}
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

          <input
            className="hidden"
            defaultValue={redirect}
            name="redirect"
            id="redirect"
          />

          {!state?.errors?.otpExpired ? (
            <Button isLoading={pending} loadingText="Cargando" type="submit">
              Verificar
            </Button>
          ) : null}

          <div className="flex justify-center">
            <ResetAuthSession />
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
          resetRegisterProcess();
        });
      }}
    >
      <ArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
      Regresar
    </Button>
  );
}

function ResendEmailToken({
  setEmailTokenState,
}: {
  setEmailTokenState: Dispatch<SetStateAction<EmailTokenState>>;
}) {
  const [state, action, isPendingAction] = useActionState(
    async (state: FormState, formData: FormData) => {
      // resendEmailToken(state);
      setEmailTokenState("verify");
      return state;
    },
    undefined
  );

  useEffect(() => {
    if (state && state.success) {
      setEmailTokenState("verify");
    }
  }, [state, setEmailTokenState]);

  return (
    <form action={action} className="">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">El código OTP ha expirado</h1>
          <p className="text-muted-foreground text-sm">
            Por favor, genera un nuevo código.
          </p>
        </div>
        <div className="w-full grid gap-2">
          <Button
            variant={"secondary"}
            size={"sm"}
            isLoading={isPendingAction}
            loadingText="Enviando código OTP"
          >
            <p>Enviar nuevo código</p>
          </Button>

          {state?.message ? (
            <div className="text-red-500 text-center leading-4">
              <small>{state.message}</small>
            </div>
          ) : null}
          <div className="flex justify-center">
            <ResetAuthSession />
          </div>
        </div>
      </div>
    </form>
  );
}
