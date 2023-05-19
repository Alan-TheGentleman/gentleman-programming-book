import { setElementVars } from '@vanilla-extract/dynamic';
import React from 'react';

import * as globalCss from '@/src/styles/global.css';

export function useFontSize() {
	const fontSizeRef = React.useRef(100);

	const increaseFontSize = React.useRef(() => {
		fontSizeRef.current += 10;
		setElementVars(document.documentElement, {
			[globalCss.htmlFontSize]: `${fontSizeRef.current}%`,
		});
	});

	const decreaseFontSize = React.useRef(() => {
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
