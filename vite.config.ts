import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Package yang baru saja Anda instal

export default defineConfig({
  plugins: [react()],
  base: "/",
});
