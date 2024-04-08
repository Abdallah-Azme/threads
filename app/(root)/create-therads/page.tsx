import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboard) {
  }
  return <h1 className="head-text">Create thread</h1>;
}
