/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '16px 6px 11px -22px #777777',
      },
      borderRadius:{
        'custom': '17px',
        'circle':'50%'
      }
    },
  },
  plugins: [],
}


