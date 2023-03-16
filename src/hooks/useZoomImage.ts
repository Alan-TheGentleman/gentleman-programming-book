import React from 'react';
import { constants } from 'src/utils';

export function useZoomImage() {
	const [state, setState] = React.useState<'idle' | 'open' | 'close'>('idle');
	const contentRef = React.useRef<Element | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [altText, setAltText] = React.useState<string | null>(null);

	function cleanImage() {
		setImageUrl(null);
		setAltText(null);
		setState('close');
	}

	React.useEffect(() => {
		if (state === 'open') return;

		function handler(e: MouseEvent) {
			e.preventDefault();
			e.stopPropagation();
			const currentTarget = e.currentTarget as HTMLImageElement;
			const cur = currentTarget.currentSrc.slice(constants.URL.length);
			setImageUrl(cur);
			setAltText(currentTarget.alt);
			setState('open');
		}

		const imageList = document.querySelectorAll('img');
		imageList.forEach(img => img.addEventListener('click', handler));

		return () => {
			imageList.forEach(img => img.removeEventListener('click', handler));
		};
	}, [contentRef, state]);

	return { altText, imageUrl, cleanImage };
}
