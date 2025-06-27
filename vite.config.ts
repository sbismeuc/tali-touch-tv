import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // --- Dev-server settings --------------------------------------------------
  server: {
    host: true,          // 0.0.0.0 / ::
    port: 8080,          // matches cloudflared ingress
    strictPort: true,    // let launchd restart if 8080 busy
    cors: true,          // allow cross-origin fetches
    /** Allow Cloudflare tunnel Host header */
    allowedHosts: ["tali.meridianstem.com"],   // or: "all"
  },

  // -------------------------------------------------------------------------
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
