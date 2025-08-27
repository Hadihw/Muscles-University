import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        shine: 'shine 1s ease-in-out forwards',
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-0.5': 'fadeIn 0.3s ease-in-out',
        'slide-in-left': 'slideInFromLeft 1s ease-out',
        'slide-in-right': 'slideInFromRight 1s ease-out',
      },
      backgroundImage: {
        landingPageBackground: "url('/assets/images/landingPageBackground.PNG')",
      },
      colors: {
        medium: '#918B6C',
        dark: '#433722',
        light: '#B7A776',
        other: '#93946C',
        Manatee: '#8F96A7',
      },
      fontFamily: {
        axiom: ['Axiom', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    container: {
      center: true,
    },
    screens: {
      sm: '640px',
      md: '834px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config


