/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#3C3530",
        cream: "#FDFBF7",
        paper: "#FAF5EB",
        craft: "#EADBC8",
        blush: "#FCEBEB",
        lavender: "#F1EBF5",
        paleblue: "#EBF4F5",
        sage: "#EEF3EB",
        peach: "#F9EFE4",
        butter: "#FEF7DA",
        stampred: "#E27B7B",
        warmdesk: "#2E282A",
      },
      fontFamily: {
        sketch: ['"Gaegu"', '"Patrick Hand"', 'cursive', 'sans-serif'],
        display: ['"Fredoka"', '"Gaegu"', 'cursive', 'sans-serif'],
        hand: ['"Patrick Hand"', '"Mali"', 'cursive', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace', 'sans-serif'],
      },
      boxShadow: {
        'sketch-sm': '2px 2px 0px #3C3530',
        'sketch': '4px 4px 0px #3C3530',
        'sketch-lg': '6px 6px 0px #3C3530',
        'sketch-xl': '8px 8px 0px #3C3530',
        'sketch-inner': 'inset 2px 2px 0px rgba(60, 53, 48, 0.1)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        heartbeat: 'heartbeat 1.8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
