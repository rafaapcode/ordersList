module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/first': 'off',
    'arrow-parens': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-useless-escape': 'off',
    'no-useless-return': 'off',
  },
};
