/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['[data-mode="dark"]'],
  content: ["./src/components/tailwinded/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ranks: {
          celestial: {
            DEFAULT: "var(--celestial)",
            foreground: "var(--celestial-foreground)",
          },
          immortal: {
            DEFAULT: "var(--immortal)",
            foreground: "var(--immortal-foreground)",
          },
          emperor: {
            DEFAULT: "var(--emperor)",
            foreground: "var(--emperor-foreground)",
          },
          shogun: {
            DEFAULT: "var(--shogun)",
            foreground: "var(--shogun-foreground)",
          },
          samurai: {
            DEFAULT: "var(--samurai)",
            foreground: "var(--samurai-foreground)",
          },
          pancake: {
            DEFAULT: "var(--pancake)",
            foreground: "var(--pancake-foreground)",
          },
        },
        servers: {
          cherry: {
            DEFAULT: "var(--cherry)",
            foreground: "var(--cherry-foreground)",
          },
          spirit: {
            DEFAULT: "var(--spirit)",
            foreground: "var(--spirit-foreground)",
          },
          lotus: {
            DEFAULT: "var(--lotus)",
            foreground: "var(--lotus-foreground)",
          },
          tulip: {
            DEFAULT: "var(--tulip)",
            foreground: "var(--tulip-foreground)",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
};
