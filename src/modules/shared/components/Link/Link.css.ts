import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import * as sharedCss from '@/src/styles/shared.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const linkRecipe = recipe({
	base: [sharedCss.outline, {}],
	variants: {
		colorScheme: {
			primary: {
				color: themeVars.color.primary.base,
			},
		},
	},
	defaultVariants: {
		colorScheme: 'primary',
	},
});

export type LinkVariants = RecipeVariants<typeof linkRecipe>;
