module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  ignorePatterns: ['.eslintrc.js', 'node_modules'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/object-curly-spacing': 'off'
  }
};
