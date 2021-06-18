module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.json",
  },
  extends: [
    "@sondr3/eslint-config/typescript",
    "@sondr3/eslint-config/node",
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  rules: {
    "no-process-exit": "off",
  },
};
