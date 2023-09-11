import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import sitemap from '@astrojs/sitemap';
import aws from "astro-sst/lambda";
import { loadEnv } from "vite";

const {
  PUBLIC_SANITY_PROJECT_ID,
  SANITY_API_VERSION,
  PUBLIC_SANITY_DATASET,
  DOMAIN
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const sanityConfig = {
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sanity(sanityConfig), sitemap({
    changefreq: "yearly",
    lastmod: new Date()
  })],
  site: DOMAIN,
  image: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.sanity.io",
      pathname: `/images/${PUBLIC_SANITY_PROJECT_ID}/production/*`
    }]
  },
  output: "server",
  adapter: aws(),
});