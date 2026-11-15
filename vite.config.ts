import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

import { handleConsultationRequest } from "./src/server/consultation-request.js";
import { handleTestimonials } from "./src/server/testimonials.js";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    {
      name: "api",
      configureServer(server) {
        server.middlewares.use("/api/consultation-request", async (request, response) => {
          await handleConsultationRequest(request, response);
        });
        server.middlewares.use("/api/testimonials", async (request, response) => {
          await handleTestimonials(request, response);
        });
      },
    },
    react(),
    tailwindcss(),

    babel({ presets: [reactCompilerPreset()] }),
  ],
});
