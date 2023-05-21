import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@/theme/config/modes/theme.contract.css';

const slideInFromRight = keyframes({
	'0%': {
		transform: 'scaleX(0)',
		opacity: '0',
	},
	'50%': {
		opacity: '1',
	},
	'100%': {
		transform: 'scaleX(100%)',
	},
});

const slideOutToRight = keyframes({
	from: {
		transform: 'scaleX(1)',
		opacity: '1',
	},
	to: {
		transform: 'scaleX(0)',
		opacity: '0',
	},
});

export const sharedMenu = recipe({
	base: {
		position: 'absolute',
		transition: 'all 0.3s ease-in-out',
		right: '0',
		top: '100%',
		backgroundColor: themeVars.color.bg1,
		paddingInline: themeVars.space.space16,
		paddingBlock: themeVars.space.space08,
		borderInline: `1px solid ${themeVars.color.primary.base_50}`,
		borderBottom: `1px solid ${themeVars.color.primary.base_50}`,
		borderBottomLeftRadius: themeVars.radii.md,
		display: 'flex',

		columnGap: themeVars.space.space16,
	},
	variants: {
		open: {
			true: {
				transform: 'scaleX(1)',
				animation: `${slideInFromRight} 0.3s ease-in-out`,
			},
			false: {
				transform: 'scaleX(0)',
				animation: `${slideOutToRight} 0.3s ease-in-out`,
			},
		},
	},
});
