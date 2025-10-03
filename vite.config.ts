import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Package yang baru saja Anda instal

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true, // atau '0.0.0.0' - expose ke network
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
});
