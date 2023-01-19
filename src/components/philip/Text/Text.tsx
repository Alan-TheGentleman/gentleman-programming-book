import { color, font, fontSize, media } from 'src/theme';
import styled from 'styled-components';

export const Text = styled.p({
	fontFamily: font.merriweather,
	fontWeight: 400,
	lineHeight: '150%',
	fontSize: fontSize.md,
	color: color.text,

	[media.up('md')]: {
		fontSize: fontSize.lg,
	},
});
