/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0d8be0",
          50: "#E6F9F7",
          100: "#CCF3EF",
          200: "#99E7DF",
          300: "#66DBCF",
          400: "#33CFBF",
          500: "#0d8be0",
          600: "#0E8477",
          700: "#0B635A",
          800: "#07423D",
          900: "#042120",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      perspective: {
        1000: "1000px",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      rotate: {
        "y-12": "rotateY(12deg)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
