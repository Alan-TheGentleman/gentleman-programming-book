import { keyframes, style } from '@vanilla-extract/css';

import { darkTheme } from '@/theme/config/modes/dark.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

const fadeIn = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
});

export const zoomImageConfig = style({
	display: 'fixed',
	inset: 0,
	background: themeVars.color.bg1,
	position: 'fixed',
	width: '100%',
	height: '100%',
	marginBlock: 'auto',
	zIndex: 1,
	animation: `${fadeIn} 0.3s ease-in-out`,
});

export const image = style({
	objectFit: 'contain',
	selectors: {
		[`${darkTheme} &`]: {
			backgroundColor: themeVars.color.primary._500_90,
		},
	},
});
