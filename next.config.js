const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		largePageDataBytes: 128 * 100000,
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		localeDetection: false,
	},
	compress: true,
};

module.exports = withVanillaExtract(nextConfig);
