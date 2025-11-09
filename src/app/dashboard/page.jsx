"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); // redirect to login page
      router.refresh();
      alert("You have successfully logged out");
    },
  },
});
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={signOut}>Log Out</button>
    </div>
  )
}
