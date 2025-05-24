// tailwind.config.js
module.exports = { //
  darkMode: 'class', // Enable class-based dark mode
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], //
  theme: { //
    extend: { //
      // You can extend your theme here if needed
    },
  },
  plugins: [ //
    // require('@tailwindcss/forms'), // Only if you install and intend to use this plugin for default form styling
  ],
};