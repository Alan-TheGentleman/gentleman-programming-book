import { createTheme } from '@vanilla-extract/css';

import { addAlphasToScale } from '@/theme/utils/makeAlphaScheme';

import { sharedTheme } from './shared.theme.css';
import { themeVars } from './theme.contract.css';

export const darkTheme = createTheme(themeVars, {
	...sharedTheme,
	color: {
		dark: '#090005',
		light: '#fffcfe',
		sepia: '#dcc1a7',

		outline: '#FFA54B',

		black: '#000000',
		bg1: '#090005',
		bg1Contrast: '#ffffff',
		bg1ContrastLight: '#ffffff90',

		neutral: addAlphasToScale({
			base: '#000000',
			50: '#f2f2f2',
			100: '#d9d9d9',
			200: '#bfbfbf',
			300: '#a6a6a6',
			400: '#8c8c8c',
			500: '#737373',
			600: '#595959',
			700: '#404040',
			800: '#262626',
			900: '#0d0d0d',
		}),

		primary: addAlphasToScale({
			50: '#ffe6f6',
			100: '#f8bbdc',
			200: '#f08fc3',
			300: '#e863ab',
			400: '#e13993',
			500: '#c71f7a',
			600: '#9c175f',
			700: '#700e44',
			800: '#45062a',
			900: '#1c0011',
			base: '#ea1889',
		}),

		secondary: addAlphasToScale({
			base: '#3a3a3a',
			50: '#fbf0f2',
			100: '#dcd8d9',
			200: '#bfbfbf',
			300: '#a6a6a6',
			400: '#8c8c8c',
			500: '#737373',
			600: '#595959',
			700: '#404040',
			800: '#282626',
			900: '#150a0d',
		}),

		accent: addAlphasToScale({
			base: '#1CEBBE',
			50: '#dbfff8',
			100: '#b2faeb',
			200: '#85f6dd',
			300: '#58f1d0',
			400: '#2cecc3',
			500: '#13d3a9',
			600: '#02a484',
			700: '#00755e',
			800: '#004737',
			900: '#001913',
		}),

		tertiary: addAlphasToScale({
			base: '#f1d1a2',
			50: '#fff3e1',
			100: '#f6deba',
			200: '#eec890',
			300: '#e8b265',
			400: '#e09c3b',
			500: '#c68322',
			600: '#9b6619',
			700: '#6f4911',
			800: '#432c07',
			900: '#1a0e00',
		}),
	},
});
