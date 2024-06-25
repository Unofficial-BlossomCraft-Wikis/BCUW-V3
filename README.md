# BCUW
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)  
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)


## Commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `npm i`       | Installs dependencies                        |
| `npm run start`   | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run lunaria:build` | Build your i18n production site to `./dist/lunaria` |
| `npm run lunaria:preview` | Preview your i18n build locally, before deploying |
| `npm run collect-stats` | Collect stats from GitHub and update `./data/contributors.json` |

To test the Stat Collection you must have a GitHub API token as the `GITHUB_TOKEN` environment variable.

## Tools
### Don't know MD/Starlight/MDX? heres some tools:
- https://www.markdownguide.org/cheat-sheet/
- https://starlight.astro.build/guides/components/
- https://starlight.astro.build/guides/authoring-content/

### Don't know JS/TS?
- https://www.typescriptlang.org/docs/handbook/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/

### Don't know Astro?
- https://astro.build/docs/

## Guidelines
- When embedding YouTube videos, please use the VideoYT component (`import VideoYT from '@components/tailwinded/VideoYT.astro';`);