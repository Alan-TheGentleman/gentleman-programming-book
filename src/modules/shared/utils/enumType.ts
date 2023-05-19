export function EnumType<T extends Readonly<string[]>>(...args: T) {
	return {
		iterable: args,
		values: args.reduce((a, b) => ({ ...a, [b]: b }), {}) as {
			[key in T[number]]: key;
		},
	} as const;
}

export type EnumTypeInfer<T> = T extends { iterable: infer U }
	? U extends Readonly<Array<infer V>>
		? V
		: never
	: never;
