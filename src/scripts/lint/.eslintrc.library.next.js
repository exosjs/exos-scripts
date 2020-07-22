module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint-config-airbnb",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
    "no-prototype-builtins": "off",
    "object-curly-newline": ["error", {
      "ObjectExpression": { "multiline": true, "consistent": true },
      "ObjectPattern": { "multiline": true, "consistent": true },
      "ImportDeclaration": { "multiline": true, "consistent": true },
      "ExportDeclaration": { "multiline": true, "consistent": true }
    }]
  },
};
