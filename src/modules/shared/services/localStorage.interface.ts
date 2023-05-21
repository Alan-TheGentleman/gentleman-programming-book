import { type LocalStorageKeys } from './myLocalStorage.service';

export interface LocalStorageService {
	save: <Value>(key: LocalStorageKeys, value: Value) => void;
	find: <T extends string>(key: LocalStorageKeys) => T | undefined;
	remove: (key: LocalStorageKeys) => void;
}
