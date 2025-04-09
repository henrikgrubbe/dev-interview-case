// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      prettierRecommended
    ],
  },
);
