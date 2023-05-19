import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/theme/config';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const text = style({
	display: 'none',
});

export const select = style({
	display: 'inline-flex',
	borderRadius: themeVars.radii.full,
	lineHeight: '1',
	padding: themeVars.space.space06,
	fontSize: themeVars.fontSize.lg,
	backgroundColor: themeVars.color.primary.base,

	'@media': {
		[media.up('lg')]: {
			borderRadius: themeVars.radii.md,
			paddingInline: themeVars.space.space12,
		},
	},
});

export const iconLeftContainer = style({
	lineHeight: '0',
	color: themeVars.color.neutral.base,
});

export const buttonText = style({
	display: 'none',

	'@media': {
		[media.up('lg')]: {
			display: 'inline',
		},
	},
});

export const circleRecipe = recipe({
	base: {
		borderRadius: themeVars.radii.full,
		aspectRatio: '1/1',
		border: `1px solid ${themeVars.color.primary.base}`,
	},
	variants: {
		colorScheme: {
			Dark: {
				color: themeVars.color.dark,
			},
			Light: {
				color: themeVars.color.light,
			},
			Sepia: {
				color: themeVars.color.sepia,
			},
		},
	},
});
