import { getRegisterSession } from "../data";
import RegisterEmailForm from "./components/register-email-form";

export default async function Page() {
  const registerSession = await getRegisterSession();
  return (
    <div className="h-full pb-16 w-full flex items-center justify-center">
      <div className="w-full max-w-[24rem]">
        {!registerSession ? (
          <RegisterEmailForm />
        ) : (
          <>verify email</>
          // <VerifyEmailToken searchParams={await searchParams} />
        )}
      </div>
    </div>
  );
}
