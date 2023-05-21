export const scaleList = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type ScaleList = (typeof scaleList)[number];

export const alphaList = [
	'05',
	'10',
	'15',
	'20',
	'25',
	'30',
	'35',
	'40',
	'45',
	'50',
	'55',
	'60',
	'65',
	'70',
	'75',
	'80',
	'85',
	'90',
	'95',
] as const;

export type AlphaList = (typeof alphaList)[number];

export type Scale<Pre extends string = ''> = Record<
	`${Pre}${ScaleList}`,
	null
> &
	Record<`${'base'}`, null>;

export type ScaleWithAlphas = Scale<'_'> &
	Record<`${'_'}${ScaleList}_${AlphaList}`, null> &
	Record<`${'base'}_${AlphaList}`, null>;

export function createScale() {
	const res = Object.fromEntries(
		scaleList.map(scale => [`_${scale}`, null]),
	) as unknown as Scale<'_'>;

	return Object.assign(res, { base: null });
}

export function createScaleWithAlphas() {
	const scale = createScale();
	const scaleWithAlphas = new Map<string, null>(Object.entries(scale));

	for (const key of Object.keys(scale)) {
		for (let index = 0; index < alphaList.length; index++) {
			const element = alphaList[index];
			scaleWithAlphas.set(key + '_' + element, null);
		}
	}

	return Object.fromEntries(scaleWithAlphas.entries()) as ScaleWithAlphas;
}
