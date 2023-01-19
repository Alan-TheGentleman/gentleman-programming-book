export function mediaHelper<
	Breakpoints extends Readonly<Record<string, number>>,
	Keys extends Readonly<keyof Breakpoints>,
>(p: Breakpoints) {
	return {
		up: (size: Keys) => {
			return `@media (min-width: ${p[size] + 1}px)` as const;
		},
		down: (size: Keys) => {
			return `@media (max-width: ${p[size]}px)` as const;
		},
		between: <SizeA extends Keys, SizeB extends keyof Omit<Breakpoints, SizeA>>(
			size1: SizeA,
			size2: SizeB,
		) => {
			return `@media (min-width: ${p[size1] + 1}px) and (max-width: ${
				p[size2]
			}px)` as const;
		},
	};
}
