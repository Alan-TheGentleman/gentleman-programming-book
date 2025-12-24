import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vanillaExtractPlugin(), react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['vitestSetup.ts'],
		exclude: [...configDefaults.exclude, '**/old/**', '**/e2e/**'],
		alias: [
			{
				find: '@/book',
				replacement: path.resolve(__dirname, './src/modules/book'),
			},
			{
				find: '@/theme',
				replacement: path.resolve(__dirname, './src/modules/theme'),
			},
			{
				find: '@/shared',
				replacement: path.resolve(__dirname, './src/modules/shared'),
			},
			{
				find: '@/tests',
				replacement: path.resolve(__dirname, './__TESTS__'),
			},
			{ find: '@', replacement: path.resolve(__dirname) },
		],
	},
});
