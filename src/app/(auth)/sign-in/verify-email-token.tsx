import { getSignInSession } from "../data";
import EmailTokenForm from "./email-token-form";

export default async function VerifyEmailToken({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const authSession = await getSignInSession();

  if (!authSession?.email) return null;
  return (
    <EmailTokenForm redirect={searchParams?.redirect} email={authSession.email} />
  );
}
