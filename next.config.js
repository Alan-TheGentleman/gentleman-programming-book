const path = require('path');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		largePageDataBytes: 128 * 100000,
	},
	compress: true,
	outputFileTracingRoot: path.join(__dirname, './'),
};

module.exports = withVanillaExtract(nextConfig);
