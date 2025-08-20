module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Integrasi Prettier
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prettier/prettier": "warn",
  },
};
