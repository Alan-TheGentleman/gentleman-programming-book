import { readFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const RASTER_WIDTH = 1400;
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const MEDIA_TYPES: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
};

export interface MediaAsset {
	fileName: string;
	mediaType: string;
	data: Buffer;
}

export class MediaLibrary {
	private readonly assets = new Map<string, MediaAsset>();

	async resolve(sourceUrl: string): Promise<MediaAsset | null> {
		const cached = this.assets.get(sourceUrl);
		if (cached) return cached;

		if (!sourceUrl.startsWith('/')) return null;

		const absolute = path.join(PUBLIC_DIR, sourceUrl.replace(/^\//, ''));
		const extension = path.extname(absolute).toLowerCase();
		const flatName = sourceUrl.replace(/^\//, '').replace(/[/\\]/g, '_');

		try {
			if (extension === '.svg') {
				const data = await sharp(await readFile(absolute), { density: 200 })
					.resize({ width: RASTER_WIDTH, withoutEnlargement: false })
					.flatten({ background: '#ffffff' })
					.png()
					.toBuffer();
				const asset: MediaAsset = {
					fileName: flatName.replace(/\.svg$/i, '.png'),
					mediaType: 'image/png',
					data,
				};
				this.assets.set(sourceUrl, asset);

				return asset;
			}

			const mediaType = MEDIA_TYPES[extension];
			if (!mediaType) return null;

			const asset: MediaAsset = {
				fileName: flatName,
				mediaType,
				data: await readFile(absolute),
			};
			this.assets.set(sourceUrl, asset);

			return asset;
		} catch {
			return null;
		}
	}

	list(): MediaAsset[] {
		return [...this.assets.values()];
	}
}
