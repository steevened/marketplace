import SignInForm from "@/app/components/sign-in-form";
import Link from "next/link";

type SearchParams = Promise<{
  redirect?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="h-svh flex flex-col">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 flex-1">
        <div className="w-full max-w-xs">
          <SignInForm searchParams={await searchParams} />
        </div>
      </div>
      <div className="py-10 border-t">
        <div className="text-center text-primary text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/sign-up" className="underline hover:underline-offset-4 ">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
