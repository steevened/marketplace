import { getAuthSession } from "@/lib/actions/auth.actions";
import EmailTokenForm from "./email-token-form";

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
