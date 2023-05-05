import { type ObjectValuesInfer } from '@/shared/utils/objectValuesInfer.type';

import { type LocalStorageRepository } from './localStorage.interface';

export const localStorageKeys = {
	themeColor: '[THEME]_COLOR_STORAGED',
} as const;

export type CookieKeys = ObjectValuesInfer<typeof localStorageKeys>;

export function MyLocalStorageRepo(): LocalStorageRepository {
	return {
		save: <Value>(key: CookieKeys, value: Value): void => {
			const _value: string =
				typeof value !== 'string' ? JSON.stringify(value) : value;

			window.localStorage.setItem(key, _value);
		},

		find: <T extends string>(key: CookieKeys): T | undefined => {
			const value = window.localStorage.getItem(key);

			return value as T;
		},

		remove: key => {
			window.localStorage.remove(key);
		},
	};
}
