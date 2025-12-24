import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vanillaExtractPlugin(), react()],
	resolve: {
		alias: {
			'@/book': path.resolve(__dirname, './src/modules/book'),
			'@/theme': path.resolve(__dirname, './src/modules/theme'),
			'@/shared': path.resolve(__dirname, './src/modules/shared'),
			'@/tests': path.resolve(__dirname, './__TESTS__'),
			'@': path.resolve(__dirname),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['vitestSetup.ts'],
		exclude: [...configDefaults.exclude, '**/old/**', '**/e2e/**'],
	},
});
