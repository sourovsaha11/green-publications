/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-card':      '#161616',
        'bg-card-hover':'#1c1c1c',
        'green-accent': '#2ecc71',
        'green-dark':   '#27ae60',
        'green-light':  '#a8f0c6',
        'green-mint':   '#c8f5d5',
        'border-dark':  '#222222',
        'border-green': 'rgba(46,204,113,0.3)',
        'text-main':    '#ffffff',
        'text-sub':     '#a0a0a0',
        'text-muted':   '#606060',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'green-glow': '0 0 30px rgba(46,204,113,0.15)',
        'card':       '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
