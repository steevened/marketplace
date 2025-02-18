import { getAuthSession, getRegisterSession } from "../data";
import RegisterEmailForm from "./components/register-email-form";
import VerifyEmailRegisteForm from "./components/verify-email-register-form";

export default async function Page() {
  const registerSession = await getRegisterSession();
  return (
    <div className="h-full pb-16 w-full flex items-center justify-center">
      <div className="w-full max-w-[24rem]">
        {!registerSession ? (
          <RegisterEmailForm />
        ) : (
          //we verify the condition here again cause the registerSession updates without rerendering the page
          <VerifyEmailRegisteForm email={registerSession} />
          // <VerifyEmailToken searchParams={await searchParams} />
        )}
      </div>
    </div>
  );
}
async function VerifyEmail() {
  const authSession = await getRegisterSession();

  if (!authSession) return null;

  return (
    <div>
      <h1>Verify Email</h1>
    </div>
    // <EmailTokenForm redirect={searchParams?.redirect} email={authSession} />
  );
}
