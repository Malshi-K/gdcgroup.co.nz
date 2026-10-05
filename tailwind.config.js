/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-navy": "#1A242F",
        "primary-blue": "#0061B4",
        "primary-blue-dark": "#00559F",
        "light-blue": "#EAF4FB",
        "off-white": "#F7F9FA",
        "accent-teal": "#168A8A",
      },
      textColor: {
        dark: "#26323B",
        secondary: "#66727C",
      },
      borderColor: {
        light: "#DDE3E8",
      },
      divideColor: {
        light: "#DDE3E8",
      },
      fontFamily: {
        sans: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
