import React from 'react';
import { color, darkTheme, defaultTheme, font, sepiaTheme } from 'src/theme';
import { LocalStorageKeys, LocalStorageService } from 'src/utils';
import { generateCssVariables } from 'src/utils/generateCssVariables';
import styled, { createGlobalStyle } from 'styled-components';

export const themeList = ['Light', 'Dark', 'Sepia'] as const;

const Global = createGlobalStyle({
	'::-webkit-scrollbar': { width: '4px' },
	'::-webkit-scrollbar-thumb': {
		background: color.accent.main,
		borderRadius: '100vh',
	},
	'::-webkit-scrollbar-track': { background: color.primary.transparent },
	'*,html': {
		scrollBehavior: `smooth !important` as 'smooth',
		transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
	},
	'html, body, #__next': {
		height: '100%',
	},
});

const ThemeStyled = styled.div({
	backgroundColor: 'red',
	fontFamily: font.merriweather,
	lineHeight: '1.5',
	color: color.text.primary,
	background: color.background.default,
	maxHeight: '100vh',
	overflow: 'auto',

	[`&[data-theme=${themeList[0]}] `]: {
		'': ';' + generateCssVariables(defaultTheme),
	},
	[`&[data-theme=${themeList[1]}] `]: {
		'': ';' + generateCssVariables(darkTheme),
	},
	[`&[data-theme=${themeList[2]}] `]: {
		'': ';' + generateCssVariables(sepiaTheme),
	},
});

export type Theme = typeof themeList[number];

interface ThemeContextValues {
	currentTheme: Theme;
	changeTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext({} as ThemeContextValues);

export const useThemeContext = () => {
	const context = React.useContext(ThemeContext);

	if (!context) {
		throw new Error(
			'ThemeContext is not available outside of the ThemeContextProvider',
		);
	}
	return context;
};

export const ThemeContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [theme, setTheme] = React.useState<Theme>(themeList[0]);

	const changeTheme = React.useRef((theme: Theme) => {
		setTheme(theme);
		LocalStorageService.save(LocalStorageKeys.theme, theme);
	});

	React.useEffect(() => {
		const themeStoraged = LocalStorageService.find<Theme>(
			LocalStorageKeys.theme,
		);

		if (themeStoraged) {
			changeTheme.current(themeStoraged);
			return;
		}

		const darkQuery = '(prefers-color-scheme: dark)';
		const darkMQL = window.matchMedia(darkQuery);

		if (darkMQL.media === darkQuery && darkMQL.matches) {
			changeTheme.current('Dark');
			return;
		}

		changeTheme.current('Light');
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				currentTheme: theme,
				changeTheme: changeTheme.current,
			}}
		>
			<Global />
			<ThemeStyled data-theme={theme}>{children}</ThemeStyled>
		</ThemeContext.Provider>
	);
};
