'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    es6: true
  },
  extends: [
    'sane-node'
  ],
  rules: {
    // https://github.com/mysticatea/eslint-plugin-node/issues/77,
    'node/no-unpublished-require': 'off'
  },
  overrides: [
    {
      files: [
        'test/tests.js'
      ],
      env: {
        mocha: true
      },
      plugins: [
        'mocha'
      ],
      extends: [
        'plugin:mocha/recommended'
      ],
      rules: {
        'mocha/no-exclusive-tests': 'error'
      }
    }
  ]
};
