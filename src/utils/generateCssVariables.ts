export function generateCssVariables<
	Pallete extends Record<string, Record<string, string>>,
>(pallete: Pallete): string {
	return Object.entries(pallete).reduce(
		(accum, [key1, colorRole]) =>
			accum +
			Object.entries(colorRole).reduce(
				(accum, [key2, color]) => accum + `--${key1}--${key2}:${color};`,
				'',
			),
		'',
	);
}
