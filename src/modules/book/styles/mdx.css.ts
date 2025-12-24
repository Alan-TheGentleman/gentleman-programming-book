import { style } from '@vanilla-extract/css';

import { darkTheme } from '@/theme/config/modes/dark.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

export const mdxLi = style({
	listStyle: 'initial',
	marginBlock: '1rem',
	selectors: {
		[`&::marker`]: {
			color: themeVars.color.primary.base,
		},
	},
});

export const mdxImage = style({
	maxWidth: '100%',
	borderRadius: themeVars.radii.base,

	selectors: {
		[`${darkTheme} &`]: {
			backgroundColor: themeVars.color.primary._500_90,
		},
	},
});

export const mdxH1 = style({
	marginBlockStart: themeVars.space.space56,
});

export const mdxH2 = style({
	paddingBlockStart: themeVars.space.space76,
	display: 'flex',
	flexDirection: 'column',
});
export const mdxH2Text = style({
	borderColor: themeVars.color.primary.base_50,
	borderWidth: '1px',
	borderBottomStyle: 'solid',
	borderLeftStyle: 'solid',
	paddingInline: themeVars.space.space08,
	paddingBlock: themeVars.space.space16,
	borderBottomLeftRadius: themeVars.radii.base,
	display: 'inline-grid',
	gap: themeVars.space.space04,
	gridTemplateColumns: 'auto 1fr',
	alignItems: 'center',
});

export const mdxH2Icon = style({
	alignSelf: 'baseline',
});

export const mdxStrong = style({
	fontWeight: '900',
	fontFamily: themeVars.font.merriweather,
	color: themeVars.color.primary.base,
});
