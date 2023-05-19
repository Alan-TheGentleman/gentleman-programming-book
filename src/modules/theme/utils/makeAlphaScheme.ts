import * as contractUtils from './contractUtils';

type ToStringValues<T> = {
	[K in keyof T]: string;
};

export function addAlphasToScale(scale: ToStringValues<contractUtils.Scale>) {
	const { base, ...tail } = scale;

	const entries = Object.entries(tail).map(([key, value]) => [
		// "_" prefix is needed to avoid use the square bracket notation
		'_' + key,
		value,
	]) as unknown as [string, string][];

	entries.push(['base', base]);

	const scaleWithAlphas = new Map<string, string>(entries);

	for (const [key, value] of Object.entries(scale)) {
		for (const alpha of contractUtils.alphaList) {
			if (key === 'base') {
				scaleWithAlphas.set(key + '_' + alpha, value + alpha);
				continue;
			}
			scaleWithAlphas.set('_' + key + '_' + alpha, value + alpha);
		}
	}

	return Object.fromEntries(
		scaleWithAlphas.entries(),
	) as unknown as ToStringValues<contractUtils.ScaleWithAlphas>;
}
