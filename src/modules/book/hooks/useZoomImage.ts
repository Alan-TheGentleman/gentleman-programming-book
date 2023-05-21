import React from 'react';

import { envVariables } from '@/shared/utils';

export function useZoomImage() {
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [altText, setAltText] = React.useState<string | null>(null);

	function cleanImage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		setImageUrl(null);
		setAltText(null);
	}

	React.useEffect(() => {
		function handler(e: MouseEvent) {
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
