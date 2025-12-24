export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export function isValidLocale(locale: string): locale is Locale {
	return LOCALES.includes(locale as Locale);
}
