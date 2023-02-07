import React from 'react';
import { Option } from 'src/components/philip/Option';
import { Select } from 'src/components/philip/Select';
import { Text } from 'src/components/philip/Text';
import { Theme, themeList, useThemeContext } from 'src/context/ThemeContext';
import { color, darkTheme, defaultTheme, media, sepiaTheme } from 'src/theme';
import styled from 'styled-components';

const SelectStyled = styled(Select)({
	display: 'grid',
	justifyContent: 'center',
	width: 'max-content',
	alignItems: 'center',
	paddingBlock: '0.5rem',
	gap: '0.5rem',
});

const OptionStyled = styled(Option)({
	paddingInline: '0.5rem',
	width: 'max-content',

	[media.down('md')]: {
		[`& > ${Text}`]: {
			display: 'none',
		},
	},
});

const Circle = styled.span<{ themeColor: Theme }>(({ themeColor }) => ({
	display: 'inline-block',
	marginInlineEnd: '0.2rem',
	backgroundColor:
		themeColor === 'Light'
			? defaultTheme.background.themeChoose
			: themeColor === 'Dark'
			? darkTheme.background.themeChoose
			: sepiaTheme.background.themeChoose,
	width: '1rem',
	filter: 'brightness(0.89)',
	height: '1rem',
	borderRadius: '100%',
	border: `1px solid ${color.accent.main}`,
}));

type Props = {
	trigger: React.ReactElement;
	side?: 'left' | 'right' | 'bottom' | 'top';
	justIcons?: boolean;
};

export const ThemePicker: React.FC<Props> = ({ trigger, side, justIcons }) => {
	const { changeTheme } = useThemeContext();
	return (
		<SelectStyled
			trigger={trigger}
			onChange={e => changeTheme(e as Theme)}
			side={side}
		>
			{themeList.map(theme => (
				<OptionStyled key={theme} value={theme}>
					<Circle themeColor={theme} />{' '}
					{!justIcons && <Text as='span'>{theme}</Text>}
				</OptionStyled>
			))}
		</SelectStyled>
	);
};
