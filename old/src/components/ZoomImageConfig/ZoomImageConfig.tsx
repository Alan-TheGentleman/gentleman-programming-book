import Image from 'next/image';
import { useZoomImage } from 'src/hooks';
import { color } from 'src/theme';

type Props = {};

export const ZoomImageConfig = (props: Props) => {
	const { imageUrl, altText, cleanImage } = useZoomImage();

	return (
		<>
			{!!imageUrl && (
				<div
					style={{
						display: 'fixed',
						inset: 0,
						background: color.background.default,
						position: 'fixed',
						width: '100%',
						height: '100%',
						marginBlock: 'auto',
						zIndex: 1,
					}}
					onClick={cleanImage}
				>
					<Image
						style={{ objectFit: 'contain' }}
						src={imageUrl}
						fill
						alt={altText || ''}
					/>
				</div>
			)}
		</>
	);
};
