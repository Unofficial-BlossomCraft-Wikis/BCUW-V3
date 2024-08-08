import { defineConfig, squooshImageService } from "astro/config";
import webmanifest from "astro-webmanifest";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";
import react from "@astrojs/react";
export const locales = {
  root: {
    label: "English",
    lang: "en"
  }
  // es: {
  //   label: "Español",
  //   lang: "es",
  // },
};
const NETLIFY_PREVIEW_SITE = process.env.NETLIFY && process.env.CONTEXT !== "production" && process.env.DEPLOY_PRIME_URL;
const site = NETLIFY_PREVIEW_SITE || "https://www.bcuw.xyz/";


// https://astro.build/config
export default defineConfig({
  site,
  integrations: [webmanifest({
    name: "BCUW",
    icon: "./src/assets/bcuwOnlyTitleSquare.png",
    short_name: "BCUW",
    description: "The BlossomCraft Wiki that's run by players",
    start_url: "/",
    theme_color: "#E16FD6",
    background_color: "#E16FD6",
    display: "standalone"
  }), tailwind({
    applyBaseStyles: false,
    configFile: './tailwind.config.ts'
  }),
  // Use sentry fro the site
  sentry({
    dsn: process.env.SENTRY_DSN,
    sourceMapsUploadOptions: {
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN
    },
    replaysSessionSampleRate: 0.2,
    replaysOnErrorSampleRate: 1.0
  }), react()],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: squooshImageService()
  },
  output: "server",
  adapter: netlify({
    imageCDN: false
  })
});