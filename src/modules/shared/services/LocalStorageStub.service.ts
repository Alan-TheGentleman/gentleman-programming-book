import { LocalStorageService } from './localStorage.interface';
import { LocalStorageKeys } from './myLocalStorage.service';

export function LocalStorageStubService(): LocalStorageService {
	const storage: Record<string, string> = {};
	return {
		save: (key, value) => {
			storage[key] = typeof value === 'string' ? value : JSON.stringify(value);
		},
		find: <T extends string>(key: LocalStorageKeys): T | undefined => {
			const value = storage[key];
			return value as T;
		},
		remove: key => {
			delete storage[key];
		},
	};
}
