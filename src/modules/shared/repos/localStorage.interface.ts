import { type LocalStorageKeys } from './myLocalStorage.repository';

export interface LocalStorageRepository {
	save: <Value>(key: LocalStorageKeys, value: Value) => void;
	find: <T extends string>(key: LocalStorageKeys) => T | undefined;
	remove: (key: LocalStorageKeys) => void;
}
