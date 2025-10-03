/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        border: 'var(--border)',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sentient: ['Sentient', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 8px 2px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
}
