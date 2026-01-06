import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
	// Global ignores
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'dist/**',
			'build/**',
			'coverage/**',
			'templates/**',
			'old/**',
			'*.config.js',
			'*.config.mjs',
			'next.config.mjs',
		],
	},

	// Base JS config
	js.configs.recommended,

	// TypeScript configs
	...tseslint.configs.recommended,

	// React config
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'@next/next': nextPlugin,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
				React: 'readonly',
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
	},

	// Import sorting
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},

	// TypeScript specific rules
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					caughtErrors: 'none',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-use-before-define': 'error',
			'no-use-before-define': 'off',
		},
	},

	// Test files - relaxed rules
	{
		files: ['__TESTS__/**', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},

	// Prettier (must be last to override other formatting rules)
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
		},
	},

	// Disable rules that conflict with Prettier
	prettierConfig,
);
