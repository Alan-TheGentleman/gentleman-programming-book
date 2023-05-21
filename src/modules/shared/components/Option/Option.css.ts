import { createVar, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { media } from '@/theme/config';
import { lightTheme } from '@/theme/config/modes/ligth.theme.css';
import { sepiaTheme } from '@/theme/config/modes/sepia.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const checkIcon = style({
	position: 'absolute',
	left: 0,
	width: '25px',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const vars = {
	bgOutlineHighlighted: createVar(),
	colorOutline: createVar(),
	colorOutlineHighlighted: createVar(),
	// borderOutline: createVar(),
};

export const checkItemRecipe = recipe({
	base: {
		textAlign: 'left',
		fontSize: themeVars.fontSize.sm,
		lineHeight: 'none',
		borderRadius: '3px',
		display: 'flex',
		alignItems: 'center',
		height: '25px',
		paddingBlock: themeVars.space.space04,
		paddingInlineStart: themeVars.space.space30,
		paddingInlineEnd: themeVars.space.space08,
		position: 'relative',
		userSelect: 'none',
		outline: 'none',

		'@media': {
			[media.up('md')]: {
				fontSize: themeVars.fontSize.md,
			},
		},

		selectors: {
			'&[data-disabled]': {
				pointerEvents: 'none',
			},
		},
	},
	variants: {
		colorScheme: {
			primary: {
				vars: {
					[vars.colorOutline]: themeVars.color.neutral._100,
					[vars.colorOutlineHighlighted]: themeVars.color.primary.base,
					[vars.bgOutlineHighlighted]: themeVars.color.primary.base_30,
				},
				selectors: {
					[`${lightTheme} &`]: {
						vars: {
							[vars.colorOutline]: themeVars.color.neutral.base,
						},
					},
					[`${sepiaTheme} &`]: {
						vars: {
							[vars.colorOutline]: themeVars.color.tertiary._700,
						},
					},
				},
			},

			secondary: {
				vars: {
					[vars.colorOutline]: themeVars.color.secondary._300,
					[vars.colorOutlineHighlighted]: themeVars.color.secondary._50,
					[vars.bgOutlineHighlighted]: themeVars.color.secondary.base_60,
				},

				selectors: {
					[`${lightTheme} &`]: {
						vars: {
							[vars.colorOutline]: themeVars.color.secondary._800,
							[vars.bgOutlineHighlighted]: themeVars.color.secondary.base_90,
						},
					},
					[`${sepiaTheme} &`]: {
						vars: {
							[vars.colorOutline]: themeVars.color.tertiary._700,
						},
					},
				},
			},
		},

		variant: {
			outline: {
				color: vars.colorOutline,
				selectors: {
					'&[data-highlighted]': {
						// outlineColor: 'red',
						// outlineStyle: 'ridge',
						color: vars.colorOutlineHighlighted,
						backgroundColor: vars.bgOutlineHighlighted,
					},
				},
			},
		},
	},

	defaultVariants: {
		colorScheme: 'primary',
		variant: 'outline',
	},
});

export type CheckItemVariants = RecipeVariants<typeof checkItemRecipe>;
