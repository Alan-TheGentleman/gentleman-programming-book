import { color, font, fontSize, media } from 'src/theme';
import styled from 'styled-components';

interface ButtonProps {
	colorScheme?: 'primary';
}

export const Button = styled.button<ButtonProps>(
	({ colorScheme = 'primary' }) => {
		const backgroundColor =
			colorScheme === 'primary'
				? color.buttonPrimary
				: colorScheme === 'primary'
				? color.buttonSecondary
				: color.buttonPrimary;

		return {
			border: 'none',
			fontSize: fontSize.md,
			fontFamily: font.merriweather,
			paddingInline: '1.2rem',
			paddingBlock: '0.5rem',
			color: color.textButtonSolid,
			backgroundColor,
			borderRadius: '0.2rem',
			'&:hover': { filter: 'brightness(0.9)' },
			[media.up('md')]: { fontSize: fontSize.lg },
		};
	},
);

Button.defaultProps = { type: 'button' };
