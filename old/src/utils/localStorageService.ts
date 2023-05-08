export const LocalStorageKeys = {
	bookmark: 'BOOKMARK_URL',
	theme: 'THEME',
} as const;

type Keys = typeof LocalStorageKeys[keyof typeof LocalStorageKeys];

export const LocalStorageService = {
	save: <Value>(key: Keys, value: Value): void => {
		window.localStorage.setItem(key, JSON.stringify(value));
	},

	find: <T>(key: Keys): T | void => {
		const value = window.localStorage.getItem(key);

		if (!value) return;

		return JSON.parse(value) as T;
	},
};