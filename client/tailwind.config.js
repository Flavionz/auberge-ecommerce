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
    },
  },
  plugins: [],
}