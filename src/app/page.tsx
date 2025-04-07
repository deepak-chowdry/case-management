"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUser({ or: "redirect" });

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  });
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <Button onClick={() => router.push("/dashboard")} variant="outline">
        Go to dashboard
      </Button> */}
      <h1>Welcome to AskJunior</h1>
    </div>
  );
}
