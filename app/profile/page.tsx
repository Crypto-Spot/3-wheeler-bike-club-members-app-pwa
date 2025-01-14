import { Wrapper } from "@/components/profile/wrapper";
import { getPrivyUser } from "../actions/privy/getPrivyUser";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await getPrivyUser()
  console.log(user)

  if (user?.customMetadata) {
    redirect("/dashboard")
  }

  return (
    <main className="flex w-full h-screen">
      <Wrapper/>
    </main>
  );
}
