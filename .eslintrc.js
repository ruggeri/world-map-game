module.exports = {
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "json", "react"],
  rules: {
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-explicit-any": ["error"],
    "arrow-parens": ["error", "always"],
    "class-methods-use-this": ["warn"],
    "import/prefer-default-export": 0,
    "no-console": 0,
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".jsx", ".tsx"] },
    ],
    // Otherwise it tries to sort alphabetically within "groups":
    // defined by how many things are imported (one, multiple?).
    "sort-imports": [2, { ignoreDeclarationSort: true }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
