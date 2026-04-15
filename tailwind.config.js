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
          50:  '#eef0ff',
          100: '#dfe3ff',
          200: '#c5caff',
          300: '#a1a8ff',
          400: '#5B6EFF',  // main
          500: '#4A5DE6',
          600: '#3F51D1',  // hover
          700: '#3344b0',
          800: '#2a388e',
          900: '#232e71',
          950: '#161c45',
          DEFAULT: '#5B6EFF',
        },
        surface: {
          50:  '#FFFFFF',
          100: '#F8FAFC',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#475569',  // secondary text
          600: '#334155',
          700: '#1E293B',
          800: '#1E293B',
          900: '#0F172A',  // primary text
          950: '#020617',
        },
        accent: {
          400: '#5B6EFF',
          500: '#4A5DE6',
          600: '#3F51D1',
          DEFAULT: '#5B6EFF',
        },
        brand: {
          400: '#5B6EFF',
          500: '#4A5DE6',
          600: '#3F51D1',
          300: '#a1a8ff',
          200: '#c5caff',
          50:  '#eef0ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
