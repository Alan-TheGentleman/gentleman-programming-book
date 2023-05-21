import { createVar } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import * as sharedCss from '@/src/styles/shared.css';
import { media } from '@/theme/config';
import { lightTheme } from '@/theme/config/modes/ligth.theme.css';
import { sepiaTheme } from '@/theme/config/modes/sepia.theme.css';
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
	colorGhostHover: createVar(),
};

export const IconButtonRecipe = recipe({
	base: [
		sharedCss.outline,
		{
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',

			borderRadius: themeVars.radii.full,
			aspectRatio: '1/1',
			borderWidth: '1px',
			borderStyle: 'solid',
			transition:
				'color 0.2s ease-in-out, background 0.2s ease-in-out, outline 0.2s ease-in-out',

			// fontSize: themeVars.fontSize.xl,
			// '@media': {
			// 	[media.up('md')]: {
			// 		fontSize: themeVars.fontSize.xl2,
			// 	},
			// },
		},
	],
	variants: {
		colorScheme: {
			primary: {
				vars: {
					[vars.colorSolid]: themeVars.color.primary._900,
					[vars.bgSolid]: themeVars.color.primary.base,
					[vars.bgSolidHover]: themeVars.color.primary._600,

					[vars.bgOutline]: 'transparent',
					[vars.bgOutlineHover]: themeVars.color.primary.base_35,
					[vars.borderOutline]: themeVars.color.primary.base,
					[vars.colorOutline]: themeVars.color.primary.base,

					[vars.bgGhost]: 'transparent',
					[vars.bgGhostHover]: themeVars.color.primary.base_35,
					[vars.colorGhost]: themeVars.color.primary.base,
					[vars.colorGhostHover]: themeVars.color.primary._500,
				},
			},
			secondary: {
				vars: {
					[vars.colorSolid]: themeVars.color.secondary._50,
					[vars.bgSolid]: themeVars.color.secondary.base,
					[vars.bgSolidHover]: themeVars.color.secondary._800,

					[vars.bgOutline]: 'transparent',
					[vars.bgOutlineHover]: themeVars.color.secondary.base_80,
					[vars.borderOutline]: themeVars.color.secondary._200,
					[vars.colorOutline]: themeVars.color.secondary._200,

					[vars.bgGhost]: 'transparent',
					[vars.bgGhostHover]: themeVars.color.secondary.base_80,
					[vars.colorGhost]: themeVars.color.secondary._200,
					[vars.colorGhostHover]: themeVars.color.secondary._300,
				},
				selectors: {
					[`${lightTheme} &, ${sepiaTheme} &`]: {
						vars: {
							[vars.borderOutline]: themeVars.color.secondary.base,
							[vars.colorOutline]: themeVars.color.secondary.base,

							[vars.bgGhostHover]: themeVars.color.secondary.base_25,
							[vars.colorGhost]: themeVars.color.secondary.base,
							[vars.colorGhostHover]: themeVars.color.secondary._600,
						},
					},
				},
			},
		},
		variant: {
			solid: {
				border: 'none',
				color: vars.colorSolid,
				backgroundColor: vars.bgSolid,
				':hover': {
					backgroundColor: vars.bgSolidHover,
				},
			},
			outline: {
				borderColor: vars.borderOutline,
				color: vars.colorOutline,
				backgroundColor: vars.bgOutline,
				':hover': {
					backgroundColor: vars.bgOutlineHover,
				},
			},
			ghost: {
				border: 'none',
				color: vars.colorGhost,
				backgroundColor: vars.bgGhost,
				':hover': {
					backgroundColor: vars.bgGhostHover,
					color: vars.colorGhostHover,
				},
			},
			link: {},
			unstyled: {},
		},
		asLink: {
			true: {
				cursor: 'pointer',
			},
		},
		size: {
			xs: {
				fontSize: themeVars.fontSize.sm,
				padding: themeVars.space.space06,

				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.md,
					},
				},
			},
			sm: {
				fontSize: themeVars.fontSize.md,
				padding: themeVars.space.space08,

				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.lg,
					},
				},
			},
			md: {
				fontSize: themeVars.fontSize.lg,
				padding: themeVars.space.space10,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl,
					},
				},
			},
			lg: {
				fontSize: themeVars.fontSize.xl,
				padding: themeVars.space.space10,
				'@media': {
					[media.up('md')]: {
						fontSize: themeVars.fontSize.xl2,
					},
				},
			},
		},
	},
	defaultVariants: {
		colorScheme: 'primary',
		variant: 'solid',
		size: 'md',
	},
});

export type IconButtonVariants = RecipeVariants<typeof IconButtonRecipe>;
