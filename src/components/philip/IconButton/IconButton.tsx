import React from 'react';
import { Color, color, fontSize, media } from 'src/theme';
import styled from 'styled-components';

type IconButtonProps = {
	asIcon?: React.ReactNode;
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
	variant?: 'solid' | 'text';
} & React.ComponentProps<'button'>;

const IconButtonStyled = styled.button.attrs<IconButtonProps>(({ asIcon }) => ({
	children: asIcon,
}))<IconButtonProps>(({ colorScheme = 'primary', variant = 'solid' }) => {
	return {
		color:
			variant === 'text'
				? color[colorScheme].main
				: color[colorScheme].contrast,
		backgroundColor:
			variant === 'text' ? 'transparent' : color[colorScheme].main,

		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all 0.2s ease-in-out',
		border: 'none',
		borderRadius: '100vmax',
		padding: '0.5rem',

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
			filter: 'grayscale(100%) contrast(10%)',
			pointerEvents: 'none',
		},

		[media.up('md')]: { fontSize: fontSize.lg },
	};
});

export { IconButtonStyled as IconButton };
