import { createTheme } from '@vanilla-extract/css';

import { sharedTheme } from './shared.theme.css';
import { themeVars } from './theme.contract.css';

export const lightTheme = createTheme(themeVars, {
	...sharedTheme,
	color: {
		bg1: '#fffcfe',
		bg1Contrast: '#000000',

		primary: '#ea1889',
		primaryLight: '#FF5FB9',
		primaryDark: '#B2005C',
		primaryContrast: '#000000',
		primaryTransparent: '#ea188920',

		secondary: '#3a3a3a',
		secondaryLight: '#434343',
		secondaryDark: '#000000',
		secondaryContrast: '#ffffff',
		secondaryTransparent: '#33333320',
	},
});
