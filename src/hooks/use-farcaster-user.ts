// src/hooks/use-farcaster-user.ts

import { useState, useEffect } from "react";
// We only need the main sdk object.
import { sdk as miniAppSdk } from "@farcaster/miniapp-sdk";

/**
 * --- TYPE INFERENCE ---
 * Instead of importing 'MiniAppUser', we derive its type directly
 * from the SDK's context promise. This is a robust way to get the
 * exact type without depending on named exports.
 *
 * 'Awaited<...>' resolves the Promise type.
 * '...['user']' accesses the type of the 'user' property on the resolved object.
 */
type FarcasterUser = Awaited<typeof miniAppSdk.context>["user"];

/**
 * A custom hook to safely retrieve the Farcaster user from the Mini-App SDK context.
 */
export function useFarcasterUser() {
  // State to hold the user data and loading status, using our inferred type.
  const [farcasterUser, setFarcasterUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A flag to prevent state updates if the component unmounts
    let isMounted = true;

    // The SDK provides the context as a promise, so we resolve it here
    miniAppSdk.context
      .then((context) => {
        if (isMounted) {
          // The type of context.user will correctly match our inferred FarcasterUser type
          setFarcasterUser(context.user);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to retrieve Farcaster user context:", error);
        if (isMounted) {
          setLoading(false);
        }
      });

    // Cleanup function to set the flag when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // The empty dependency array ensures this runs only once on mount

  return { user: farcasterUser, loading };
}