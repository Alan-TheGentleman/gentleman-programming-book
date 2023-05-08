import { createVar } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { media } from '@/theme/config';
import { darkTheme } from '@/theme/config/modes/dark.theme.css';
import { lightTheme } from '@/theme/config/modes/ligth.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';
import { ColorVariants } from '@/theme/utils/ColorsVariants';

const color = createVar();

export const textRecipe = recipe({
	base: {
		fontWeight: '600',
		color,
		selectors: {
			[`${darkTheme} &`]: {
				vars: { [color]: themeVars.color.neutral._100 },
			},
			[`${lightTheme} &`]: {
				vars: { [color]: themeVars.color.neutral._900 },
			},
		},
	},
	variants: {
		fontSize: {
			xs: {
				fontSize: themeVars.fontSize.xs,
				lineHeight: '1.2',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.sm,
					},
				},
			},

			sm: {
				fontSize: themeVars.fontSize.sm,
				lineHeight: '1.5',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.md,
					},
				},
			},

			md: {
				fontSize: themeVars.fontSize.md,
				lineHeight: '1.5',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.lg,
					},
				},
			},

			lg: {
				fontSize: themeVars.fontSize.lg,
				lineHeight: '1.5',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl,
					},
				},
			},

			xl: {
				fontSize: themeVars.fontSize.xl,
				lineHeight: '1.5',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl2,
					},
				},
			},

			xl2: {
				fontSize: themeVars.fontSize.xl2,
				lineHeight: '1.5',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl3,
					},
				},
			},

			xl3: {
				fontSize: themeVars.fontSize.xl3,
				lineHeight: '1.5',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl4,
					},
				},
			},

			xl4: {
				fontSize: themeVars.fontSize.xl4,
				lineHeight: '1.2',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl5,
					},
				},
			},

			xl5: {
				fontSize: themeVars.fontSize.xl5,
				lineHeight: '1.6',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl6,
					},
				},
			},

			xl6: {
				fontSize: themeVars.fontSize.xl6,
				lineHeight: '1.6',
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl7,
					},
				},
			},
		},
		color: ColorVariants(),
	},
	defaultVariants: {
		fontSize: 'md',
	},
});

export type TextVariants = RecipeVariants<typeof textRecipe>;
