// src/components/ConnectButton.tsx

import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  // Helper function to format the address
  const formatAddress = (addr: string) => {
    // This format shows "0x" + 3 characters, "...", and the last 4 characters.
    // Example: 0xd1a...5455
    return `${addr.substring(0, 3)}..${addr.substring(addr.length - 4)}`;
  };

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

  return <Button onClick={() => open()}>Connect Wallet</Button>;
}