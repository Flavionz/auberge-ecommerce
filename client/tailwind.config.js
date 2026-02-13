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
      },
    },
  },
  plugins: [],
};