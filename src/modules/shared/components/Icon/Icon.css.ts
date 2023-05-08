import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { media } from '@/theme/config';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const iconRecipe = recipe({
	base: {
		display: 'inline-flex',
		verticalAlign: 'middle',
	},
	variants: {
		colorScheme: {
			primary: {
				color: themeVars.color.primary.base,
			},
		},
		size: {
			xs: {
				fontSize: themeVars.fontSize.md,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.lg,
					},
				},
			},
			sm: {
				fontSize: themeVars.fontSize.lg,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl,
					},
				},
			},
			md: {
				fontSize: themeVars.fontSize.xl,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl2,
					},
				},
			},
			xl: {
				fontSize: themeVars.fontSize.xl2,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl3,
					},
				},
			},
			xl2: {
				fontSize: themeVars.fontSize.xl3,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl4,
					},
				},
			},
			xl3: {
				fontSize: themeVars.fontSize.xl4,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl5,
					},
				},
			},
		},
	},

	defaultVariants: {
		colorScheme: 'primary',
		size: 'md',
	},
});

export type IconVariants = RecipeVariants<typeof iconRecipe>;
