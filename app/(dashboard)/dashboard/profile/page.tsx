import { AccountProfile } from "@/components/account/profile-form";
import { getCurrentUserProfile } from "@/lib/actions/users";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const dbUser = await getCurrentUserProfile();
  return <AccountProfile initialDbUser={dbUser} />;
}

