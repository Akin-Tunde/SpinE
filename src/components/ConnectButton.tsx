// src/components/ConnectButton.tsx

import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useFarcasterUser } from "@/hooks/use-farcaster-user";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, connector } = useAccount();
  const { user: farcasterUser } = useFarcasterUser();

  // --- FIX: Use the correct connector ID from your debug logs ---
  const isFarcasterConnected =
    isConnected && connector?.id === "farcaster" && farcasterUser;

  // Helper function to format a standard wallet address
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 4)}`;
  };

  // --- 1. RENDER FARCASTER USER ---
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
            alt={farcasterUser.username}
          />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{farcasterUser.username}</span>
      </Button>
    );
  }

  // --- 2. RENDER GENERIC WALLET ---
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
  return <Button onClick={() => open()}>Connect Wallet</Button>;
}