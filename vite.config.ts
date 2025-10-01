import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // --- FIX: Add this section to exclude Farcaster libs from optimization ---
  optimizeDeps: {
    exclude: [
      "@farcaster/miniapp-sdk",
      "@farcaster/frame-sdk",
      "@farcaster/miniapp-wagmi-connector",
    ],
  },
  // --- End of fix ---
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));