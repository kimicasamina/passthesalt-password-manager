/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#81C784" /* Soft Pastel Green */,
        secondary: "#A5D6A7" /* Light Green */,
        background: "#F1F8E9" /* Light Yellowish Green Background */,
        surface: "#FFFFFF" /* White Surface */,
        text: "#212121" /* Dark Text */,
        accent: "#66BB6A" /* Fresh Green */,
        border: "#E0E0E0" /* Light Border */,
        gray: {
          100: "#F9F9F9" /* Very Light Gray */,
          500: "#BDBDBD" /* Medium Gray */,
          900: "#212121" /* Dark Gray */,
        },
      },
      // spacing: {
      //   18: "4.5rem",
      // },
      // boxShadow: {
      //   subtle: "0 2px 6px rgba(0, 0, 0, 0.2)",
      //   mild: "0 2px 6px rgba(0, 0, 0, 0.3)",
      //   strong: "0 2px 6px rgba(0, 0, 0, 0.4)",
      // },
    },
  },
  plugins: [],
};
