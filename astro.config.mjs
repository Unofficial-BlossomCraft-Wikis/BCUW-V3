import { defineConfig, squooshImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import webmanifest from "astro-webmanifest";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightLinksValidator from "starlight-links-validator";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";
export const locales = {
  root: {
    label: "English",
    lang: "en",
  },
  es: {
    label: "Español",
    lang: "es",
  },
};
const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV &&
  process.env.VERCEL_ENV !== "production" &&
  process.env.VERCEL_URL &&
  `https://${process.env.VERCEL_URL}`;
const NETLIFY_PREVIEW_SITE =
  process.env.NETLIFY &&
  process.env.CONTEXT !== "production" &&
  process.env.DEPLOY_PRIME_URL;
const site =
  VERCEL_PREVIEW_SITE || NETLIFY_PREVIEW_SITE || "https://www.bcuw.xyz/";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      credits: true,
      favicon: "bcuwOnlyTitleSquare.png",
      title: "BCUW",
      social: {
        github: "https://github.com/Unofficial-BlossomCraft-Wikis/BCUW",
      },
      editLink: {
        baseUrl:
          "https://github.com/Unofficial-BlossomCraft-Wikis/BCUW/edit/main/",
      },
      customCss: process.env.NO_GRADIENTS
        ? ["./src/styles/main.css"]
        : ["./src/styles/main.css", "./src/styles/landing.css"],
      logo: {
        src: "./src/assets/bcuwOnlyTitleNormal.png",
        replacesTitle: true,
      },
      locales,
      components: {
        Head: "./src/components/Head.astro",
        Sidebar: "./src/components/SideBar.astro",
      },
      lastUpdated: true,
      sidebar: [
        {
          label: "Main",
          items: [
            {
              label: "Starting",
              items: [
                {
                  label: "Why and What?",
                  link: "/starter/home/",
                },
                {
                  label: "Resources",
                  link: "/starter/resources/",
                },
                {
                  label: "Discord Resources",
                  link: "/starter/discordresources/",
                },
                {
                  label: "Credits",
                  link: "/starter/credits/",
                },
              ],
            },
            {
              label: "Contributing",
              items: [
                {
                  label: "Staff",
                  link: "/contributing/staff/",
                },
                {
                  label: "How to contribute",
                  link: "/contributing/home/",
                },
                {
                  label: "i18n Tracker",
                  link: "/contributing/i18n/",
                },
                {
                  label: "CDN",
                  link: "/contributing/cdn/",
                },
                {
                  label: "Logos",
                  link: "/contributing/logos/",
                },
              ],
            },
            /* { Commented out for now, will be added back in later when the API is finished
      label: 'Usefull things',
      collapsed: true,
      items: []
      },*/
          ],
        },
        {
          label: "Crates",
          collapsed: true,
          items: [
            {
              label: "Season",
              collapsed: true,
              autogenerate: {
                directory: "/crates/season",
              },
            },
          ],
        },
        {
          label: "Items",
          collapsed: true,
          autogenerate: {
            directory: "/items/",
          },
        },
      ],
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: site + "bcuwNoXYZTitleNormal.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: site + "bcuwNoXYZTitleNormal.png",
          },
        },
      ],
      plugins: [
        starlightUtils({
          multiSidebar: true,
          switcherStyle: "horizontalList",
        }),
        starlightLinksValidator(),
      ],
    }),
    webmanifest({
      name: "BCUW",
      icon: "./src/assets/bcuwOnlyTitleSquare.png",
      short_name: "BCUW",
      description: "The BlossomCraft Wiki that's run by players",
      start_url: "/",
      theme_color: "#E16FD6",
      background_color: "#E16FD6",
      display: "standalone",
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    // Use sentry fro the site
    sentry({
      dsn: process.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      replaysSessionSampleRate: 0.2,
      replaysOnErrorSampleRate: 1.0,
    }),
  ],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: squooshImageService(),
  },
  output: "server",
  adapter: process.env.NETLIFY
    ? netlify()
    : vercel({
        webAnalytics: {
          enabled: true,
        },
      }),
});
