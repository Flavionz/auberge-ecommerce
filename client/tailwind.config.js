export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1E1B18",
        darkAccent: "#2C2C2C",
        gold: "#C9A66B",
        terracotta: "#A45A52",
        copper: "#B87333",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
        slideUp: 'slideUp 0.3s ease-out',
        logoReveal: 'logoReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          },
        },
        logoReveal: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.82) translateY(-16px)',
            filter: 'blur(6px)',
          },
          '60%': {
            opacity: '1',
            filter: 'blur(0px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0px)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};