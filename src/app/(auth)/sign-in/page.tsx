import { getSignInSession } from "../data";
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
  const signInSession = await getSignInSession();

  return (
    <div className="flex pb-16  h-full items-center justify-center">
      <div className="w-full max-w-[24rem]">
        {!signInSession?.email ? (
          <SendVerificationEmail
            searchParams={await searchParams}
          />
        ) : (
          <VerifyEmailToken searchParams={await searchParams} />
        )}
      </div>
    </div>
  );
}
