import { setElementVars } from '@vanilla-extract/dynamic';
import { useRef } from 'react';

import * as globalCss from '@/src/styles/global.css';

export function useFontSize() {
	const fontSizeRef = useRef(100);

	const increaseFontSize = useRef(() => {
		fontSizeRef.current += 10;
		setElementVars(document.documentElement, {
			[globalCss.htmlFontSize]: `${fontSizeRef.current}%`,
		});
	});

	const decreaseFontSize = useRef(() => {
		fontSizeRef.current -= 10;
		setElementVars(document.documentElement, {
			[globalCss.htmlFontSize]: `${fontSizeRef.current}%`,
		});
	});

	return {
		increaseFontSize: increaseFontSize.current,
		decreaseFontSize: decreaseFontSize.current,
	};
}
