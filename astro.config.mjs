import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import webmanifest from "astro-webmanifest";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
export const locales = {
  root: {
    label: 'English',
    lang: 'en'
  },
  es: {
    label: 'Español',
    lang: 'es'
  }
};
const site = "https://www.bcuw.xyz";


// https://astro.build/config
export default defineConfig({
  site,
  integrations: [starlight({
    credits: true,
    favicon: 'bcuwOnlyTitleSquare.png',
    title: 'BCUW',
    social: {
      github: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW'
    },
    editLink: {
      baseUrl: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW/edit/main/'
    },
    customCss: ['./src/styles/main.css'],
    logo: {
      src: './src/assets/bcuwOnlyTitleNormal.png',
      replacesTitle: true,
    },
    locales,
    components: {
      Head: './src/components/Head.astro',
      Sidebar: './src/components/SideBar.astro'
    },
    lastUpdated: true,
    sidebar: [{
      label: 'Starting',
      collapsed: true,
      items: [{
        label: "Why and What?",
        link: '/starter/home/'
      }, {
        label: "Resources",
        link: '/starter/resources/'
      }, {
        label: "Discord Resources",
        link: '/starter/discordresources/'
      }, {
        label: "Credits",
        link: '/starter/credits/'
      }]
    }, {
      label: 'Crates',
      collapsed: true,
      items: [{
        label: 'Season',
        collapsed: true,
        autogenerate: {
          directory: '/crates/season'
        }
      }]
    }, {
      label: 'Items',
      collapsed: true,
      autogenerate: {
        directory: '/items/'
      }
    }, {
      label: 'Contributing',
      collapsed: true,
      items: [{
        label: "Staff",
        link: '/contributing/staff/'
      }, {
        label: "How to contribute",
        link: '/contributing/home/'
      }, {
        label: "i18n Tracker",
        link: '/contributing/i18n/'
      }, {
        label: "Logos",
        link: '/contributing/logos/'
      }]
    }, {
      label: 'Usefull things',
      collapsed: true,
      items: [{
        label: "CDN",
        link: '/usefulthings/cdn/'
      }]
    }],
    head: [{
      tag: 'script',
      attrs: {
        src: 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js',
        type: 'module'
      }
    }]
  }), webmanifest({
    name: 'BCUW',
    icon: './src/assets/bcuwOnlyTitleSquare.png',
    short_name: 'BCUW',
    description: "The BlossomCraft Wiki that's run by players",
    start_url: '/',
    theme_color: '#E16FD6',
    background_color: '#E16FD6',
    display: 'standalone'
  }), tailwind()],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});