import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#ffffff',
          light: '#fafafa',
          dark: '#f5f5f5',
        },
        primary: {
          DEFAULT: '#e07a5f',
          hover: '#cc6e55',
          dark: '#b8624d',
          light: '#f5d5cd',
          50: '#fef6f4',
        },
        accent: {
          DEFAULT: '#81b29a',
          hover: '#6fa389',
          dark: '#5e9278',
          light: '#d4e8df',
          50: '#f2f9f6',
        },
        text: {
          DEFAULT: '#0b0b0c',
          muted: '#6b7280',
        },
        border: '#e5e7eb',
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(224, 122, 95, 0.5)',
        'glow-accent': '0 0 15px rgba(129, 178, 154, 0.5)',
        'subtle': '0 2px 8px rgba(11, 11, 12, 0.04)',
        'card': '0 4px 16px rgba(11, 11, 12, 0.06)',
        'elevated': '0 8px 32px rgba(11, 11, 12, 0.08)',
        'float': '0 12px 48px rgba(11, 11, 12, 0.12)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
