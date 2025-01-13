import { cookies } from "next/headers";
import EmailTokenForm from "./email-token-form";
import { getAuthSession } from "@/lib/actions/auth.actions";

export default async function VerifyEmailToken({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const authSession = await getAuthSession();

  if (!authSession) return null;
  return (
    <EmailTokenForm redirect={searchParams?.redirect} email={authSession} />
  );
}
