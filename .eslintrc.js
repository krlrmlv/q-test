module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 0,
    camelcase: 'off',
    'no-irregular-whitespace': 0,
  },
}
