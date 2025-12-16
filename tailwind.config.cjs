/**
 * Tailwind CSS configuration for the Kesra website.
 *
 * Without this file, Tailwind may purge arbitrary-value classes (like bg-[radial-gradient(...)]
 * or opacity-[0.12]) leading to unstyled pages. The `safelist` ensures that any arbitrary
 * utilities you write remain in the final CSS.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  safelist: [
    { pattern: /bg-\[[^\]]+\]/ },
    { pattern: /text-\[[^\]]+\]/ },
    { pattern: /opacity-\[[^\]]+\]/ },
    { pattern: /h-\[[^\]]+\]/ },
    { pattern: /w-\[[^\]]+\]/ },
    { pattern: /inset-\[[^\]]+\]/ },
    { pattern: /flex-\[[^\]]+\]/ },
    { pattern: /grid-\[[^\]]+\]/ },
    { pattern: /shadow-\[[^\]]+\]/ }
  ]
};
