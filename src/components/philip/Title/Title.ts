import { Color, color, font, fontSize, media } from 'src/theme';
import styled, { css } from 'styled-components';

interface ColorScheme {
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
}

const TitleBaseStyles = css(() => ({
	fontFamily: font.merriweather,
	marginBlock: '0',
	fontWeight: 'bold',
}));

export const Title1 = styled.h1<ColorScheme>(({ colorScheme }) => [
	TitleBaseStyles,
	{
		color: colorScheme ? color[colorScheme].main : color.text.primary,
		fontSize: fontSize.xl8,
		lineHeight: '120%',
		[media.up('md')]: { fontSize: fontSize.xl9 },
	},
]);

export const Title2 = styled.h2<ColorScheme>(({ colorScheme }) => [
	TitleBaseStyles,
	{
		color: colorScheme ? color[colorScheme].main : color.text.primary,
		fontSize: fontSize.xl5,
		lineHeight: '120%',
		[media.up('md')]: { fontSize: fontSize.xl6 },
	},
]);

export const Title3 = styled.h3<ColorScheme>(({ colorScheme }) => [
	TitleBaseStyles,
	{
		color: colorScheme ? color[colorScheme].main : color.text.primary,
		fontSize: fontSize.xl3,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl4 },
	},
]);

export const Title4 = styled.h4<ColorScheme>(({ colorScheme }) => [
	TitleBaseStyles,
	{
		color: colorScheme ? color[colorScheme].main : color.text.primary,
		fontSize: fontSize.xl,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl2 },
	},
]);

export const Title5 = styled.h5<ColorScheme>(({ colorScheme }) => [
	TitleBaseStyles,
	{
		color: colorScheme ? color[colorScheme].main : color.text.primary,
		fontSize: fontSize.lg,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl },
	},
]);

export const Title6 = styled.h6<ColorScheme>(({ colorScheme }) => [
	TitleBaseStyles,
	{
		color: colorScheme ? color[colorScheme].main : color.text.primary,
		// color: 'red',
		fontSize: fontSize.md,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.lg },
	},
]);
