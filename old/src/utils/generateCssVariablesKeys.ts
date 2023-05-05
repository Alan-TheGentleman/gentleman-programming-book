export function generateCssVariablesKeys<
	Pallete extends Readonly<Record<string, Readonly<Record<string, string>>>>,
>(pallete: Pallete): Pallete {
	const entries = Object.entries(pallete).map(([key1, colorRole]) => [
		key1,
		Object.fromEntries(
			Object.entries(colorRole).map(([key2]) => [
				key2,
				`var(--${key1}--${key2})`,
			]),
		),
	]);

	return Object.fromEntries(entries);
}
