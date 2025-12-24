import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function useIsLocaleChange() {
	const params = useParams();
	const locale = params?.locale as string | undefined;
	const prevLocale = useRef(locale);

	useEffect(() => {
		if (locale === prevLocale.current) return;

		prevLocale.current = locale;
	}, [locale]);

	return locale !== prevLocale.current;
}
