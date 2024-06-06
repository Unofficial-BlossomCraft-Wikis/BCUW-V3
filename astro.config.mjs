import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import webmanifest from "astro-webmanifest";

export const locales = {
  root: {
    label: 'English',
    lang: 'en'
  }
};

const site = "https://bcuw.xyz";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [starlight({
    favicon: 'favicon.png',
    title: 'UBCW',
    social: {
      github: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW'
    },
    editLink: {
      baseUrl: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW/edit/main/'
    },
    customCss: [
    // Relative path to your @font-face CSS file.
    './src/fonts/fonts.css', './src/styles/main.css'],
    logo: {
      src: './src/assets/favicon.png'
    },
    locales,
    lastUpdated: true,
    sidebar: [{
			label: 'Starting',
			collapsed: true,
			items: [
				{
					label: "We're migrating to WikiDot",
					link: '/starter/home/'
				},
			],
    }]
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