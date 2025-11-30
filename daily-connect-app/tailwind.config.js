/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft Pastel Palette - Meditation App Style
        lavender: {
          DEFAULT: '#D4C5F9',
          light: '#E6DFFE',
          dark: '#B8A5E8',
        },
        periwinkle: {
          DEFAULT: '#C5CAE9',
          light: '#E8EAF6',
          dark: '#9FA8DA',
        },
        sage: {
          DEFAULT: '#C8E6C9',
          light: '#E8F5E9',
          dark: '#A5D6A7',
        },
        mint: {
          DEFAULT: '#B2DFDB',
          light: '#E0F2F1',
          dark: '#80CBC4',
        },
        peach: {
          DEFAULT: '#FFE5D9',
          light: '#FFF3E0',
          dark: '#FFCCBC',
        },
        blush: {
          DEFAULT: '#FFD6D6',
          light: '#FFEBEE',
          dark: '#FFCDD2',
        },
        charcoal: {
          DEFAULT: '#4A4A4A',
          light: '#757575',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.4s ease-in-out',
        'breathe': 'breathe 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
