const tailwindConfig = require('./tailwind.config')

module.exports = {
  plugins: {
    tailwindcss: tailwindConfig,
    '@tailwindcss/nesting': {},
    autoprefixer: {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    }
  },
}
