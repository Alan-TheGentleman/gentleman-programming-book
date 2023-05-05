import './font.css';
import './normalize.css';

import { globalStyle } from '@vanilla-extract/css';

import { themeVars } from '@/theme/config/modes/theme.contract.css';

globalStyle('body', {
	fontFamily: `${themeVars.font.inter}, sans-serif`,
	background: themeVars.color.bg1,
	transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
});

globalStyle('html,body,#__next', {
	display: 'flex',
	flexDirection: 'column',
	flex: '1',
	minHeight: '100%',
	maxWidth: '100%',
});
