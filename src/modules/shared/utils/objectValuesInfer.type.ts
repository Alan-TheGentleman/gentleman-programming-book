export type ObjectValuesInfer<T> = T extends Record<infer _, infer V>
	? V
	: never;
