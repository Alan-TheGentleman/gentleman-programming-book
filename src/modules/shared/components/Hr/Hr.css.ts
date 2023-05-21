import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const recipeHr = recipe({
	variants: {
		colorScheme: {
			primary: {
				borderColor: themeVars.color.primary.base,
			},
		},
	},
	defaultVariants: {
		colorScheme: 'primary',
	},
});

export type HrVariants = RecipeVariants<typeof recipeHr>;
