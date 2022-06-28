module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  plugins: ['import'],
  rules: {
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'no-void': 'off',
    'no-empty-pattern': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
