import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { StrictMode, useEffect } from 'react';
import App from "./App.tsx";
import "./index.css";

import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk'; // Import the Mini App SDK

function FarcasterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const init = async () => {
      // Signal readiness to both Frame and Mini App environments
      
      miniAppSdk.actions.ready();
    };

    init();
  }, []);

  return <>{children}</>;
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <FarcasterProvider>
          <App />
        </FarcasterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);