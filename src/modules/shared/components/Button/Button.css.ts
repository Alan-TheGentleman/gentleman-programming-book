import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import * as sharedCss from '@/src/styles/shared.css';
import { media } from '@/theme/config';
import { darkTheme } from '@/theme/config/modes/dark.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

const vars = {
	bgSolid: createVar(),
	bgSolidHover: createVar(),
	colorSolid: createVar(),

	bgOutline: createVar(),
	bgOutlineHover: createVar(),
	colorOutline: createVar(),
	borderOutline: createVar(),

	bgGhost: createVar(),
	bgGhostHover: createVar(),
	colorGhost: createVar(),

	bgLink: createVar(),
	decorationLink: createVar(),
	colorLink: createVar(),
};

export const buttonRecipe = recipe({
	base: [
		sharedCss.outline,
		{
			borderWidth: 0,
			paddingInline: themeVars.space.space10,
			paddingBlock: themeVars.space.space08,
			borderRadius: themeVars.radii.base,
			transition: 'color 0.2s ease-in-out, background 0.2s ease-in-out',
			fontFamily: themeVars.font.inter,
			fontWeight: '600',
			fontSize: '1rem',
			letterSpacing: '0.05rem',
			textDecoration: 'none',
		},
	],

	variants: {
		colorScheme: {
			primary: {
				vars: {
					[vars.colorSolid]: themeVars.color.neutral.base,
					[vars.bgSolid]: themeVars.color.primary.base,
					[vars.bgSolidHover]: themeVars.color.primary._500,

					[vars.bgOutline]: 'transparent',
					[vars.bgOutlineHover]: themeVars.color.primary._400_30,
					[vars.borderOutline]: `1px solid ${themeVars.color.primary.base}`,
					[vars.colorOutline]: themeVars.color.primary.base,

					[vars.bgGhost]: 'transparent',
					[vars.bgGhostHover]: themeVars.color.primary._400_30,
					[vars.colorGhost]: themeVars.color.primary.base,

					[vars.bgLink]: 'transparent',
					[vars.colorLink]: themeVars.color.primary.base,
					[vars.decorationLink]: 'underline',
				},
			},
			secondary: {
				vars: {
					[vars.colorSolid]: themeVars.color.secondary._50,
					[vars.bgSolid]: themeVars.color.secondary.base,
					[vars.bgSolidHover]: themeVars.color.secondary._800,

					[vars.bgOutline]: 'transparent',
					[vars.bgOutlineHover]: themeVars.color.secondary._200_30,
					[vars.borderOutline]: `1px solid ${themeVars.color.secondary._600}`,
					[vars.colorOutline]: themeVars.color.secondary.base,

					[vars.bgGhost]: 'transparent',
					[vars.bgGhostHover]: themeVars.color.secondary._200_30,
					[vars.colorGhost]: themeVars.color.secondary.base,

					[vars.bgLink]: 'transparent',
					[vars.colorLink]: themeVars.color.secondary.base,
					[vars.decorationLink]: 'underline',
				},
				selectors: {
					[`${darkTheme} &`]: {
						vars: {
							[vars.colorOutline]: themeVars.color.bg1Contrast,
							[vars.colorGhost]: themeVars.color.bg1Contrast,
							[vars.colorLink]: themeVars.color.bg1Contrast,
						},
					},
				},
			},
		},
		variant: {
			solid: {
				color: vars.colorSolid,
				backgroundColor: vars.bgSolid,
				selectors: {
					'&:hover': {
						backgroundColor: vars.bgSolidHover,
					},
				},
			},
			outline: {
				color: vars.colorOutline,
				backgroundColor: vars.bgOutline,
				border: vars.borderOutline,
				selectors: {
					'&:hover': {
						backgroundColor: vars.bgOutlineHover,
					},
				},
			},
			ghost: {
				color: vars.colorGhost,
				backgroundColor: vars.bgGhost,
				selectors: {
					'&:hover': {
						backgroundColor: vars.bgGhostHover,
					},
				},
			},
			link: {
				color: vars.colorLink,
				backgroundColor: vars.bgLink,
				textDecoration: 'none',
				cursor: 'pointer',
				selectors: {
					'&:hover': {
						textDecoration: vars.decorationLink,
					},
				},
			},
			unstyled: {
				color: 'inherit',
				backgroundColor: 'transparent',
				border: 'none',
				padding: 0,
				selectors: {
					'&:hover': {
						backgroundColor: 'transparent',
					},
				},
			},
		},
		size: {
			xs: {
				fontSize: themeVars.fontSize.xs,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.sm,
					},
				},
			},
			sm: {
				fontSize: themeVars.fontSize.sm,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.md,
					},
				},
			},
			md: {
				fontSize: themeVars.fontSize.md,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.lg,
					},
				},
			},
			lg: {
				fontSize: themeVars.fontSize.lg,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl,
					},
				},
			},
			xl: {
				fontSize: themeVars.fontSize.xl,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl2,
					},
				},
			},
		},

		disabled: {
			true: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
	},

	defaultVariants: {
		colorScheme: 'primary',
		variant: 'solid',
		size: 'md',
	},
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
