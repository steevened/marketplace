import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUser } from "@/lib/data/user";
import AuthDialog from "./auth-dialog";

export default async function UserMenu() {
  const user = await getUser();

  if (!user) return <AuthDialog />;

  return (
    <Avatar>
      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
    </Avatar>
  );
}
