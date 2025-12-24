'use client';

import { useEffect } from 'react';

import { localStorageKeys, MyLocalStorageService } from '@/shared/services';
import { useThemeStore } from '@/shared/store';
import { themeClass, ThemeColor, themeColorEnum } from '@/theme/config';

interface ThemeProviderProps {
	children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const themeColorCurrent = useThemeStore(s => s.themeColorCurrent);
	const changeThemeColor = useThemeStore(s => s.changeThemeColor);

	// Sync theme changes to localStorage and DOM
	useEffect(() => {
		const unSub = useThemeStore.subscribe(({ themeColorCurrent }) => {
			MyLocalStorageService().save(
				localStorageKeys.themeColor,
				themeColorCurrent,
			);

			if (themeColorCurrent === themeColorEnum.values.System) return;

			document.documentElement.classList.value = themeClass[themeColorCurrent];
		});

		return () => unSub();
	}, []);

	// Initialize theme from localStorage or system preference
	useEffect(() => {
		const themeColorStoraged = MyLocalStorageService().find<ThemeColor>(
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
	}, [changeThemeColor]);

	return <>{children}</>;
}
