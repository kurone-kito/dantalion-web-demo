const neumorphism = require('tailwindcss-neumorphism');
const typography = require('@tailwindcss/typography');

const neumorphismVariants = ['dark', 'focus', 'hover', 'responsive'];

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  plugins: [neumorphism, typography],
  purge: { content: ['./src/**/*.{[cm],}[jt]s{x,}'], enabled: true },
  variants: {
    neumorphismConcave: neumorphismVariants,
    neumorphismConvex: neumorphismVariants,
    neumorphismFlat: neumorphismVariants,
    neumorphismInset: neumorphismVariants,
  },
};
