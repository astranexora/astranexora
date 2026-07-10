/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Logo-derived deep blue
        'brand': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },
        'electric': '#00CFFF',
        'ink': {
          900: '#0A0F1C',  // rich black for headings
          800: '#1A1F2E',
          700: '#2A3142',
          600: '#4A5468',
          500: '#6B7280',  // body text
          400: '#9CA3AF',
          300: '#D1D5DB',
          200: '#E5E7EB',
          100: '#F3F4F6',
          50: '#F9FAFB',
        },
        'canvas': '#FFFFFF',
        'cloud': '#F7F9FC',   // subtle off-white section bg
        'mist': '#EEF2F8',     // card surface tint
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'orbit': 'orbit 12s linear infinite',
        'orbit-reverse': 'orbit 18s linear infinite reverse',
        'counter-ping': 'counterPing 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,102,255,0.15), 0 0 40px rgba(0,102,255,0.05)' },
          '50%': { boxShadow: '0 0 30px rgba(0,102,255,0.25), 0 0 60px rgba(0,102,255,0.1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        counterPing: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
