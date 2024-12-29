import { cookies } from "next/headers";
import EmailTokenForm from "./email-token-form";

export default async function VerifyEmailToken({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const cookieStore = await cookies();
  const emailToVerify = cookieStore.get("verify-email")?.value;

  if (!emailToVerify) return null;
  return <EmailTokenForm email={emailToVerify} />;
}
