import { globalFontFace } from '@vanilla-extract/css';

const merriweather = 'merriweather';
const inter = 'inter';

// Merriweather
globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-Black.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '900',
	fontStyle: 'normal',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-BlackItalic.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '900',
	fontStyle: 'italic',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-Bold.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '700',
	fontStyle: 'normal',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-BoldItalic.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '700',
	fontStyle: 'italic',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-Italic.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '400',
	fontStyle: 'italic',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-Regular.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '400',
	fontStyle: 'normal',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-LightItalic.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '300',
	fontStyle: 'italic',
});

globalFontFace(merriweather, {
	src: 'url("/fonts/Merriweather-Light.ttf") format("truetype")',
	fontDisplay: 'block',
	fontWeight: '300',
	fontStyle: 'normal',
});

// Inter
globalFontFace(inter, {
	src: 'url("/fonts/Inter-VariableFont_slnt_wght.woff") format("woff")',
	fontDisplay: 'fallback',
});

export const font = {
	merriweather,
	inter,
};
