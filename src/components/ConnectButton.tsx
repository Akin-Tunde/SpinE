// src/components/ConnectButton.tsx

import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useFarcasterUser } from "@/hooks/use-farcaster-user"; // <-- CORRECTED IMPORT from our new hook
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, connector } = useAccount();
  // Use our new custom hook to get the user data and loading state
  const { user: farcasterUser } = useFarcasterUser();

  // Check if the connection is specifically from the Farcaster Mini-App and we have user data
  const isFarcasterConnected =
    isConnected && connector?.id === "farcasterMiniApp" && farcasterUser;

  // Helper function to format a standard wallet address
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 4)}`;
  };

  // --- 1. RENDER FARCASTER USER ---
  // If connected via Farcaster, show the PFP and display name.
  if (isFarcasterConnected) {
    return (
      <Button
        variant="outline"
        onClick={() => open({ view: "Account" })}
        className="flex h-10 items-center gap-2 px-3"
      >
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={farcasterUser.pfpUrl}
            alt={farcasterUser.displayName || farcasterUser.username}
          />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{farcasterUser.displayName || farcasterUser.username}</span>
      </Button>
    );
  }

  // --- 2. RENDER GENERIC WALLET ---
  // If connected with any other wallet, show the formatted address.
  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        onClick={() => open({ view: "Account" })}
        className={cn("font-mono text-sm")}
      >
        {formatAddress(address)}
      </Button>
    );
  }

  // --- 3. RENDER CONNECT BUTTON ---
  // If not connected at all, show the main connect button.
  return <Button onClick={() => open()}>Connect Wallet</Button>;
}