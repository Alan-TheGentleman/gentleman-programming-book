import Image from 'next/image';

import { useZoomImage } from '@/book/hooks';

import * as ZoomImageConfigCss from './ZoomImageConfig.css';

export const ZoomImageConfig = () => {
	const { imageUrl, altText, cleanImage } = useZoomImage();

	return (
		<>
			{!!imageUrl && (
				<div
					className={ZoomImageConfigCss.zoomImageConfig}
					onClick={cleanImage}
				>
					<Image
						className={ZoomImageConfigCss.image}
						src={imageUrl}
						title={altText || ''}
						alt={altText || ''}
						fill
					/>
				</div>
			)}
		</>
	);
};
