import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'loading-bar': 'loading-bar 1s ease-out forwards',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        'loading-bar': {
          '0%': { width: '0%', opacity: '1' },
          '50%': { width: '70%', opacity: '0.8' },
          '100%': { width: '100%', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config