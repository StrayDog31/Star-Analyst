import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  base: "/Star-Analyst/",

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        name: "Star Analyst",
        short_name: "Star Analyst",
        start_url: "/Star-Analyst/",
        scope: "/Star-Analyst/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0072ce",
        description: "Калькулятор масс звезд",
        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
    mkcert(),
  ],

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/devices": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
