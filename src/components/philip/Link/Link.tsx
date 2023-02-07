import { Color, color } from 'src/theme';
import styled from 'styled-components';

export const Link = styled.a<{
	colorScheme?: Extract<Color, 'primary' | 'secondary'>;
}>(({ colorScheme }) => ({
	color: colorScheme ? color[colorScheme].main : '',
	fontWeight: '400',
}));
