import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /bg-\[[#0-9a-fA-F]{7,7}\]/, // Pattern to match dynamic background color classes
    },
    {
      pattern: /hover:bg-\[[#0-9a-fA-F]{6,7}\]/, // Pattern to match hover dynamic background color classes
    },
  ],
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
