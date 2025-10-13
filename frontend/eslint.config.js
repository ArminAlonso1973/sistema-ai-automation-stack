import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly'
      }
    },
    plugins: {
      react,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: '18.2'
      }
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
];