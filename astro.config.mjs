import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import webmanifest from "astro-webmanifest";

export const locales = {
  root: { label: 'English', lang: 'en' },
	es: { label: 'Español', lang: 'es' },
};

const site = "https://bcuw.xyz";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [starlight({
    credits: true,
    favicon: 'favicon.png',
    title: 'BCUW',
    social: {
      github: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW'
    },
    editLink: {
      baseUrl: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW/edit/main/'
    },
    customCss: [
    './src/styles/main.css',
    ],
    logo: {
      src: './src/assets/favicon.png'
    },
    locales,
    components: {
      Head: './src/components/Head.astro',
      Sidebar: './src/components/SideBar.astro',
    },
    lastUpdated: true,
    sidebar: [{
			label: 'Starting',
			collapsed: true,
			items: [
				{
					label: "Why and What?",
					link: '/starter/home/'
				},
        {
          label: "Resources",
          link: '/starter/resources/'
        },
        {
          label: "Discord Resources",
          link: '/starter/discordresources/'
        }
			],
    },
    {
      label: 'Crates',
			collapsed: true,
      items: [
        {label: 'Season', collapsed: true, autogenerate: { directory: '/crates/season' }},
      ]
    },
    {
			label: 'Contributing',
			collapsed: true,
			items: [
				{
					label: "How to contribute",
					link: '/contributing/home/'
				},
        {
          label: "i18n Tracker",
          link: '/contributing/i18n/'
        },
			],
    }, {
			label: 'Usefull things',
			collapsed: true,
			items: [
				{
					label: "CDN",
					link: '/usefulthings/cdn/'
				},
			],
    }],
    head: [
      {
        tag: 'script',
        attrs: {
          src: 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js',
          type: 'module',
        },
      },
    ],
  }), 
	webmanifest({
		name: 'BCUW',
		icon: './src/assets/favicon.png',
		short_name: 'BCUW',
		description: "The BlossomCraft Wiki that's run by players",
		start_url: '/',
		theme_color: '#E16FD6',
		background_color: '#E16FD6',
		display: 'standalone',
	}),],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});