export const LocalStorageKeys = {
	bookmark: 'BOOKMARK_URL',
} as const;

type Keys = typeof LocalStorageKeys[keyof typeof LocalStorageKeys];

export const LocalStorage = {
	save: <Value>(key: Keys, value: Value): void => {
		if (typeof value === 'string') {
			return window.localStorage.setItem(key, value);
		}

		window.localStorage.setItem(key, JSON.stringify(value));
	},

	find: <T>(key: Keys): T | void => {
		const value = window.localStorage.getItem(key);

		if (!value) return;

		return JSON.parse(value) as T;
	},
};
