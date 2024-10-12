import { getUser } from "@/lib/data/user";
import UserMenu from "./user-menu";

export default async function UserMenuProvider() {
  const user = await getUser();
  return <UserMenu user={user} />;
}
