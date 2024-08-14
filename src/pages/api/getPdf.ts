// @no-ts-checHexagonal_Architecture
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { merge } from 'merge-pdf-buffers';
import type { NextApiRequest, NextApiResponse } from 'next';
import P from 'playwright';

interface Data {
	status: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const pageList = [
		'http://localhost:3000/',
		'http://localhost:3000/book/Chapter01_Clean-Agile',
		'http://localhost:3000/book/Chapter02_Communication-First-and-Foremost',
		'http://localhost:3000/book/Chapter03_Hexagonal_Architecture',
		'http://localhost:3000/book/Chapter04_GoLang',
		'http://localhost:3000/book/Chapter05_NVIM',
		'http://localhost:3000/book/Chapter06_Algorithms',
		'http://localhost:3000/book/Chapter07_Clean_Architecture',
		'http://localhost:3000/book/Chapter08_Clean_Architecture_Front_End',
		'http://localhost:3000/book/Chapter09_React',
		'http://localhost:3000/book/Chapter10_TypeScript',
		'http://localhost:3000/book/Chapter11_FrontEndRadar',
	];

	const pageListSpanish = [
		'http://localhost:3000/es',
		'http://localhost:3000/es/book/Chapter01_Clean-Agile',
		'http://localhost:3000/es/book/Chapter02_Communication-First-and-Foremost',
		'http://localhost:3000/es/book/Chapter03_Hexagonal_Architecture',
		'http://localhost:3000/es/book/Chapter04_GoLang',
		'http://localhost:3000/es/book/Chapter05_NVIM',
		'http://localhost:3000/es/book/Chapter06_Algorithms',
		'http://localhost:3000/es/book/Chapter07_Clean_Architecture',
		'http://localhost:3000/es/book/Chapter08_Clean_Architecture_Front_End',
		'http://localhost:3000/es/book/Chapter09_React',
		'http://localhost:3000/es/book/Chapter10_TypeScript',
		'http://localhost:3000/book/Chapter11_FrontEndRadar',
	];

	const browser = await P.chromium.launch({ headless: true });

	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
	});

	const styleTagContentHome = `	
	header, footer, hr { display: none !important; }
`;
	const styleTagContent = `
	main { margin: 0 !important; }
	header, button { display: none !important; }
	h1 { padding-top: 0 !important; }
	h2 { padding-top: 0 !important; margin-top: 2rem !important; }
	h2 > div { border: none !important; }
	#__next-build-watcher, #__next-prerender-indicator { display: none !important; }
`;
	const opt: Parameters<P.Page['pdf']>['0'] = {
		format: 'A4',
		printBackground: true,
		displayHeaderFooter: false,
		scale: 0.8,
		margin: {
			bottom: '60px',
			top: '60px',
			left: '50px',
			right: '50px',
		},
	};

	const processPdfList = async (list: string[]) =>
		await Promise.all(
			list.map(async (url, idx) => {
				const page = await context.newPage();
				await page.goto(url);
				await page.emulateMedia({ media: 'screen' });

				if (idx === 0) {
					await page.addStyleTag({ content: styleTagContentHome });

					// Open all chapters
					const buttonList = await page
						.getByRole('main')
						.getByRole('button')
						.all();
					await Promise.all(
						buttonList.map(async btn => await btn.dispatchEvent('click')),
					);

					// Disable all links
					const linkList = await page.getByRole('main').getByRole('link').all();
					await Promise.all(
						linkList.map(async link => {
							await link.evaluate(
								(node: HTMLAnchorElement) => (node.href = '#'),
							);
						}),
					);

					// hidde Download button
					await page
						.getByText(/download/i)
						.evaluate((node: HTMLButtonElement) => {
							node.style.display = 'none';
						});

					// hidde Start Reading button
					await page
						.getByText(/start reading/i)
						.evaluate((node: HTMLButtonElement) => {
							node.style.display = 'none';
						});
				} else {
					await page.addStyleTag({ content: styleTagContent });
				}

				await page.waitForTimeout(1500);
				return page.pdf(opt);
			}),
		);

	const pdfList = await processPdfList(pageList);
	const pdfSpanishList = await processPdfList(pageListSpanish);

	const merged = await merge(pdfList);
	fs.writeFileSync('public/gentleman-programming-book.pdf', merged);

	const mergedSpanish = await merge(pdfSpanishList);
	fs.writeFileSync(
		'public/es/gentleman-programming-book-es.pdf',
		mergedSpanish,
	);

	await browser.close();

	res.status(200).json({ status: 'ok' });
}
