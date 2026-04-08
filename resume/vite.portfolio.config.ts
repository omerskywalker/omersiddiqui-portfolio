import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";

  export default defineConfig({
    base: "/resume/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom", "scheduler"],
    },
    optimizeDeps: {
      include: ["@react-pdf/renderer", "scheduler"],
    },
    build: {
      outDir: path.resolve(import.meta.dirname, "../resume-static"),
      emptyOutDir: true,
    },
  });
  