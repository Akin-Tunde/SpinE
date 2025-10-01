// src/lib/appkit.ts

import { QueryClient } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";

// Import the chains you use from the AppKit networks path
import { mainnet, sepolia, base, baseSepolia } from "@reown/appkit/networks";

// --- MODIFICATION: Import connectors to define a custom priority ---
import { injected, walletConnect } from "wagmi/connectors";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

// 0. Setup queryClient
export const queryClient = new QueryClient();

// 1. Get projectId from your .env.local file
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("VITE_REOWN_PROJECT_ID is not set in .env.local");
}

// 2. Create a metadata object (optional but recommended)
const metadata = {
  name: "SpinGame",
  description: "Crypto Gaming & NFT Rewards Platform",
  url: "https://searn.netlify.app/", // Your production URL
  icons: ["https://searn.netlify.app/icon.png"], // A URL to your app's icon
};

// 3. Set the networks and use 'as const' to satisfy the type requirement
export const networks = [mainnet, sepolia, base, baseSepolia];

// --- MODIFICATION: Create a prioritized list of connectors ---
// By placing miniAppConnector() first, we ensure it's the default inside Farcaster.
const connectors = [
  miniAppConnector(),
  injected({ shimDisconnect: true }),
  walletConnect({ projectId }),
];

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  // Pass the custom connectors list to the adapter
  // This ensures Farcaster SDK is prioritized
  connectors,
  ssr: false, // Set to false for Vite/React SPA
});

// 5. Create the AppKit modal instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, sepolia, base, baseSepolia],
  projectId,
  metadata,
  features: {
    analytics: true, // Enable analytics (optional)
  },
});