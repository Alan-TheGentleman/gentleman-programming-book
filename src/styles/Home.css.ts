import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/theme/config';
import { sepiaTheme } from '@/theme/config/modes/sepia.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

const spin = keyframes({
	from: {
		transform: 'rotate(0deg)',
	},
	to: {
		transform: 'rotate(360deg)',
	},
});

export const layout = style({
	padding: '1rem',
	maxWidth: themeVars.dimensions.screenXl3,
	marginInline: 'auto',
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: themeVars.space.space16,
	'@media': {
		[media.up('sm')]: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
});

const containerBase = style({
	listStyle: 'none',
	padding: 0,
	margin: 0,
	display: 'flex',
	alignItems: 'center',
	gap: themeVars.space.space10,
	justifyContent: 'space-evenly',
});

export const containerItem = style({
	display: 'contents',
});

export const socialListContainer = style([containerBase, {}]);

export const settingsControlContainer = style([containerBase, {}]);

export const hero = style({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: themeVars.dimensions.xl2,
	marginInline: 'auto',
});

export const heroTitle = style({
	maxWidth: themeVars.dimensions.xl2,
	marginInline: 'auto',
	textAlign: 'center',
});

export const heroQuote = style({
	maxWidth: themeVars.dimensions.xl2,
	marginInline: 'auto',
	textAlign: 'center',
});

export const heroQuoteCite = style({
	whiteSpace: 'nowrap',
});

export const heroQuoteIcon = style({
	color: themeVars.color.primary.base,
});

export const mustachiWrapper = style({
	marginInline: 'auto',
	marginBlock: themeVars.space.space50,
	backgroundColor: themeVars.color.black,
	width: 'min-content',
	height: 'min-content',
	borderRadius: themeVars.radii.full,
	padding: themeVars.space.space10,
	position: 'relative',

	selectors: {
		'&::before,&::after': {
			content: '',
			position: 'absolute',
			zIndex: '-1',
			top: '-5px',
			bottom: '-5px',
			left: '-5px',
			right: '-5px',
			borderRadius: themeVars.radii.full,
			background: `linear-gradient(to right, ${themeVars.color.primary.base}, ${themeVars.color.secondary.base})`,
			animation: `${spin} 10s linear infinite`,
		},
		'&::before': {
			zIndex: '-2',
			filter: 'blur(20px)',
		},
		'&::after': {
			zIndex: '-1',
		},

		[`${sepiaTheme} &::before,${sepiaTheme} &::after`]: {
			background: `linear-gradient(to right, ${themeVars.color.tertiary._600}, ${themeVars.color.primary.base})`,
		},
	},
});

export const heroButton = style({
	marginInlineEnd: 'auto',
	marginBlockStart: themeVars.space.space16,
	borderRadius: themeVars.radii.full,
	paddingInline: themeVars.space.space32,
});

const rotation = keyframes({
	'0%': {
		transform: 'rotateY(-500deg) scale(0)',
	},
	'100%': {
		transform: 'rotateY(0deg) scale(1)',
	},
});

export const mustache = style({
	maxWidth: '12rem',
	aspectRatio: '1/1',
	verticalAlign: 'middle',
	height: 'auto',
	objectFit: 'cover',
	animation: `${rotation} 700ms linear`,
});

export const main = style({
	marginBlock: themeVars.space.space50,
});

export const mainBookIndex = style({
	maxWidth: themeVars.dimensions.xl2,
	width: themeVars.dimensions.full,
	marginInline: 'auto',
});

export const footer = style({
	display: 'flex',
	flexDirection: 'column',
	marginInline: 'auto',
});

export const footerList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: themeVars.space.space32,
	marginInline: 'auto',
	'@media': {
		[media.up('md')]: {
			flexDirection: 'row',
		},
	},
});

export const footerItem = style({
	// maxWidth: themeVars.dimensions.sm,
	display: 'flex',
	gap: themeVars.space.space20,
	alignItems: 'center',
	'@media': {
		[media.up('md')]: {
			maxWidth: themeVars.dimensions.md,
		},
	},
});

export const footerHr = style({
	width: '100%',

	'@media': {
		[media.up('md')]: {
			width: '0',
			margin: 0,
			height: 'auto',
		},
	},
});
