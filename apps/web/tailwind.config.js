/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
     
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
    "dim"
    ],
  },
})


