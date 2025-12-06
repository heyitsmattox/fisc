

import type { Config } from 'tailwindcss';

const config: Config = {
  // CRITICAL: This array tells Tailwind where to scan for class names
  // so it can generate the optimized CSS output.
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // You can define custom colors, fonts, spacing, etc., here.
    },
  },
  plugins: [
    // Add any official Tailwind plugins here (e.g., @tailwindcss/forms)
  ],
};

export default config;