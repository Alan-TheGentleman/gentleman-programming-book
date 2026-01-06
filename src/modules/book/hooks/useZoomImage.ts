import { MouseEvent, useEffect, useState } from 'react';

import { envVariables } from '@/shared/utils';

export function useZoomImage() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [altText, setAltText] = useState<string | null>(null);

	function cleanImage(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		setImageUrl(null);
		setAltText(null);
	}

	useEffect(() => {
		function handler(e: globalThis.MouseEvent) {
			if (e.target && 'tagName' in e?.target && e.target.tagName === 'IMG') {
				const currentTarget = e.target as HTMLImageElement;
				const cur = currentTarget.currentSrc.slice(envVariables.WEB_URL.length);

				setImageUrl(cur);
				setAltText(currentTarget.alt);
			}
		}

		document.addEventListener('click', handler);
		return () => {
			document.removeEventListener('click', handler);
		};
	}, [imageUrl]);

	return { altText, imageUrl, cleanImage };
}
