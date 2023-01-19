const palette = {
	white: '#FFFFFF',
	brown: '#704214',
	brownLigth: '#DCC1A7',
	primaryDark: '#000000',
	primaryLight: '#2C2C2C',
	secondaryDark: '#B2005C',
	secondaryLight: '#FF5FB9',
	secondary: '#ea1889',
} as const;

// ligth
export const color = {
	text: palette.primaryDark,
	textAccent: palette.secondary,
	background1: palette.white,
	background2: palette.white,
	buttonPrimary: palette.secondaryDark,
	buttonSecondary: palette.primaryDark,
	textButtonSolid: palette.white,
};

// sepia
// export const color = {
// 	text: palette.brown,
// 	textAccent: palette.primaryLight,
// 	background1: palette.brownLigth,
// 	background2: palette.brownLigth,
// 	buttonPrimary: palette.secondaryDark,
// 	buttonSecondary: palette.primaryDark,
// 	textButtonSolid: palette.white,
// };

// dark
// export const color = {
// 	text: palette.white,
// 	textAccent: palette.secondaryLight,
// 	background1: palette.primaryLight,
// 	background2: palette.primaryLight,
// 	buttonPrimary: palette.secondaryLight,
// 	buttonSecondary: palette.white,
// 	textButtonSolid: palette.white,
// };
