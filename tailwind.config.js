/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // add all React files here
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kalam', 'cursive', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
