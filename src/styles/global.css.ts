import './font.css';
import './normalize.css';

import { createVar, globalStyle } from '@vanilla-extract/css';

import * as sharedCss from '@/src/styles/shared.css';
import { sepiaTheme } from '@/theme/config/modes/sepia.theme.css';
import { themeVars } from '@/theme/config/modes/theme.contract.css';

globalStyle('body', {
	fontFamily: `${themeVars.font.inter}, sans-serif`,
	background: themeVars.color.bg1,
	transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
	animationDuration: '2000ms',
	animationName: sharedCss.fadeInBody,
});

globalStyle(`${sepiaTheme} body`, {
	background: `radial-gradient(ellipse at top, ${themeVars.color.tertiary._100}, ${themeVars.color.tertiary._200}), radial-gradient(ellipse at bottom, ${themeVars.color.tertiary._200},${themeVars.color.tertiary._100})`,
});

export const htmlFontSize = createVar();

globalStyle('html', {
	vars: { [htmlFontSize]: '100%' },
	fontSize: htmlFontSize,
});

globalStyle('a', {
	color: themeVars.color.primary._500,
	textDecoration: 'none',
	transition: 'color 0.1s ease-in-out',
});

globalStyle('::-webkit-scrollbar-track', {
	background: themeVars.color.primary.base_50,
});

globalStyle('::-webkit-scrollbar', { width: '4px', maxHeight: '4px' });

globalStyle('::-webkit-scrollbar-thumb', {
	background: themeVars.color.primary._600,
	borderRadius: '100vh',
});

globalStyle('html,body,#__next', {});

globalStyle('h3,h4', {
	color: themeVars.color.primary.base,
});
