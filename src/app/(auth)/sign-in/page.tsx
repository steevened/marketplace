import { getAuthSession } from "../data";
import SendVerificationEmail from "./send-email-token-form";
import VerifyEmailToken from "./verify-email-token";

type SearchParams = Promise<{
  redirect?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const authSession = await getAuthSession();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[24rem]">
        {!authSession ? (
          <SendVerificationEmail
            authSessionEmail={authSession}
            searchParams={await searchParams}
          />
        ) : (
          <VerifyEmailToken searchParams={await searchParams} />
        )}
      </div>
    </div>
  );
}
