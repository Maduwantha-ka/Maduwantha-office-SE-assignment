/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        mint:    '#E8F5EE',
        green:   '#16A34A',
        'green-dark': '#14532D',
        'green-mid':  '#22C55E',
        'green-pale': '#F0FDF4',
        ink:     '#0D1117',
        'ink-soft': '#374151',
        'ink-muted': '#9CA3AF',
        'border': '#E5E7EB',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
