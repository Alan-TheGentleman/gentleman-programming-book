import React from 'react';
import { Icon } from 'src/components/philip/Icon/Icon';
import { color } from 'src/theme';
import styled from 'styled-components';

type IconButtonProps = {
	asIcon?: React.ReactNode;
	colorScheme?: 'primary' | 'secondary';
	variant?: 'solid' | 'text';
} & React.ComponentProps<'button'>;

const _IconButton: React.FC<IconButtonProps> = ({
	asIcon,
	colorScheme,
	...props
}) => {
	return (
		<button {...props}>
			<Icon>{asIcon}</Icon>
		</button>
	);
};

// type IconButtonStyledProps = {
// 	colorScheme?: 'primary' | 'secondary';
// 	variant?: 'solid' | 'text';
// };

const IconButtonStyled = styled(_IconButton)(
	({ colorScheme = 'primary', variant = 'solid' }) => {
		const backgroundColor =
			variant === 'solid' && colorScheme === 'primary'
				? color.buttonPrimary
				: variant === 'solid' && colorScheme === 'secondary'
				? color.buttonSecondary
				: variant === 'text'
				? 'transparent'
				: 'transparent';

		const textColor =
			variant === 'solid'
				? color.textButtonSolid
				: variant === 'text' && colorScheme === 'primary'
				? color.buttonPrimary
				: variant === 'text' && colorScheme === 'secondary'
				? color.buttonSecondary
				: color.buttonPrimary;

		return {
			border: 'none',
			borderRadius: '100vmax',
			padding: '0.5rem',
			color: textColor,
			backgroundColor,

			'&:hover': { filter: 'brightness(0.9)' },
		};
	},
);

export { IconButtonStyled as IconButton };
