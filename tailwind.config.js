/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {colors: {
      'nhs-black': '#231f20',
      'nhs-dark-grey': '#425563',
      'nhs-mid-grey': '#768692',
      'nhs-pale-grey': '#E8EDEE',
      'nhs-white': '#FFFFFF',
  
      'nhs-dark-blue': '#003087',
      'nhs-blue': '#005EB8',
      'nhs-bright-blue': '#0072CE',
      'nhs-light-blue': '#41B6E6',
      'nhs-aqua-blue': '#00A9CE',
  
      'nhs-dark-green': '#006747',
      'nhs-green': '#009639',
      'nhs-light-green': '#78BE20',
      'nhs-aqua-green': '#00A499',
  
      'nhs-purple': '#330072',
      'nhs-dark-pink': '#7C2855',
      'nhs-pink': '#AE2573',
      'nhs-dark-red': '#8A1538',
      'nhs-red': '#DA291C',
      'nhs-orange': '#ED8B00',
      'nhs-warm-yellow': '#FFB81C',
      'nhs-yellow': '#FAE100'
    }},
  },
  plugins: [],
}

