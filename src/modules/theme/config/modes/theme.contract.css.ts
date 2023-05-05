import { createThemeContract } from '@vanilla-extract/css';

import { sharedTheme } from './shared.theme.css';

export const themeVars = createThemeContract({
	...sharedTheme,
	color: {
		bg1: null,
		bg1Contrast: null,

		primary: null,
		primaryLight: null,
		primaryDark: null,
		primaryContrast: null,
		primaryTransparent: null,

		secondary: null,
		secondaryLight: null,
		secondaryDark: null,
		secondaryContrast: null,
		secondaryTransparent: null,
	},
});
