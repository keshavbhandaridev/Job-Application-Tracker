const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', '*.js']
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  {
    files: ['**/*.ts'],
    rules: {
      // Enforce camelCase for variables and functions as per guidelines
      'camelcase': ['error', { properties: 'never' }],
      
      // Enforce const over let where possible
      'prefer-const': 'error',
      
      // Error handling
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
      '@typescript-eslint/no-non-null-assertion': 'warn',
    }
  }
];