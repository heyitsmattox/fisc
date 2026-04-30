import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       display: ["group-hover"],
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
} satisfies Config