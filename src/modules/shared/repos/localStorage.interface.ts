import { type CookieKeys } from './myLocalStorage.repository';

export interface LocalStorageRepository {
	save: <Value>(key: CookieKeys, value: Value) => void;
	find: <T extends string>(key: CookieKeys) => T | undefined;
	remove: (key: CookieKeys) => void;
}
