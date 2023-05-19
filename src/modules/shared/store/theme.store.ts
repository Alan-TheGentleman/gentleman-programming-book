import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ThemeColor, themeColorEnum } from '@/theme/config';

interface ThemeStore {
	themeColorCurrent: ThemeColor;
	changeThemeColor: (themeColor: ThemeColor) => void;
}

export const useThemeStore = create(
	devtools<ThemeStore>(
		set => ({
			themeColorCurrent: themeColorEnum.values.Light,
			changeThemeColor: themeColor => {
				set({ themeColorCurrent: themeColor });
			},
		}),
		{ name: '[theme]' },
	),
);
