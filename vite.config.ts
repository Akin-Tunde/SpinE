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
  optimizeDeps: {
    exclude: [
      "@farcaster/miniapp-sdk",
      "@farcaster/frame-sdk",
      "@farcaster/miniapp-wagmi-connector",
    ],
    // --- FIX: Add this line to force Vite to process eventemitter3 correctly ---
    include: ["eventemitter3"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));