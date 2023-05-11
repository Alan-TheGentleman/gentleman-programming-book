import { createThemeContract } from '@vanilla-extract/css';

import * as contractUtils from '@/theme/utils/contractUtils';

import { sharedTheme } from './shared.theme.css';

// const

export const themeVars = createThemeContract({
	...sharedTheme,
	color: {
		dark: null,
		light: null,
		sepia: null,
		outline: null,

		black: null,
		bg1: null,
		bg1Contrast: null,
		bg1ContrastLight: null,

		neutral: contractUtils.createScaleWithAlphas(),
		primary: contractUtils.createScaleWithAlphas(),

		secondary: contractUtils.createScaleWithAlphas(),

		tertiary: contractUtils.createScaleWithAlphas(),
	},
});
