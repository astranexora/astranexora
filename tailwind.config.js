/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand navy — deep navy blue from the logo
        'brand': {
          50: '#F0F2F8',
          100: '#DCE0EE',
          200: '#B9C0D6',
          300: '#8A95B8',
          400: '#5B6B9A',
          500: '#3B4A78',  // muted steel-blue accent
          600: '#2A3859',
          700: '#1E2A47',
          800: '#152040',
          900: '#0F1B3D',  // primary navy
          950: '#0A1228',
        },
        'ink': {
          900: '#0A0A0F',  // near-black for headings, footer
          800: '#1A1A22',
          700: '#2A2A35',
          600: '#3A3A45',
          500: '#4B5563',  // neutral gray for body text
          400: '#6B7280',
          300: '#9CA3AF',
          200: '#D1D5DB',
          100: '#E5E7EB',
          50: '#F3F4F6',
        },
        'canvas': '#FFFFFF',
        'cloud': '#FFFFFF',   // pure white — no off-white backgrounds
        'mist': '#FFFFFF',    // pure white
        'gold': {
          400: '#C9A961',
          500: '#B8975A',
          600: '#A6864E',
        },
      },
      fontFamily: {
        'display': ['"Fraunces"', '"Playfair Display"', 'serif'],
        'body': ['"Inter"', 'sans-serif'],
        'sans': ['"Inter"', 'sans-serif'],
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(15,27,61,0.15), 0 0 40px rgba(15,27,61,0.05)' },
          '50%': { boxShadow: '0 0 30px rgba(15,27,61,0.25), 0 0 60px rgba(15,27,61,0.1)' },
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
