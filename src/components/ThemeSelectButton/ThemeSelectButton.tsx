import React from 'react';
import { Button } from 'src/components/Button';
import { Icon } from 'src/components/Icon';
import { ThemeIcon } from 'src/components/IconSource';
import { media } from 'src/theme';
import styled from 'styled-components';

const ThemeButtonStyled = styled(Button)({
	[media.down('md')]: {
		borderRadius: '100%',
		aspectRatio: '1 / 1',
		alignItems: 'center',

		'& > span': { display: 'none' },
	},

	[`& > ${Icon}`]: { transition: 'all 0.3s ease-in-out' },
	[`&:hover > ${Icon}`]: { transform: 'rotate(20deg)' },
});

type Props2 = {};

export const ThemeSelectButton = React.forwardRef(function ThemeSelectButton<
	T extends 'button',
	Props extends React.ComponentProps<T> & Props2,
>(props: Props, ref: Props['ref']) {
	return (
		<ThemeButtonStyled {...props} ref={ref as any}>
			<Icon>
				<ThemeIcon />
			</Icon>
			<span>Theme</span>
		</ThemeButtonStyled>
	);
});
