import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'es'] as const;
const DEFAULT_LOCALE = 'en';

function getLocaleFromPath(pathname: string): string | null {
	const segments = pathname.split('/');
	const potentialLocale = segments[1];
	return LOCALES.includes(potentialLocale as (typeof LOCALES)[number])
		? potentialLocale
		: null;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip API routes, static files, and Next.js internals
	if (
		pathname.startsWith('/api') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/fonts') ||
		pathname.startsWith('/img') ||
		pathname.startsWith('/algorithms') ||
		pathname.startsWith('/clean-agile') ||
		pathname.startsWith('/es/') ||
		pathname.includes('.') // files with extensions
	) {
		return NextResponse.next();
	}

	// Check if pathname already has a locale
	const pathnameLocale = getLocaleFromPath(pathname);

	if (pathnameLocale) {
		return NextResponse.next();
	}

	// Redirect to default locale
	const url = request.nextUrl.clone();
	url.pathname = `/${DEFAULT_LOCALE}${pathname}`;

	return NextResponse.redirect(url);
}

export const config = {
	matcher: ['/((?!_next|api|fonts|img|algorithms|clean-agile|.*\\..*).*)'],
};
