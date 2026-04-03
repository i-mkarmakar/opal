"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ROUTES } from "@/lib/constants";

export function MarketingGate({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isLoaded, isSignedIn, router]);

  return <>{children}</>;
}
