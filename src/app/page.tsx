"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={() => router.push("/dashboard")} variant="outline">
        Go to dashboard
      </Button>
    </div>
  );
}
