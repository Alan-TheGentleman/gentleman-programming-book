import { notFound } from 'next/navigation';

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

function isValidLocale(locale: string): locale is Locale {
	return LOCALES.includes(locale as Locale);
}

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params;

	if (!isValidLocale(locale)) {
		notFound();
	}

	return <>{children}</>;
}

export function generateStaticParams() {
	return LOCALES.map(locale => ({ locale }));
}
