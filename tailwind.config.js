/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts}',
    './src/config/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = config;
