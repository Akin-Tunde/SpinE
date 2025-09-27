// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";

// <-- Import from our new AppKit config, not the old wagmi config
import { wagmiAdapter, queryClient } from "@/lib/appkit";

import App from "./App.tsx";
import "./index.css";

// Your FarcasterProvider can remain if you are using it
import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk';
import { useEffect } from 'react';

function FarcasterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    miniAppSdk.actions.ready();
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Use the config and client exported from appkit.ts */}
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <FarcasterProvider>
          <App />
        </FarcasterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);