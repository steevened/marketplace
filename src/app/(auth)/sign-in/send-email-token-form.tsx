"use client";

import { sendEmailVerificationToken } from "@/lib/actions/auth.actions";
import React, { useActionState } from "react";
import { toast } from "sonner";
import EmailFormContent from "../components/email-form-content";

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

  // React.useEffect(() => {
  //   if (state?.message) {
  //     toast(state.message);
  //   }
  // }, [state]);

  return (
    <EmailFormContent
      action={action}
      pending={pending}
      state={state}
      inputRef={inputRef}
      processEmail={authSessionEmail}
      type="sign-in"
    />
  );
}
