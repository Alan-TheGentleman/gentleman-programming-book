/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	reactStrictMode: true,
	compiler: { styledComponents: true },
	i18n: {
		// These are all the locales you want to support in
		// your application
		defaultLocale: 'en',
		locales: ['en', 'es'],
		localeDetection: false,
	},
};

module.exports = nextConfig;
