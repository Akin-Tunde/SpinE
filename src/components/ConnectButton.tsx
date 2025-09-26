import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Helper component to render wallet icons (you would typically place this in a separate file)
// In a real project, you might use SVG imports or a library for these icons.
const WalletIcon = ({ connectorId, className }: { connectorId: string, className: string }) => {
    if (connectorId === 'io.metamask') {
        // Placeholder for MetaMask icon
        return <svg className={className} viewBox="0 0 24 24">...</svg>; // Replace with actual SVG path
    }
    if (connectorId === 'com.coinbase.wallet') {
        // Placeholder for Coinbase Wallet icon
        return <svg className={className} viewBox="0 0 24 24">...</svg>; // Replace with actual SVG path
    }
    // Fallback icon
    return <Wallet className={className} />;
};


export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={() => disconnect()} className="flex items-center space-x-2">
        <Wallet className="w-4 h-4 text-success" />
        <span className="font-mono">{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</span>
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
         <Button variant="outline" size="sm" className="flex items-center space-x-2">
           <Wallet className="w-4 h-4" />
           <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      {/* The DialogContent from shadcn/ui is responsive by default */}
      <DialogContent className="max-w-xs sm:max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Choose a wallet provider to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3 pt-4">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              variant="outline"
              className="w-full flex justify-start items-center text-base h-14"
            >
              {/* Using a helper to show wallet-specific icons */}
              <WalletIcon connectorId={connector.id} className="w-6 h-6 mr-4" />
              {connector.name}
            </Button>
          ))}
        </div>
        {status === 'pending' && <p className="text-center text-sm text-muted-foreground mt-2">Connecting...</p>}
        {error && <p className="text-center text-sm text-destructive mt-2">{error.message}</p>}
      </DialogContent>
    </Dialog>
  )
}