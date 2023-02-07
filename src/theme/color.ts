import { generateCssVariablesKeys } from 'src/utils/generateCssVariablesKeys';

const primary = {
	main: '#1c1c1c',
	light: '#434343',
	dark: '#000000',
	transparent: '#1c1c1c20',
	contrast: '#ffffff',
} as const;

const secondary = {
	main: '#ea1889',
	light: '#FF5FB9',
	dark: '#B2005C',
	transparent: '#ea188920',
	contrast: '#ffffff',
} as const;

const accent = {
	main: '#ea1889',
	light: '#FF5FB9',
	dark: '#B2005C',
} as const;

const background = {
	// default: '#FFFFFF',
	// defaultInverted: '#000000',
	default: '#f9f9f9',
	themeChoose: '#FFFFFF',
	defaultInverted: '#060606',
	logo: '#1c1c1c',
	logoTransparent: '#1c1c1c80',
} as const;

const text = {
	primary: '#000000de',
	secondary: '#00000099',
	disabled: '#00000061',
} as const;

const shadow = {
	primary: '#000000',
	secondary: '#00000030',
} as const;

// eslint-disable-next-line no-unused-vars
const palette = {
	white: '#FFFFFF',
	// brown: '#704214',
	brown: 'rgba(92, 76, 53, 1)',
	// brownLigth: '#dcc1a7',
	brownLigth: 'rgba(249, 240, 219, 1)',
	primaryDark: '#000000',
	primaryLight: '#2C2C2C',
	secondaryDark: '#B2005C',
	secondaryLight: '#FF5FB9',
	secondary: '#ea1889',
} as const;

export const defaultTheme = {
	primary,
	secondary,
	text,
	background,
	accent,
	shadow,
} as const;

export const sepiaTheme = {
	...defaultTheme,
	background: {
		...defaultTheme.background,
		default: '#f9f0db',
		defaultInverted: '#060f24',
		themeChoose: '#cc9a52',
	},
	text: {
		primary: '#5c4c35',
		secondary: '#5c4c3599',
		disabled: '#5c4c3561',
	},
} as const;

export const darkTheme = {
	...defaultTheme,
	primary: {
		main: '#e1e1e1',
		light: '#ffffff',
		dark: '#bcbcbc',
		transparent: '#e1e1e120',
		contrast: '#000000',
	},
	background: {
		...defaultTheme.background,
		default: '#2C2C2C',
		defaultInverted: '#d3d3d3',
		themeChoose: '#000000',
	},
	text: {
		primary: '#ffffff',
		secondary: '#ffffff99',
		disabled: '#ffffff61',
	},
} as const;

export type PalleteColor = typeof defaultTheme;

export const color = generateCssVariablesKeys(defaultTheme);

export type Color = keyof typeof color;
