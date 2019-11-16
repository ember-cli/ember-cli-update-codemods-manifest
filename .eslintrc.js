module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: 'sane-node',
  env: {
    es6: true
  },
  rules: {
    // https://github.com/mysticatea/eslint-plugin-node/issues/77,
    'node/no-unpublished-require': 'off'
  },
  overrides: [
    {
      files: 'test/tests.js',
      plugins: [
        'mocha'
      ],
      extends: 'plugin:mocha/recommended',
      env: {
        mocha: true
      },
      rules: {
        'mocha/no-exclusive-tests': 'error'
      }
    }
  ]
};
