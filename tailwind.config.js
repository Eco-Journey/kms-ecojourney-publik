/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#284027', // Hijau Utama
          light: '#3d5e3c',
        },
        accent: {
          DEFAULT: '#D5E2C4', // Krem Kehijauan
          light: '#e6eedb',
        },
        secondary: {
          DEFAULT: '#7A5535', // Cokelat Kayu/Kategori
          light: '#946d4c',
        },
        neutralBg: '#F2F2F2',
        semantic: {
          red: '#EB3131',
          green: '#02E10E',
          blue: '#384166',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
