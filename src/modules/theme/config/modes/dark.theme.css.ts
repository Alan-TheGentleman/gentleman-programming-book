import { createTheme } from '@vanilla-extract/css';

import { sharedTheme } from './shared.theme.css';
import { themeVars } from './theme.contract.css';

export const darkTheme = createTheme(themeVars, {
	...sharedTheme,
	color: {
		bg1: '#090005',
		bg1Contrast: '#ffffff',

		primary: '#ea1889',
		primaryLight: '#FF5FB9',
		primaryDark: '#B2005C',
		primaryContrast: '#000000',
		primaryTransparent: '#ea188930',

		secondary: '#333333',
		secondaryLight: '#434343',
		secondaryDark: '#1f1f1f',
		secondaryContrast: '#ffffff',
		secondaryTransparent: '#9d9d9d30',
	},
});
