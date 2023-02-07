import { Color, color, fontSize, media } from 'src/theme';
import styled from 'styled-components';

const iconSize = {
	xs: { mobile: fontSize.md, desktop: fontSize.lg },
	sm: { mobile: fontSize.lg, desktop: fontSize.xl },
	md: { mobile: fontSize.xl, desktop: fontSize.xl2 },
	xl: { mobile: fontSize.xl2, desktop: fontSize.xl3 },
	xl2: { mobile: fontSize.xl3, desktop: fontSize.xl4 },
	xl3: { mobile: fontSize.xl4, desktop: fontSize.xl5 },
} as const;

type IconSize = keyof typeof iconSize;

export const Icon = styled.i<{
	size?: IconSize;
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
}>(({ size = 'md', colorScheme }) => ({
	color: colorScheme ? color[colorScheme].main : '',
	display: 'inline-flex',
	verticalAlign: 'middle',
	fontSize: iconSize[size].mobile,
	[media.up('md')]: {
		fontSize: iconSize[size].desktop,
	},
}));
