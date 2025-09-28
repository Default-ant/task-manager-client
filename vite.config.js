import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      // Local development only
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
      },
    },
  },

  define: {
    // Optional: expose env variable fallback for production
    "process.env": {
      VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || "https://your-backend-name.onrender.cohttps://task-manager-api-wura.onrender.com",
    },
  },
});