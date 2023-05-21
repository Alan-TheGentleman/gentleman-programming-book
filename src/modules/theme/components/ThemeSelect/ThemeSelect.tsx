import React from 'react';
import { FaCircle } from 'react-icons/fa';

import { ThemeIcon } from '@/shared/components';
import { Option } from '@/shared/components/Option';
import { Select } from '@/shared/components/Select';
import { useThemeStore } from '@/shared/store';
import { ThemeColor, themeColorEnum } from '@/theme/config';

import * as ThemeSelectCss from './ThemeSelect.css';

const themeColorss = [
	{
		icon: (
			<FaCircle
				className={ThemeSelectCss.circleRecipe({ colorScheme: 'Light' })}
			/>
		),
		key: themeColorEnum.values.Light,
	},
	{
		icon: (
			<FaCircle
				className={ThemeSelectCss.circleRecipe({ colorScheme: 'Dark' })}
			/>
		),
		key: themeColorEnum.values.Dark,
	},
	{
		icon: (
			<FaCircle
				className={ThemeSelectCss.circleRecipe({ colorScheme: 'Sepia' })}
			/>
		),
		key: themeColorEnum.values.Sepia,
	},
];

export const ThemeSelect: React.FC = () => {
	const themeColor = useThemeStore(s => s.themeColorCurrent);
	const changeThemeColor = useThemeStore(s => s.changeThemeColor);

	return (
		<Select
			title='theme-select'
			value={themeColor}
			leftIcon={<ThemeIcon />}
			className={ThemeSelectCss.select}
			iconLeftContainerClassName={ThemeSelectCss.iconLeftContainer}
			buttonTextClassName={ThemeSelectCss.buttonText}
			onChange={e => {
				const value = e as ThemeColor;
				// console.log(value);
				// MyLocalStorageRepo().save(localStorageKeys.themeColor, value);
				// document.documentElement.classList.value = themeClass[value];

				changeThemeColor(value);
			}}
		>
			{themeColorss.map(theme => (
				<Option key={theme.key} value={theme.key}>
					{theme.icon} <span className={ThemeSelectCss.text}>{theme.key}</span>
				</Option>
			))}
		</Select>
	);
};
