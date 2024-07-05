import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
