import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import webmanifest from "astro-webmanifest";
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";
import react from "@astrojs/react";
export const locales = {
  root: {
    label: "English",
    lang: "en",
  },
  // es: {
  //   label: "Español",
  //   lang: "es",
  // },
};
const NETLIFY_PREVIEW_SITE =
  process.env.NETLIFY &&
  process.env.CONTEXT !== "production" &&
  process.env.DEPLOY_PRIME_URL;
const site = NETLIFY_PREVIEW_SITE || "https://v3.bcuw.xyz/";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      credits: true,
      prerender: false,
      favicon: "bcuwOnlyTitleSquare.png",
      title: "BCUW",
      social: {
        github: "https://github.com/Unofficial-BlossomCraft-Wikis/BCUW",
      },
      editLink: {
        baseUrl:
          "https://github.com/Unofficial-BlossomCraft-Wikis/BCUW/edit/main/",
      },
      customCss: ["./src/styles/main.css", "./src/styles/landing.css"],
      logo: {
        src: "./src/assets/bcuwOnlyTitleNormal.png",
        replacesTitle: true,
      },
      locales,
      components: {
        Head: "./src/components/Head.astro",
        Sidebar: "./src/components/SideBar.astro",
        Banner: "./src/components/Banner.astro",
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
      ],
    }),
    webmanifest({
      name: "BCUW V3",
      icon: "./src/assets/bcuwOnlyTitleSquare.png",
      short_name: "BCUW V3",
      description: "The BlossomCraft Wiki that's run by players",
      start_url: "/",
      theme_color: "#E16FD6",
      background_color: "#E16FD6",
      display: "standalone",
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    // Use sentry for the site
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
  output: "server",
  adapter: netlify({
    imageCDN: false,
  }),
});
