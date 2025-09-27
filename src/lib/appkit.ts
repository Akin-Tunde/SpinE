
// src/lib/appkit.ts

import { QueryClient } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";

// Import the chains you use from the AppKit networks path
import { mainnet, sepolia, base, baseSepolia } from "@reown/appkit/networks";

// 0. Setup queryClient
export const queryClient = new QueryClient();

// 1. Get projectId from your .env.local file
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

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
export const networks = [mainnet, sepolia, base, baseSepolia] ;

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
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