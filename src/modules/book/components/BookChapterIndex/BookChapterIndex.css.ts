import { style } from '@vanilla-extract/css';

import { headindgRecipe } from '@/shared/components/Heading/Heading.css';
import * as sharedCss from '@/src/styles/shared.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const accordion = style({
	display: 'flex',
	flexDirection: 'column',
	rowGap: themeVars.space.space48,
});

export const accordionItem = style({
	borderInlineStart: `1px solid ${themeVars.color.primary.base_50}`,
	borderStartStartRadius: themeVars.radii.base,
});

export const accordionButton = style([
	sharedCss.outline,
	{
		width: '100%',
	},
]);

export const accordionButtonText = style({
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'left',

	backgroundColor: themeVars.color.primary.base_10,
	paddingBlock: themeVars.space.space08,
	paddingInlineStart: themeVars.space.space16,
	border: `1px solid transparent`,
	borderEndEndRadius: themeVars.radii.base,
	borderStartEndRadius: themeVars.radii.base,
	borderStartStartRadius: themeVars.radii.base,
	selectors: {
		[`${accordionItem}[data-state=open] &`]: {
			borderColor: themeVars.color.primary.base_50,
			borderInlineStart: 'none',
		},
	},
});

export const accordionButtonIcon = style({
	marginInlineStart: themeVars.space.space16,
	transition: 'transform 0.3s ease-in-out',
	selectors: {
		[`${accordionItem}[data-state=open] &`]: {
			transform: 'rotate(-180deg)',
		},
	},
});

export const accordionButtonTextSub = style({
	selectors: {
		[`${headindgRecipe()} &`]: {
			marginBlockEnd: themeVars.space.space16,
		},
	},
});

export const accordionButtonTitle = style([
	sharedCss.outline,
	{
		width: 'fit-content',
	},
]);

export const accordionItemPanel = style({
	display: 'flex',
	flexDirection: 'column',
	marginBlock: themeVars.space.space08,
	paddingInlineStart: themeVars.space.space16,
	rowGap: themeVars.space.space16,
});

export const accordionPanelItem = style({
	display: 'flex',
	columnGap: themeVars.space.space08,
});

export const accordionPanelItemText = style([
	sharedCss.outline,
	{
		marginInlineEnd: themeVars.space.space16,
		textDecoration: 'none',
		transition: 'all 0.2s ease-in-out',
		letterSpacing: '0.045rem',
		selectors: {
			'&:hover,&:focus': {
				textDecoration: 'underline',
				color: themeVars.color.primary.base,
			},
		},
	},
]);
