module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-param-reassign": "off",
    "no-unused-vars": "off",
    "import/prefer-default-export": "off",
    "space-before-function-paren": "off",
    "class-methods-use-this": "off",
    "import/order": "off",
    "indent": ["error", 4],
    "semi": ["error", "never"],
    "object-curly-newline": ["error", {
      multiline: true
    }]
  },
};
