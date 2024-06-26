import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        worm1: {
          '0%, 100%': { strokeDashoffset: '0' },
          '50%': { strokeDashoffset: '-358' },
        },
        worm2: {
          '0%, 100%': { strokeDashoffset: '358' },
          '50%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        worm1: 'worm1 2s linear infinite',
        worm2: 'worm2 2s linear infinite',
      },
      colors: {
        blue1: '#3B82F6',
        blue2: '#2563EB',
        blue3: '#1D4ED8',
        blue4: '#1E40AF',
        blue5: '#1E3A8A',
        'default-300': '#93C5FD',
        'default-200': '#60A5FA',
      },
    },
  },
  plugins: [],
};

export default config;
