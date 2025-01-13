import SignInForm from "@/app/components/sign-in-form";
import { cookies } from "next/headers";
import Link from "next/link";
import SendVerificationEmail from "./send-email-token-form";
import VerifyEmailToken from "./verify-email-token";
import EmailTokenForm from "./email-token-form";
import { getAuthSession } from "@/lib/actions/auth.actions";

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
    <div className="h-svh flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-[24rem]">
          {!authSession ? (
            <SendVerificationEmail
              authSessionEmail={authSession}
              searchParams={await searchParams}
            />
          ) : (
            <VerifyEmailToken />
          )}
        </div>
      </div>
      <div className="h-20 border-t flex items-center justify-center">
        <div className="text-center text-primary text-sm">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/sign-up"
            className="hover:underline-offset-4 hover:underline"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
