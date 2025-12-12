import jseslint from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintTestingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([

  // -------------------------
  // Игнорируемые папки и файлы
  // -------------------------
  globalIgnores(['node_modules', 'dist', '*.d.ts', '**/coverage', '**/dist']),

  {
    ignores: ['vite.config.ts'],
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
        RequestInit: true,
      },
    },

    extends: [
      jseslint.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReactHooks.configs.flat.recommended,
    ],

    rules: {

      // -------------------------
      // Код-стайл / стиль написания
      // -------------------------
      semi: ['error', 'always'],                          // Всегда ставим точку с запятой
      quotes: ['error', 'single', { avoidEscape: true }], // Одинарные кавычки для строк
      'comma-dangle': ['error', 'always-multiline'],      // Трейлинг-коммы в многострочных объектах/массивах
      'no-multiple-empty-lines': ['error', { max: 1 }],   // Не более одной пустой строки
      'max-len': ['warn', { code: 120 }],                 // Максимальная длина строки 120 символов
      'arrow-parens': ['error', 'always'],                // Скобки для стрелочных функций всегда
      'curly': ['error', 'all'],                          // Всегда использовать фигурные скобки
      'indent': ['error', 2],                             // 2 пробела для отступов

      // -------------------------
      // Безопасность JS/TS
      // -------------------------
      'no-eval': 'error',             // Запрет eval
      'no-implied-eval': 'error',     // Запрет косвенного eval
      'no-new-func': 'error',         // Запрет new Function()
      'no-unsafe-finally': 'error',   // Ошибки в finally
      'no-undef': 'error',            // Использование несуществующих переменных
      'no-unused-vars': ['error', {   // Неиспользуемые переменные
        args: 'after-used',
        ignoreRestSiblings: true,
      }],
      'eqeqeq': ['error', 'always'],  // Использовать === вместо ==
      'prefer-const': 'error',        // Предпочитать const, если переменная не изменяется
      'no-throw-literal': 'error',    // Запрет выбрасывать не-Error объекты

      // -------------------------
      // React/JSX
      // -------------------------
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['warn', { component: true, html: true }],
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'warn',

      'react/jsx-uses-react': 'off',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/jsx-max-props-per-line': ['warn', { maximum: 3, when: 'multiline' }],
      'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-no-bind': ['warn', { ignoreRefs: true, allowArrowFunctions: false }],
      'react/jsx-no-useless-fragment': 'warn',

      // -------------------------
      // React Hooks
      // -------------------------
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // -------------------------
      // Производство / безопасность
      // -------------------------
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'error',
    },
  },

  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    extends: [
      eslintPluginImport.flatConfigs.react,
      eslintPluginImport.flatConfigs.typescript,
    ],

    rules: {
      // -------------------------
      // Организация импортов
      // -------------------------
      'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'import/no-cycle': 'error',
    },
  },

  {
    files: ['**/*.{test,spec}.{ts,tsx,js,jsx}', '**/__tests__/**/*.{ts,tsx,js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },

    extends: [
      jseslint.configs.recommended,
      ...tseslint.configs.recommended,
      eslintTestingLibrary.configs['flat/react'],
    ],

    rules: {
      'no-console': 'off',  // можно разрешить console.log в тестах
    },
  },

  {
    files: ['vite.config.ts'],
    extends: [
      jseslint.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginImport.flatConfigs.typescript,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
        // ...globals.node,
      },
    },

    rules: {
      // -------------------------
      // Организация импортов
      // -------------------------
      'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'import/no-cycle': 'error',
      'no-console': 'off',
    },
  },

]);
