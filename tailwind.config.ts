import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary': '#4B4B4E',
      'secondary': '#A7A8CD',
      'tertiary': '#CFA616',
      'quaternary': '#48A9A6',
      'quinary': '#D77D6E',
      'senary': '#1F1F22',

    },
    minWidth: {
      '1/6': '16.666667%',
      '1/3': '33.333333%',
    },
    minHeight: {
      '1/2': '50%',
      '1/3': '33.333333%',
    },
    maxHeight: {
      '1/2': '50%',
      '1/3': '33.333333%',
    },  
  },
  plugins: [],
}
export default config
