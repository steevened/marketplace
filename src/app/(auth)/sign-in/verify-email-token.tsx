import { getVisitorSession } from "@/lib/data/auth.data";
import EmailTokenForm from "./email-token-form";

export default async function VerifyEmailToken({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const visitorSession = await getVisitorSession();

  if (!visitorSession?.visitorId) return null;
  return (
    <EmailTokenForm
      redirect={searchParams?.redirect}
      email={visitorSession.identifier}
    />
  );
}
