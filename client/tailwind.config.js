/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode by toggling a class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        background: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        primary: 'var(--accent-primary)',
        text: 'var(--text-primary)',
        textMuted: 'var(--text-muted)',
      },
      boxShadow: {
        'glass-sm': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'glass-md': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 40px rgba(0, 0, 0, 0.12)',
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
