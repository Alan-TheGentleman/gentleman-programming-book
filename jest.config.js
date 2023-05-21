// jest.config.js
const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

// @ts-ignore
const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
	verbose: true,
	preset: 'ts-jest',
	rootDir: '.',
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
	moduleFileExtensions: ['ts', 'js', 'json', 'tsx'],
	modulePaths: [compilerOptions.baseUrl],
	transform: {
		'^.+\\.(ts|tsx|js)$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths /*, { prefix: '<rootDir>/' } */,
	),
	testMatch: ['**/__TESTS__/**/*.spec.(ts|js|tsx)'],
	// testMatch: ['<rootDir>/__TESTS__/**/*.spec.(ts|js|tsx)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
