import { Color, color, font, fontSize, media } from 'src/theme';
import styled from 'styled-components';

interface ButtonProps {
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
}

export const Button = styled.button.attrs(({ type, ...props }) => ({
	...props,
	type: type || 'button',
}))<ButtonProps>(({ colorScheme = 'secondary' }) => {
	return {
		color: color[colorScheme].contrast,
		backgroundColor: color[colorScheme].main,

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
			backgroundColor: color[colorScheme].dark,
		},
		'&[disabled]': {
			pointerEvents: 'none',
		},
		[media.up('md')]: { fontSize: fontSize.lg },
	};
});
