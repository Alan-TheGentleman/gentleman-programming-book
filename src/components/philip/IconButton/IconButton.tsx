import React from 'react';
import { Color, color, fontSize, media } from 'src/theme';
import styled from 'styled-components';

const sizes = {
	xs: { mobile: fontSize.xxs, desktop: fontSize.xs },
	base: { mobile: fontSize.md, desktop: fontSize.lg },
} as const;

type Size = keyof typeof sizes;

type IconButtonProps = {
	asIcon?: React.ReactNode;
	size?: Size;
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
	variant?: 'solid' | 'text';
} & React.ComponentProps<'button'>;

export const IconButton = styled.button.attrs<IconButtonProps>(
	({ asIcon }) => ({
		children: asIcon,
	}),
)<IconButtonProps>(
	({ colorScheme = 'primary', variant = 'solid', size = 'base' }) => {
		return {
			color:
				variant === 'text'
					? color[colorScheme].main
					: color[colorScheme].contrast,
			backgroundColor:
				variant === 'text' ? 'transparent' : color[colorScheme].main,
			fontSize: sizes[size].mobile,
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

			[media.up('md')]: { fontSize: sizes[size].desktop },
		};
	},
);
