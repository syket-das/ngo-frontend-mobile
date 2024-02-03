/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    // in screens folder look for every nested folder and every file with .js, .jsx, .ts, .tsx extension
    'screens/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
