import { notFound } from 'next/navigation';

import { isValidLocale, LOCALES } from '@/src/lib/i18n';

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
