import { getUser } from "@/lib/data/user";
import { NavUser } from "./nav-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MarketSidebarFooter() {
  const session = await getUser();

  if (!session) {
    return (
      <div className="grid gap-1.5">
        <Button variant={"subtle"} size={"sm"}>
          Vende tu auto
        </Button>

        <Button size={"sm"} asChild>
          <Link href={"/sign-in"}>Inicia sesión</Link>
        </Button>
      </div>
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
