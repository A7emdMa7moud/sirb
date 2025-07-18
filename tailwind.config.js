/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/path/to/your/image.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#030014",
        light: {
          100: "#cecefb",
          200: "#a8b5db",
        },
        gray: {
          100: "#9ca4ab",
        },
        dark: {
          100: "#0f0d23",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)"],
        lato: ["var(--font-lato)"],
      },
      fontWeight: {
        thin: "100",
        light: "300",
        normal: "400",
        bold: "700",
        black: "900",
      },
    },
  },
  plugins: [],
};
