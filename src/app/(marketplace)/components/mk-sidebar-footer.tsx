import { getUser } from "@/lib/data/user";
import { NavUser } from "./nav-user";
import SignInLinkButton from "./sign-in-link-button";

export default async function MarketSidebarFooter() {
  const session = await getUser();

  if (!session) {
    return <SignInLinkButton />;
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
