module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    // Enforce camelCase for variables and functions as per guidelines
    'camelcase': ['error', { properties: 'never' }],
    
    // Enforce const over let where possible
    'prefer-const': 'error',
    
    // Error handling
    'no-try-catch-without-throw': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Code style
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_' 
    }],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    
    // TypeScript specific
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // Prettier integration
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'es5',
      'printWidth': 100,
      'tabWidth': 2,
      'semi': true
    }],
  },
};