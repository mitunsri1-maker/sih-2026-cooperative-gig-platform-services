/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030508',
          900: '#07090e',
          850: '#0a0d14',
          800: '#0f141f',
          750: '#151b2a',
          700: '#1d2436',
          600: '#2c354e',
        },
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          indigo: '#6366f1',
          purple: '#8b5cf6',
          violet: '#7c3aed',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15), transparent 70%)',
        'radial-purple': 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12), transparent 60%)',
        'radial-blue': 'radial-gradient(circle at 20% 40%, rgba(59, 130, 246, 0.1), transparent 60%)',
        'linear-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'linear-glass-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
        'border-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02))',
      },
      boxShadow: {
        'glow-emerald': '0 0 40px -10px rgba(16, 185, 129, 0.35)',
        'glow-purple': '0 0 40px -10px rgba(139, 92, 246, 0.35)',
        'glow-blue': '0 0 40px -10px rgba(59, 130, 246, 0.35)',
        'glow-subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'glass-3d': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
