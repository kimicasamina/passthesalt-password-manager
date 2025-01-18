/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  // theme: {
  //   extend: {
  //     // colors: {
  //     //   primary: "#2D3748", // Dark primary color for branding
  //     //   secondary: "#4CAF50", // Green for success
  //     //   accent: "#FF4081", // Accent pink color for highlights
  //     //   background: "#F7FAFC", // Light background for the app
  //     //   surface: "#FFFFFF", // White for surface cards
  //     //   muted: "#A0AEC0", // Muted text color
  //     //   "text-primary": "#1A202C", // Dark text color
  //     //   "text-muted": "#718096", // Lighter text for placeholders
  //     //   border: "#E2E8F0", // Soft border color for inputs and cards
  //     //   focus: "#3182CE", // Focus state for inputs
  //     //   error: "#E53E3E", // Red for error states
  //     //   hover: "#EDF2F7", // Hover effect for clickable items
  //     // },
  //     // fontFamily: {
  //     //   sans: ["Inter", "Arial", "sans-serif"],
  //     //   heading: ["Poppins", "Helvetica", "Arial"],
  //     // },
  //     // spacing: {
  //     //   128: "32rem", // Custom spacing for larger sections
  //     //   160: "40rem", // Custom width for larger screens
  //     // },
  //     // boxShadow: {
  //     //   card: "0 4px 12px rgba(0, 0, 0, 0.1)", // Card shadow
  //     //   input: "0 0 10px rgba(0, 0, 0, 0.05)", // Soft input shadow
  //     // },
  //     // screens: {
  //     //   xl: "1280px",
  //     //   lg: "1024px",
  //     //   md: "768px",
  //     //   sm: "480px",
  //     // },
  //     // colors: {
  //     //   primary: "#81C784" /* Soft Pastel Green */,
  //     //   secondary: "#A5D6A7" /* Light Green */,
  //     //   background: "#F1F8E9" /* Light Yellowish Green Background */,
  //     //   surface: "#FFFFFF" /* White Surface */,
  //     //   text: "#212121" /* Dark Text */,
  //     //   accent: "#66BB6A" /* Fresh Green */,
  //     //   border: "#E0E0E0" /* Light Border */,
  //     //   gray: {
  //     //     100: "#F9F9F9" /* Very Light Gray */,
  //     //     500: "#BDBDBD" /* Medium Gray */,
  //     //     900: "#212121" /* Dark Gray */,
  //     //   },
  //     // },
  //     // animation: {
  //     //   fadeInUp: "fadeInUp 0.5s ease-out forwards",
  //     // },
  //     // keyframes: {
  //     //   fadeInUp: {
  //     //     "0%": { opacity: "0", transform: "translateY(10px)" },
  //     //     "100%": { opacity: "1", transform: "translateY(0)" },
  //     //   },
  //     // },
  //     // // spacing: {
  //     // //   18: "4.5rem",
  //     // // },
  //     // // boxShadow: {
  //     // //   subtle: "0 2px 6px rgba(0, 0, 0, 0.2)",
  //     // //   mild: "0 2px 6px rgba(0, 0, 0, 0.3)",
  //     // //   strong: "0 2px 6px rgba(0, 0, 0, 0.4)",
  //     // // },
  //   },
  // },
  darkMode: "class", // Use class-based dark mode
  lightMode: "class",
  theme: {
    extend: {
      colors: {
        lightBackground: "#F7F7F9", // Light background color
        darkBackground: "#1A202C", // Dark background color
        lightText: "#2D3748", // Light text color
        darkText: "#E2E8F0", // Dark text color
        primary: "#3182CE", // Primary blue color
        secondary: "#2B6CB0", // Darker blue for hover/focus states
        accent: "#68D391", // Green accent (success)
        error: "#F56565", // Red for error states
        borderLight: "#E2E8F0", // Light mode border color
        borderDark: "#4A5568", // Dark mode border color
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Modern, clean font
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      spacing: {
        18: "4.5rem",
      },
      boxShadow: {
        subtle: "0 2px 6px rgba(0, 0, 0, 0.2)",
        mild: "0 2px 6px rgba(0, 0, 0, 0.3)",
        strong: "0 2px 6px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
