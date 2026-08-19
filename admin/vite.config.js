import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Phronix_Admin_Web/",
  plugins: [react()],
  server: { port: 5175 },
});
