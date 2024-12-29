import { getUser } from "@/lib/data/user";
import { NavUser } from "./nav-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MarketSidebarFooter() {
  const session = await getUser();

  if (!session) {
    return (
      <Button size={"sm"} asChild>
        <Link href={"/sign-in"}>Inicia sesión</Link>
      </Button>
    );
  }

  return (
    <NavUser
      user={{
        avatar: "",
        email: session.email,
        name: session.name || "",
      }}
    />
  );
}
