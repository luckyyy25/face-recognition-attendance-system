module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#4F46E5", // Indigo color from Figma
          secondary: "#10B981", // Green color for success
          danger: "#EF4444",   // Red for errors/alerts
          warning: "#F59E0B",  // Amber for warnings
          dark: "#111827",     // Dark gray/black
          light: "#F3F4F6",    // Light background
          "gray-light": "#E5E7EB",
          "gray-medium": "#9CA3AF",
          "gray-dark": "#4B5563"
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        borderRadius: {
          'xl': '1rem',
        }
      },
    },
    plugins: [],
  }