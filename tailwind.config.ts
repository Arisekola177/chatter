import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "240px",
        sm: "320px",
        sml: "480px",
        md: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
        xxl: "1320px",
      },
      typography: (theme:any) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '300',
            },
            h2: {
              color: theme('colors.gray.700'),
              fontWeight: '200',
            },
          
            // Add other element styles as needed
          },
        },
      }),
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),  require('@tailwindcss/typography'),],
} satisfies Config

export default config