module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // enables dark mode using class strategy
  theme: {
    container: {
      center: true, // centers the container
      padding: '1rem', // container padding
      screens: { // responsive breakpoints
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        primary: "#FFBAD2",     // main pink color
        secondary: "#C8CFB4",   // green for success
        danger: "#EF4444",      // red for errors
        warning: "#F59E0B",     // orange for warnings
        dark: "#111827",        // dark background
        light: "#F3F4F6",       // light background
        success: "#ffffff",     // white
        "gray-light": "#E5E7EB", // light gray
        "gray-medium": "#9CA3AF", // medium gray
        "gray-dark": "#4B5563",  // dark gray
        "glass-white": "rgba(255, 255, 255, 0.4)", // glass effect white
        "glass-dark": "rgba(17, 24, 39, 0.6)", // glass effect dark
      },
      fontFamily: {
        sans: [
          'HelveticaNeueLight',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ],
      },

      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)', // glassmorphism shadow
      },
      transitionTimingFunction: {
        'in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)', // custom easing
      },
      animation: {
        scan: 'scan 2s linear infinite', // custom scan animation
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
