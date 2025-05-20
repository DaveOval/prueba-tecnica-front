/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    safelist: [
      {
        pattern: /(bg|text|border)-(red|blue|green|yellow|purple|pink|gray|slate|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose|orange)-(50|100|200|300|400|500|600|700|800|900)/,
      },
      "text-white",
      "bg-white",
    ],
  }