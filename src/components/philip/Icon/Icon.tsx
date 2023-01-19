import { fontSize, media } from 'src/theme';
import styled from 'styled-components';

export const Icon = styled.i({
	display: 'inline-flex',
	verticalAlign: 'middle',
	fontSize: fontSize.xl,
	[media.up('md')]: {
		fontSize: fontSize.xl2,
	},
});
