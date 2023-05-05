import { darkTheme } from './modes/dark.theme.css';
import { lightTheme } from './modes/ligth.theme.css';
import { themeColorEnum } from './themeColor.enum';

export const themeClass = {
	[themeColorEnum.values.Light]: lightTheme,
	[themeColorEnum.values.Dark]: darkTheme,
	[themeColorEnum.values.System]: 'System',
} as const;
