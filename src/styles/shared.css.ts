import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const fadeInBody = keyframes({
	'0%': {
		opacity: 0,
	},
	'7%': {
		opacity: 0,
	},
	'100%': {
		opacity: 1,
	},
});

export const outline = style({
	selectors: {
		'&:focus': {
			outlineColor: themeVars.color.outline,
			outlineStyle: 'ridge',
			outlineWidth: '2px',
			borderColor: 'transparent',
		},
	},
});
