
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const { userId } = await auth();

  
  if (!userId) {
    redirect("/sign-in");
  }

  
  const user = await currentUser();

  
  const email = user?.emailAddresses?.[0]?.emailAddress;

  
  if (email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return <>{children}</>;
}

