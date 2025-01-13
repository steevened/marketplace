import { cookies } from "next/headers";
import EmailTokenForm from "./email-token-form";
import { getAuthSession } from "@/lib/actions/auth.actions";

export default async function VerifyEmailToken({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const authSession = await getAuthSession();

  // const cookieStore = await cookies();
  // const emailToVerify = cookieStore.get("verify-email")?.value;

  if (!authSession) return null;
  return <EmailTokenForm email={authSession} />;
}
