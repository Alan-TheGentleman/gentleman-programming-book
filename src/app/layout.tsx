import '@/src/styles/global.css';
import '@/src/styles/rehype-prism-theme.css';

import { Metadata, Viewport } from 'next';

import { ThemeProvider } from './_components/theme-provider';

export const metadata: Metadata = {
	metadataBase: new URL('https://gentleman-programming-book.vercel.app'),
	title: {
		default: 'Gentleman Programming Book',
		template: '%s | Gentleman Programming Book',
	},
	description:
		'Free book about Clean Architecture, SOLID principles, TDD, Hexagonal Architecture, and software craftsmanship. Learn to write clean, maintainable code.',
	keywords: [
		'clean architecture',
		'software architecture',
		'SOLID principles',
		'TDD',
		'test driven development',
		'hexagonal architecture',
		'clean code',
		'typescript',
		'react',
		'frontend architecture',
		'programming book',
		'free programming book',
		'gentleman programming',
	],
	authors: [
		{ name: 'Alan Buscaglia', url: 'https://github.com/Alan-TheGentleman' },
	],
	creator: 'Alan Buscaglia',
	publisher: 'Gentleman Programming',
	openGraph: {
		type: 'website',
		locale: 'en',
		alternateLocale: 'es',
		url: 'https://gentleman-programming-book.vercel.app',
		siteName: 'Gentleman Programming Book',
		title: 'Gentleman Programming Book',
		description:
			'Free book about Clean Architecture, SOLID principles, TDD, and software craftsmanship.',
		images: [
			{
				url: '/seo.webp',
				width: 1200,
				height: 630,
				alt: 'Gentleman Programming Book - A clean programmer is the best kind of programmer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@gentleman_prog',
		title: 'Gentleman Programming Book',
		description:
			'Free book about Clean Architecture, SOLID principles, TDD, and software craftsmanship.',
		images: ['/seo.webp'],
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/favicon.ico',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		// Add these when you have them
		// google: 'your-google-verification-code',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
