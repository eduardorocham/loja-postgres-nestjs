module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // <- isso desativa regras que conflitam com Prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // Regras adicionais, se quiser
    "prettier/prettier": "warn",
  },
};
