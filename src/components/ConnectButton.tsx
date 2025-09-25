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

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={() => disconnect()} className="flex items-center space-x-2">
        <Wallet className="w-4 h-4" />
        <span>{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</span>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet provider to connect to the app.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2 mt-4">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </Button>
          ))}
        </div>
        {status === 'pending' && <div className="text-center text-sm text-muted-foreground mt-2">Connecting...</div>}
        {error && <div className="text-center text-sm text-destructive mt-2">{error.message}</div>}
      </DialogContent>
    </Dialog>
  )
}