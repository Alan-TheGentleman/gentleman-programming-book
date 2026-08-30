import { readFile } from 'fs/promises';
import path from 'path';
import { BrowserContext } from 'playwright';

const COVER_WIDTH = 1600;
const COVER_HEIGHT = 2560;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const FONTS_DIR = path.join(PUBLIC_DIR, 'fonts');

async function embeddedFont(fileName: string) {
	const data = await readFile(path.join(FONTS_DIR, fileName));

	return `data:font/ttf;base64,${data.toString('base64')}`;
}

async function embeddedLogo() {
	const data = await readFile(path.join(PUBLIC_DIR, 'img', 'mustache.png'));

	return `data:image/png;base64,${data.toString('base64')}`;
}

export async function renderCover(
	context: BrowserContext,
	title: string,
	subtitle: string,
	author: string,
): Promise<Buffer> {
	const [bold, light, regular, logo] = await Promise.all([
		embeddedFont('Merriweather-Bold.ttf'),
		embeddedFont('Merriweather-Light.ttf'),
		embeddedFont('Merriweather-Regular.ttf'),
		embeddedLogo(),
	]);

	const html = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
			@font-face { font-family: 'BookSerif'; font-weight: 700; src: url('${bold}'); }
			@font-face { font-family: 'BookSerif'; font-weight: 300; src: url('${light}'); }
			@font-face { font-family: 'BookSerif'; font-weight: 400; src: url('${regular}'); }
			* { margin: 0; padding: 0; box-sizing: border-box; }
			body {
				width: ${COVER_WIDTH}px;
				height: ${COVER_HEIGHT}px;
				background: linear-gradient(180deg, #180209 0%, #090005 55%, #14040f 100%);
				font-family: 'BookSerif', Georgia, serif;
				color: #fffcfe;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
			.frame {
				position: absolute;
				inset: 70px;
				border: 3px solid rgba(255, 165, 75, 0.32);
			}
			.logo { width: 620px; margin-bottom: 70px; }
			.rule {
				width: 320px;
				height: 5px;
				background: linear-gradient(90deg, #c71f7a 0%, #ffa54b 100%);
			}
			.title { font-weight: 700; font-size: 152px; line-height: 1.18; margin: 78px 0 0; }
			.subtitle { font-weight: 300; font-size: 58px; color: #ffa54b; margin: 60px 0 0; }
			.author { font-weight: 400; font-size: 64px; margin-top: 56px; }
			.footer { position: absolute; bottom: 240px; display: flex; flex-direction: column; align-items: center; }
		</style>
	</head>
	<body>
		<div class="frame"></div>
		<img class="logo" src="${logo}" alt="" />
		<div class="rule"></div>
		<h1 class="title">${title}</h1>
		<p class="subtitle">${subtitle}</p>
		<div class="footer">
			<div class="rule" style="opacity: 0.75; height: 4px"></div>
			<p class="author">${author}</p>
		</div>
	</body>
</html>`;

	const page = await context.newPage();
	try {
		await page.setViewportSize({ width: COVER_WIDTH, height: COVER_HEIGHT });
		await page.setContent(html, { waitUntil: 'load' });
		await page.evaluate(() => document.fonts.ready);

		return await page.screenshot({ type: 'jpeg', quality: 92 });
	} finally {
		await page.close();
	}
}
