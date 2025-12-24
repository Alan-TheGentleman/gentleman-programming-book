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
	description: 'A clean programmer is the best kind of programmer',
	authors: [{ name: 'Alan Buscaglia' }],
	openGraph: {
		type: 'website',
		locale: 'en',
		url: 'https://gentleman-programming-book.vercel.app',
		siteName: 'Gentleman Programming Book',
		images: [
			{
				url: '/seo.webp',
				width: 1200,
				height: 630,
				alt: 'Gentleman Programming Book',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@gentleman_prog',
	},
	icons: {
		icon: '/favicon.ico',
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
