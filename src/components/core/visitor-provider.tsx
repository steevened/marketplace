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
      <div className="flex items-center justify-center text-2xl h-screen text-muted-foregroundÍ">
        Loading from visitor provider...
      </div>
    );

  return children;
}
