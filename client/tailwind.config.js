/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3E50",
        secondary: "#3498DB",
        background: "#F4F6F9",
        textPrimary: "#2C3E50",
        textSecondary: "#7F8C8D",
        header: "#FFFFFF",
        sidebar: "#34495E",
        cardBackground: "#FFFFFF",
        cardShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        18: "4.5rem",
      },
      boxShadow: {
        subtle: "0 2px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
