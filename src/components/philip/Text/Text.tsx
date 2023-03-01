import { color, font, fontSize, media } from 'src/theme';
import styled from 'styled-components';

const fontVariant = {
	body1: {
		fontSize: fontSize.md,
		fontWeight: 400,
		lineHeight: '200%',
		[media.up('md')]: { fontSize: fontSize.lg },
	},
	caption: {
		fontSize: fontSize.sm,
		fontWeight: 300,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.md },
	},
	subtitle: {
		fontSize: fontSize.xl,
		fontWeight: 700,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl2 },
	},
} as const;

type FontVariant = keyof typeof fontVariant;

export const Text = styled.p<{
	variant?: FontVariant;
}>(({ variant = 'body1' }) => ({
	...fontVariant[variant],
	fontFamily: font.merriweather,
	color: color.text.primary,
}));
