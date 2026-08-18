import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   base: "/Phronix_Team_Web/",
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: ["compare-hastily-handlebar.ngrok-free.dev"],
  },
});
