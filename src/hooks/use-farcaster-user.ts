// src/hooks/use-farcaster-user.ts

import { useState, useEffect } from "react";
import { sdk as miniAppSdk } from "@farcaster/miniapp-sdk";

type FarcasterUser = Awaited<typeof miniAppSdk.context>["user"];

export function useFarcasterUser() {
  const [farcasterUser, setFarcasterUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // --- DEBUGGING LOG ---
    console.log("[Debug] Attempting to get Farcaster context...");

    miniAppSdk.context
      .then((context) => {
        // --- DEBUGGING LOG ---
        console.log("[Debug] Farcaster context received:", context);

        if (isMounted) {
          setFarcasterUser(context.user);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("[Debug] Failed to retrieve Farcaster user context:", error);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { user: farcasterUser, loading };
}