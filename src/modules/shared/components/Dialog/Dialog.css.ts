import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@/theme/config/modes/theme.contract.css';

const overlayShow = keyframes({
	'0%': {
		opacity: 0,
	},
	'100%': {
		opacity: 1,
	},
});

export const overlay = style({
	backgroundColor: themeVars.color.neutral.base_95,
	position: 'fixed',
	inset: 0,

	selectors: {
		'&[data-state="open"]': {
			animationName: overlayShow,
			animationDuration: '0.3s',
		},
	},
});

const contentShow = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateX(-50%, -50%) scale(0.9)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateX(-50%, -50%) scale(1)',
	},
});

export const content = style({
	position: 'fixed',
	top: '50%',
	left: '50%',
	maxHeight: '85vh',
	width: '90vw',
	maxWidth: '450px',
	transform: 'translate(-50%, -50%)',
	borderRadius: '6px',
	backgroundColor: themeVars.color.bg1,
	border: `1px solid ${themeVars.color.neutral._400_90}`,
	padding: '25px',
	boxShadow:
		'0px 10px 38px -10px hsla(206, 22%, 7%, 0.35), 0px 10px 20px -15px hsla(206, 22%, 7%, 0.2)',

	selectors: {
		'&[data-state="open"]': {
			animationName: contentShow,
			animationDuration: '0.3s',
		},
		'&:focus': {
			outline: 'none',
		},
	},
});

export const close = style({
	position: 'absolute',
	top: '10px',
	right: '10px',

	selectors: {
		'&:focus': {
			boxShadow: '0 0 0 2px #fff',
			outline: 'none',
		},
	},
});
