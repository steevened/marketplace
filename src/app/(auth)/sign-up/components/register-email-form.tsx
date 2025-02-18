"use client";

import React, { useActionState } from "react";
import EmailFormContent from "@/app/(auth)/components/email-form-content";
import { toast } from "sonner";
import { registerEmail } from "@/lib/actions/sign-up.actions";

export default function RegisterEmailForm() {
  const [state, action, pending] = useActionState(registerEmail, undefined);
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
    <EmailFormContent
      action={action}
      pending={pending}
      state={state}
      inputRef={inputRef}
      type="sign-up"
    />
  );
}
