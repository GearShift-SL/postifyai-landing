// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://postifyai.com",
  integrations: [
    icon(),
    sitemap({
      filter: (page) => page !== "https://postifyai.com/stripe-callback/",
    }),
    mdx(),
    react(),
  ],
  trailingSlash: "always",
});
