"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const {
    data: session,
    isPending,
    error,
  } = authClient.useSession();

  useEffect(() => {
    // Still loading — do nothing
    if (isPending) return;

    // Error OR no session → redirect
    if (!session?.user || !session?.session) {
      router.push("/login");
    }
  }, [session, isPending, error, router]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  // If no session, redirecting — return nothing for now
  if (!session?.user || !session?.session) {
    return null;
  }

  // Logged in → render content
  return <>{children}</>;
}
