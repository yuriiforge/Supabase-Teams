import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

// FIX: Use .config instead of .defineConfig
export default tseslint.config([
  // 1. Global Ignores
  {
    ignores: [
      'dist',
      'node_modules',
      '.vite',
      'eslint.config.mjs', // Ignore this file itself
      'supabase/functions/', // Ignore your Deno functions for now
    ],
  },

  // 2. Base Rules for all JS/TS files
  js.configs.recommended,
  ...tseslint.configs.recommended, // Base TS rules
  react.configs.flat.recommended, // Base React rules

  // 3. Config for your React/Vite source code
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser, // Enable browser global variables
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      // --- Rules you've asked for ---
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // --- Important for modern React/Vite ---
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // --- Vite-specific ---
      'react-refresh/only-export-components': 'warn',
    },
  },
]);
