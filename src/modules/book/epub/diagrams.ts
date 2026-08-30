import { createHash } from 'crypto';
import { BrowserContext } from 'playwright';

import { MediaAsset } from './assets';

const BOX_DRAWING = /[\u2500-\u257F\u2580-\u259F]/;
const MINIMUM_FRAMED_LINES = 2;
const FONT_SIZE = 26;
const LINE_HEIGHT = 1;
const PADDING = 28;
const MONOSPACE_STACK =
	"'Menlo', 'DejaVu Sans Mono', 'Liberation Mono', 'Consolas', monospace";

export function isDiagram(text: string): boolean {
	const framed = text.split('\n').filter(line => BOX_DRAWING.test(line)).length;

	return framed >= MINIMUM_FRAMED_LINES;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

export class DiagramRenderer {
	private readonly rendered = new Map<string, MediaAsset>();

	constructor(private readonly context: BrowserContext) {}

	async render(text: string): Promise<MediaAsset> {
		const key = createHash('sha1').update(text).digest('hex').slice(0, 12);
		const cached = this.rendered.get(key);
		if (cached) return cached;

		const lines = text.replace(/\n+$/, '').split('\n');
		const columns = Math.max(...lines.map(line => [...line].length), 1);

		const page = await this.context.newPage();
		try {
			await page.setContent(
				`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
			* { margin: 0; padding: 0; box-sizing: border-box; }
			body { background: #ffffff; display: inline-block; }
			pre {
				display: inline-block;
				font-family: ${MONOSPACE_STACK};
				font-size: ${FONT_SIZE}px;
				line-height: ${LINE_HEIGHT};
				color: #101010;
				background: #ffffff;
				padding: ${PADDING}px;
				white-space: pre;
				font-variant-ligatures: none;
			}
		</style>
	</head>
	<body><pre id="diagram">${escapeHtml(lines.join('\n'))}</pre></body>
</html>`,
				{ waitUntil: 'load' },
			);

			const element = await page.$('#diagram');
			if (!element) throw new Error('diagram element missing');

			const data = await element.screenshot({ type: 'png' });
			const asset: MediaAsset = {
				fileName: `diagram-${key}.png`,
				mediaType: 'image/png',
				data,
			};
			this.rendered.set(key, asset);

			return asset;
		} finally {
			await page.close();
		}
	}

	list(): MediaAsset[] {
		return [...this.rendered.values()];
	}
}
