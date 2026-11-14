/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#3B2350",
        "purple-d": "#7A4DB8",
        bg: "#FFD8EA",
        paper: "#FFFFFF",
        cream: "#FFF0F7",
        pink: "#FF8FC1",
        lavender: "#BFA8FF",
        mint: "#9FE8CF",
        yellow: "#FFE98A",
        sky: "#9FD8FF",
        "hot-pink": "#FF5C9D",
      },
      fontFamily: {
        mono: ['"Courier Prime"', '"Courier New"', 'monospace'],
        sans: ['"Carlito"', 'Calibri', 'sans-serif'],
      },
      boxShadow: {
        terminal: '4px 4px 8px #3B2350',
        'terminal-sm': '3px 3px 0 #3B2350',
      },
      borderWidth: {
        terminal: '2.5px',
      }
    },
  },
  plugins: [],
}
