import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: false,
  stylistic: {
    indent: 2,
  },
  rules: {
    'no-console': 'off',
  },
})
