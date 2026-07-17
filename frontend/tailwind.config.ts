import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#e0e9f0',
          200: '#c1d3e1',
          300: '#a2bdd2',
          400: '#6385b6',
          500: '#003366',
          600: '#00254d',
          700: '#001a33',
          800: '#00101a',
          900: '#000000',
        },
        success: {
          50: '#f0f9f6',
          100: '#e0f3ed',
          500: '#00aa66',
          600: '#008a52',
          700: '#006a3e',
        },
        warning: {
          500: '#ff9900',
          600: '#ff8000',
        },
        danger: {
          500: '#ff3333',
          600: '#e60000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 51, 102, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 51, 102, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
