import { createVar, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import * as sharedCss from '@/src/styles/shared.css';
import { media } from '@/theme/config';
import { lightTheme } from '@/theme/config/modes/ligth.theme.css';
import { sepiaTheme } from '@/theme/config/modes/sepia.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const buttonIconContainer = style({
	verticalAlign: 'middle',
	fontSize: themeVars.fontSize.xl,

	'@media': {
		[media.up('md')]: {
			fontSize: themeVars.fontSize.xl2,
		},
	},
});

export const iconRight = style({
	marginInlineStart: 'auto',
});

export const containerMinWidth = createVar();

export const SelectContent = style({
	minWidth: containerMinWidth,
});

const vars = {
	bgOutline: createVar(),
	colorOutline: createVar(),
	colorOutlineHover: createVar(),
	borderOutline: createVar(),
};

export const SelectRecipe = recipe({
	base: [
		sharedCss.outline,
		{
			alignItems: 'center',
			borderRadius: themeVars.radii.base,
			columnGap: themeVars.space.space10,
			display: 'inline-flex',
			flexDirection: 'row',
			fontFamily: themeVars.font.inter,
			fontSize: themeVars.fontSize.md,
			paddingBlock: themeVars.space.space05,
			paddingInline: themeVars.space.space12,
			position: 'relative',
			transition: 'all 0.2s ease-in-out',
			whiteSpace: 'nowrap',

			'@media': {
				[media.up('md')]: {
					fontSize: themeVars.fontSize.lg,
				},
			},

			selectors: {
				'&:focus': {
					outlineStyle: 'ridge',
					outlineColor: themeVars.color.outline,
					borderColor: 'transparent',
				},
			},
		},
	],
	variants: {
		colorScheme: {
			primary: {
				vars: {
					[vars.colorOutline]: themeVars.color.neutral._400,
					[vars.colorOutlineHover]: themeVars.color.primary._50,
					[vars.borderOutline]: themeVars.color.primary.base,
				},
				selectors: {
					[`${lightTheme} &, ${sepiaTheme} &`]: {
						vars: {
							[vars.colorOutlineHover]: themeVars.color.neutral._900,
						},
					},
				},
			},
			secondary: {
				vars: {
					[vars.bgOutline]: themeVars.color.secondary._900,
					[vars.colorOutline]: themeVars.color.bg1ContrastLight,
					[vars.colorOutlineHover]: themeVars.color.bg1Contrast,
					[vars.borderOutline]: themeVars.color.secondary.base,
				},
				selectors: {
					[`${lightTheme} &`]: {
						vars: {
							[vars.bgOutline]: themeVars.color.neutral._50,
						},
					},
					[`${sepiaTheme} &`]: {
						vars: {
							[vars.bgOutline]: themeVars.color.tertiary.base,
							[vars.colorOutline]: themeVars.color.neutral._500,
							[vars.colorOutlineHover]: themeVars.color.neutral._700,
						},
					},
				},
			},
		},
		variant: {
			outline: {
				backgroundColor: vars.bgOutline,
				color: vars.colorOutline,
				border: `1px solid ${vars.borderOutline}`,

				selectors: {
					'&:hover': {
						color: vars.colorOutlineHover,
					},
				},
			},
			filled: {},
		},
	},
	defaultVariants: {
		colorScheme: 'primary',
		variant: 'outline',
	},
});

export type SelectVariants = RecipeVariants<typeof SelectRecipe>;

const optionVars = {
	bgOutline: createVar(),
	borderOutline: createVar(),
};

export const OptionListContainerRecipe = recipe({
	base: {
		borderWidth: '1px',
		borderStyle: 'solid',
		fontFamily: themeVars.font.inter,
		fontSize: themeVars.fontSize.md,
		paddingBlock: themeVars.space.space08,
		paddingInline: themeVars.space.space06,
		borderRadius: themeVars.radii.base,
		boxShadow: `0 2px 6px 2px ${themeVars.color.neutral.base_50}`,

		'@media': {
			[media.up('md')]: {
				fontSize: themeVars.fontSize.lg,
			},
		},
	},
	variants: {
		colorScheme: {
			primary: {
				vars: {
					[optionVars.bgOutline]: themeVars.color.neutral._900,
					[optionVars.borderOutline]: themeVars.color.primary.base,
				},

				selectors: {
					[`${lightTheme} &`]: {
						vars: {
							[optionVars.bgOutline]: themeVars.color.bg1,
						},
					},

					[`${sepiaTheme} &`]: {
						vars: {
							[optionVars.bgOutline]: themeVars.color.bg1,
						},
					},
				},
			},
			secondary: {
				vars: {
					[optionVars.bgOutline]: themeVars.color.bg1,
					[optionVars.borderOutline]: themeVars.color.secondary.base,
				},
			},
		},
		variant: {
			outline: {
				backgroundColor: optionVars.bgOutline,
				borderColor: optionVars.borderOutline,
			},
			filled: {},
		},
	},
	defaultVariants: {
		colorScheme: 'secondary',
		variant: 'outline',
	},
});

export type OptionVariants = RecipeVariants<typeof OptionListContainerRecipe>;
