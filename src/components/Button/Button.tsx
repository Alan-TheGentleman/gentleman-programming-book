import { Color, color, font, fontSize, media } from 'src/theme';
import styled from 'styled-components';

interface ButtonProps {
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
	variant?: 'solid' | 'text';
}

export const Button = styled.button.attrs(({ type, ...props }) => ({
	...props,
	type: type || 'button',
}))<ButtonProps>(({ colorScheme = 'primary', variant = 'solid' }) => {
	return {
		color:
			variant === 'text'
				? color[colorScheme].main
				: color[colorScheme].contrast,
		backgroundColor:
			variant === 'text' ? 'transparent' : color[colorScheme].main,
		alignItems: 'center',
		justifyContent: 'center',
		border: 'none',
		borderRadius: '0.2rem',
		columnGap: '0.5rem',
		display: 'inline-flex',
		fontFamily: font.merriweather,
		fontSize: fontSize.md,
		paddingBlock: '0.5rem',
		paddingInline: '0.8rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover, &:focus': {
			color:
				variant === 'text'
					? color[colorScheme].dark
					: color[colorScheme].contrast,
			backgroundColor:
				variant === 'text'
					? color[colorScheme].transparent
					: color[colorScheme].dark,
		},
		'&[disabled]': {
			filter: 'grayscale(60%) contrast(80%)',
			pointerEvents: 'none',
		},
		[media.up('md')]: { fontSize: fontSize.lg },
	};
});
