module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    '@typescript-eslint',
    'prettier',
    'sonarjs',
    'sort-destructure-keys',
    'sort-keys-fix',
    '@typescript-eslint',
    'typescript-sort-keys',
  ],
  extends: [
    'airbnb',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['.js', '.ts', '**/*.spec.js', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    },
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'default-param-last': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-debugger': 'warn',
    'no-unused-vars': 'off',
    camelcase: 'off',
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, -1],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-use-before-define': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'self'],
      },
    ],
    'class-methods-use-this': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-useless-constructor': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
    },
  },
}
