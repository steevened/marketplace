import { getVisitorSession } from "@/lib/data/auth.data";
import SendVerificationEmailForm from "./send-email-token-form";
import VerifyEmailToken from "./verify-email-token";

type SearchParams = Promise<{
  redirect?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const visitorSession = await getVisitorSession();

  return (
    <div className="flex pb-16  h-full items-center justify-center">
      <div className="w-full max-w-sm">
        {!visitorSession ? (
          <SendVerificationEmailForm searchParams={await searchParams} />
        ) : (
          <VerifyEmailToken searchParams={await searchParams} />
        )}
      </div>
    </div>
  );
}