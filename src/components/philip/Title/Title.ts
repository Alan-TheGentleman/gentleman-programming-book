import { color, font, fontSize, media } from 'src/theme';
import styled, { css } from 'styled-components';

const TitleBaseStyles = css({
	fontFamily: font.merriweather,
	color: color.text.primary,
	marginBlock: '0',
	fontWeight: 'bold',
});

export const Title1 = styled.h1(() => [
	TitleBaseStyles,
	{
		fontSize: fontSize.xl8,
		lineHeight: '120%',
		[media.up('md')]: { fontSize: fontSize.xl9 },
	},
]);

export const Title2 = styled.h2(() => [
	TitleBaseStyles,
	{
		fontSize: fontSize.xl5,
		lineHeight: '120%',
		[media.up('md')]: { fontSize: fontSize.xl6 },
	},
]);

export const Title3 = styled.h3(() => [
	TitleBaseStyles,
	{
		fontSize: fontSize.xl3,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl4 },
	},
]);

export const Title4 = styled.h4(() => [
	TitleBaseStyles,
	{
		fontSize: fontSize.xl,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl2 },
	},
]);

export const Title5 = styled.h5(() => [
	TitleBaseStyles,
	{
		fontSize: fontSize.lg,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.xl },
	},
]);

export const Title6 = styled.h6(() => [
	TitleBaseStyles,
	{
		fontSize: fontSize.md,
		lineHeight: '150%',
		[media.up('md')]: { fontSize: fontSize.lg },
	},
]);
