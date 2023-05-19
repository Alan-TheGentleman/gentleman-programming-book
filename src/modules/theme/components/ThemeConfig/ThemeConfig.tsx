import React from 'react';

import { localStorageKeys, MyLocalStorageRepo } from '@/shared/repos';
import { useThemeStore } from '@/shared/store';
import { themeClass, ThemeColor, themeColorEnum } from '@/theme/config';

export const ThemeConfig = () => {
	const themeColorCurrent = useThemeStore(s => s.themeColorCurrent);
	const changeThemeColor = useThemeStore(s => s.changeThemeColor);

	React.useEffect(() => {
		const unSub = useThemeStore.subscribe(({ themeColorCurrent }) => {
			MyLocalStorageRepo().save(localStorageKeys.themeColor, themeColorCurrent);

			if (themeColorCurrent === themeColorEnum.values.System) return;

			document.documentElement.classList.value = themeClass[themeColorCurrent];
		});

		return () => unSub();
	});

	React.useEffect(() => {
		const themeColorStoraged = MyLocalStorageRepo().find<ThemeColor>(
			localStorageKeys.themeColor,
		);

		if (themeColorStoraged) {
			changeThemeColor(themeColorStoraged);
			return;
		}

		const darkQuery = '(prefers-color-scheme: dark)';
		const darkMQL = window.matchMedia(darkQuery);

		if (darkMQL.media === darkQuery && darkMQL.matches) {
			changeThemeColor(themeColorEnum.values.Dark);
			return;
		}

		changeThemeColor(themeColorEnum.values.Light);
	}, [changeThemeColor, themeColorCurrent]);

	// React.useEffect(() => {
	// 	const listener = (e: MediaQueryListEvent) => {
	// 		if (themeColorCurrent !== themeColorEnum.values.System) return;

	// 		if (e.matches) {
	// 			document.documentElement.classList.value =
	// 				themeClass[themeColorEnum.values.Dark];
	// 		}

	// 		if (!e.matches) {
	// 			document.documentElement.classList.value =
	// 				themeClass[themeColorEnum.values.Light];
	// 		}
	// 	};

	// 	const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
	// 	darkThemeMq.addEventListener('change', listener);

	// 	return () => darkThemeMq.removeEventListener('change', listener);
	// }, [themeColorCurrent]);

	return null;
};
