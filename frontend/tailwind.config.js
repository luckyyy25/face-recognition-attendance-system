module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // dark mode destekli (class tabanlı)
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        primary: "#4F46E5",     // Indigo (Ana renk)
        secondary: "#10B981",   // Yeşil (Success)
        danger: "#EF4444",      // Kırmızı
        warning: "#F59E0B",     // Turuncu
        dark: "#111827",        // Siyah ton
        light: "#F3F4F6",       // Açık arkaplan
        "gray-light": "#E5E7EB",
        "gray-medium": "#9CA3AF",
        "gray-dark": "#4B5563",
        "glass-white": "rgba(255, 255, 255, 0.4)",
        "glass-dark": "rgba(17, 24, 39, 0.6)",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
      animation: {
        scan: 'scan 2s linear infinite',
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
