import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

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
	base: {
		borderWidth: 0,
		paddingInline: themeVars.space.space10,
		paddingBlock: themeVars.space.space08,
		borderRadius: themeVars.radii.base,
		transition: 'color 0.2s ease-in-out, background 0.2s ease-in-out',
		fontFamily: themeVars.font.inter,
		fontWeight: '400',
		fontSize: '1rem',
		letterSpacing: '0.05rem',
	},

	variants: {
		colorScheme: {
			primary: {
				vars: {
					[vars.colorSolid]: themeVars.color.primaryContrast,
					[vars.bgSolid]: themeVars.color.primary,
					[vars.bgSolidHover]: themeVars.color.primaryDark,

					[vars.bgOutline]: 'transparent',
					[vars.bgOutlineHover]: themeVars.color.primaryTransparent,
					[vars.borderOutline]: `1px solid ${themeVars.color.primary}`,
					[vars.colorOutline]: themeVars.color.primary,

					[vars.bgGhost]: 'transparent',
					[vars.bgGhostHover]: themeVars.color.primaryTransparent,
					[vars.colorGhost]: themeVars.color.primary,

					[vars.bgLink]: 'transparent',
					[vars.colorLink]: themeVars.color.primary,
					[vars.decorationLink]: 'underline',
				},
			},
			secondary: {
				vars: {
					[vars.colorSolid]: themeVars.color.secondaryContrast,
					[vars.bgSolid]: themeVars.color.secondary,
					[vars.bgSolidHover]: themeVars.color.secondaryDark,

					[vars.bgOutline]: 'transparent',
					[vars.bgOutlineHover]: themeVars.color.secondaryTransparent,
					[vars.borderOutline]: `1px solid ${themeVars.color.secondaryLight}`,
					[vars.colorOutline]: themeVars.color.secondary,

					[vars.bgGhost]: 'transparent',
					[vars.bgGhostHover]: themeVars.color.secondaryTransparent,
					[vars.colorGhost]: themeVars.color.secondary,

					[vars.bgLink]: 'transparent',
					[vars.colorLink]: themeVars.color.secondary,
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
	},
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
