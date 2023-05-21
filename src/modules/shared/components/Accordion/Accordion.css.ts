import { keyframes, style } from '@vanilla-extract/css';

export const slideDown = keyframes({
	from: {
		height: '0',
	},
	to: {
		height: 'var(--radix-accordion-content-height)',
	},
});

const slideUp = keyframes({
	from: {
		height: 'var(--radix-accordion-content-height)',
	},
	to: {
		height: '0',
	},
});

export const accordionContent = style({
	overflow: 'hidden',
	selectors: {
		'&[data-state="open"]': {
			animationName: slideDown,
			animationDuration: '300ms',
			animationTimingFunction: 'ease',
		},

		'&[data-state="closed"]': {
			animationName: slideUp,
			animationDuration: '300ms',
			animationTimingFunction: 'ease',
		},
	},
});
