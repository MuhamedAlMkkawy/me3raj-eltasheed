import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/app.{js,ts,vue}',
    './app/error.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2AA9E3',
          heading: '#1F2A30',
          text: '#333333',
          dark: '#2B3238',
          muted: '#44505A',
          link: '#0F6F9E',
          background: '#F5F9FB',
          surface: '#FFFFFF',
          border: '#C7D8E1',
        },
      },
      fontFamily: {
        heading: ['"Cairo"', 'sans-serif'],
        body: ['"Cairo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
