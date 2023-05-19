import { useRouter } from 'next/router';
import React from 'react';

export function useIsLocaleChange() {
	const { locale } = useRouter();
	const prevLocale = React.useRef(locale);

	React.useEffect(() => {
		if (locale === prevLocale.current) return;

		prevLocale.current = locale;
	}, [locale]);

	return locale !== prevLocale.current;
}
