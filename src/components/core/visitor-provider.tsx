import LoaderComponent from "@/app/components/config/loader-component";
import { createOrUpdateVisitor } from "@/lib/actions/auth.actions";
import { useEffect, useTransition } from "react";

export default function VisitorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await createOrUpdateVisitor();
    });
  }, []);

  if (isPending)
    return (
      <LoaderComponent />
    );

  return children;
}
