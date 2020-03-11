module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/strongly-recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "vue"
  ],
  rules: {
    indent: [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    quotes: [
      "error",
      "single"
    ],
    semi: [
      "error",
      "never"
    ],
    "no-prototype-builtins": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "array-bracket-newline": [
      "error",
      {
        minItems: 1
      }
    ],
    "array-element-newline": [
      "error",
      "always"
    ],
    "vue/require-prop-types": 0,
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
};
