import { themeVars } from '@/theme/config/modes/theme.contract.css';

export function ColorVariants() {
	type Colors = keyof typeof themeVars.color;
	const colorMap = new Map<Colors, { color: string }>();
	const colorKeys = Object.keys(themeVars.color);

	for (const key of colorKeys) {
		const color = themeVars.color[key as Colors];

		if (typeof color === 'string') {
			colorMap.set(key as Colors, { color });
		} else {
			colorMap.set(key as Colors, { color: color.base });
		}
	}

	return Object.fromEntries(colorMap) as Record<Colors, { color: string }>;
}
