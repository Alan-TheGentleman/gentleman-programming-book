import { keyframes, style } from '@vanilla-extract/css';

import * as sharedCss from '@/src/styles/shared.css';
import { media } from '@/theme/config';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const layout = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(24, minmax(0, 1fr))',
	maxWidth: themeVars.dimensions.screenXl2,
	marginInline: 'auto',

	'@media': {
		[media.up('xl')]: { columnGap: themeVars.space.space24 },
	},
});

export const header = style({
	gridColumn: '1 / span 25',
	gridRow: '1',
	display: 'flex',
	flexDirection: 'column',
	position: 'sticky',
	top: '0',

	'@media': {
		[media.up('xl')]: {
			marginBlockStart: themeVars.space.space48,
			gridColumn: '9 / 25 ',
			gridRow: '1',
		},
	},
});

export const navigation = style({
	backgroundColor: themeVars.color.bg1,
	borderBlockEnd: `1px solid ${themeVars.color.primary.base_50}`,
	boxShadow: `0 0 4px 1px ${themeVars.color.neutral._400_50}`,
	'@media': {
		[media.up('xl')]: {
			border: `1px solid ${themeVars.color.primary.base_50}`,
		},
	},
});

export const settingsControlContainer = style([
	sharedCss.listReset,
	{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
]);

export const containerItem = style({
	display: 'contents',
});

const contentShow = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateX(-50%) scale(0.9)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateX(0) scale(1)',
	},
});

export const dialogIndex = style({
	maxHeight: '70vh',
	overflowY: 'auto',
	paddingBlock: `${themeVars.space.space40} ${themeVars.space.space24}`,
	'@media': {
		[media.up('xl')]: {
			transform: 'translateX(0)',
			paddingInline: themeVars.space.space24,
			maxHeight: `calc(100vh - ${themeVars.space.space40} - ${themeVars.space.space24})`,
			margin: '0',
			left: '0',
			top: '0',
			height: '100%',
			selectors: {
				'&[data-state="open"]': {
					animationName: contentShow,
					animationDuration: '0.3s',
				},
			},
		},
	},
});

export const main = style({
	display: 'flex',
	flexDirection: 'column',
	paddingInline: themeVars.space.space16,
	marginBlock: '2rem',
	gridColumn: '1 / span 25',
	'@media': {
		[media.up('xl')]: {
			paddingInline: themeVars.space.space0,
			gridColumn: '9 / 25 ',
		},
	},
});

export const paginationControls = style({
	display: 'flex',
	gap: '1rem',

	gridColumn: '1 / span 25',
	'@media': {
		[media.up('xl')]: {
			gridColumn: '9 / 25 ',
			marginBlockEnd: '2rem',
		},

		[media.down('xl')]: {
			position: 'sticky',
			bottom: '0',
			gap: '0',
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
	},
});

export const controlButton = style({
	paddingBlock: themeVars.space.space12,
	'@media': {
		[media.down('xl')]: {
			borderRadius: '0',
		},
		[media.up('xl')]: {
			minWidth: themeVars.dimensions.xs,
		},
	},
});

export const aside = style({
	display: 'none',
	position: 'sticky',
	top: '0',
	marginBlockEnd: 'auto',
	maxHeight: `calc(100vh - ${themeVars.space.space48} - ${themeVars.space.space48})`,
	paddingBlock: themeVars.space.space48,
	paddingInlineEnd: themeVars.space.space16,
	overflow: 'auto',

	'@media': {
		[media.up('xl')]: {
			display: 'initial',
			gridColumn: '1 / 9',
			gridRow: '1 / 4',
		},
	},
});
