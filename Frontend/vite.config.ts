import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
    routeRules: {
      "/api/**": { proxy: "https://parkease-pe0d.onrender.com/api/**" }
    },
    output: {
      dir: ".vercel/output",
      serverDir: ".vercel/output/functions/index.func",
      publicDir: ".vercel/output/static"
    }
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          cookieDomainRewrite: "",
        },
      },
    },
  },
});
