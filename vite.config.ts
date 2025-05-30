import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  plugins: [react(), generouted(), UnoCSS()],
});
