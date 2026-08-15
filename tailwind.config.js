/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        border: 'var(--border)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        antiquity: {
          cyan: 'var(--antiquity-cyan)',
          sky: 'var(--antiquity-sky)',
          lavender: 'var(--antiquity-lavender)',
          fog: 'var(--antiquity-fog)',
          bloom: 'var(--antiquity-bloom)',
          charcoal: 'var(--antiquity-charcoal)',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Proxima Nova',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'var(--font-display)',
          'DM Sans',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 0 8px 2px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
}
