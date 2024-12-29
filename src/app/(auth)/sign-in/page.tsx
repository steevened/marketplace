import SignInCard from "./sign-in-card";

type SearchParams = Promise<{
  redirect?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignInCard searchParams={await searchParams} />
      </div>
    </div>
  );
}
