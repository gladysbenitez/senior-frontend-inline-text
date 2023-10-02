module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
    },
  
    env: {
      es6: true,
      browser: true,
      node: true,
      jest: true,
      webextensions: true,
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
      'react-app',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'no-undef': 'off', // https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-unused-vars': ['off'],
      curly: ['error', 'all'],
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      eqeqeq: 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      'react/prop-types': 'off', // Typescript automatically enforces property types
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: true,
        },
      ],
      'unicode-bom': ['error', 'never'],
    },
  };
  