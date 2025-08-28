
import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // for dev mode
  },
  preview: {
    host: true, // bind to 0.0.0.0 in preview
    port: process.env.PORT || 5173,
    allowedHosts: ["inquestia.up.railway.app"],
  },
});

