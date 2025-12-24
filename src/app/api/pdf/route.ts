import fs from 'fs';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import P from 'playwright';

const BASE_URL = 'http://localhost:3000';

const CHAPTERS = [
	'Chapter01_Clean-Agile',
	'Chapter02_Communication-First-and-Foremost',
	'Chapter03_Hexagonal_Architecture',
	'Chapter04_GoLang',
	'Chapter05_NVIM',
	'Chapter06_Algorithms',
	'Chapter07_Clean_Architecture',
	'Chapter08_Clean_Architecture_Front_End',
	'Chapter09_React',
	'Chapter10_TypeScript',
	'Chapter11_FrontEndRadar',
	'Chapter12_Angular',
	'Chapter13_Barrels',
	'Chapter14_FrontEndHistory',
	'Chapter15_IA-Driven-Development',
	'Chapter16_Frontend-Manual',
	'Chapter17_Soft-Skills',
	'Chapter18_Software-Architecture',
];

function getPageList(locale: string) {
	const prefix = locale === 'en' ? '/en' : '/es';
	return [
		`${BASE_URL}${prefix}`,
		...CHAPTERS.map(chapter => `${BASE_URL}${prefix}/book/${chapter}`),
	];
}

const STYLE_HOME = `
	header, footer, hr { display: none !important; }
`;

const STYLE_CHAPTER = `
	main { margin: 0 !important; }
	header, button { display: none !important; }
	h1 { padding-top: 0 !important; }
	h2 { padding-top: 0 !important; margin-top: 2rem !important; }
	h2 > div { border: none !important; }
	#__next-build-watcher, #__next-prerender-indicator { display: none !important; }
`;

const PDF_OPTIONS: Parameters<P.Page['pdf']>[0] = {
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

async function processPdfList(
	context: P.BrowserContext,
	list: string[],
): Promise<Uint8Array[]> {
	return Promise.all(
		list.map(async (url, idx) => {
			const page = await context.newPage();
			await page.goto(url);
			await page.emulateMedia({ media: 'screen' });

			if (idx === 0) {
				await page.addStyleTag({ content: STYLE_HOME });

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
						await link.evaluate((node: HTMLAnchorElement) => (node.href = '#'));
					}),
				);

				// Hide Download button
				const downloadBtn = page.getByText(/download/i);
				if ((await downloadBtn.count()) > 0) {
					await downloadBtn.evaluate((node: HTMLButtonElement) => {
						node.style.display = 'none';
					});
				}

				// Hide Start Reading button
				const startBtn = page.getByText(/start reading/i);
				if ((await startBtn.count()) > 0) {
					await startBtn.evaluate((node: HTMLButtonElement) => {
						node.style.display = 'none';
					});
				}
			} else {
				await page.addStyleTag({ content: STYLE_CHAPTER });
			}

			await page.waitForTimeout(1500);
			return page.pdf(PDF_OPTIONS);
		}),
	);
}

async function mergePdfBuffers(buffers: Uint8Array[]): Promise<Uint8Array> {
	const mergedPdf = await PDFDocument.create();

	for (const buffer of buffers) {
		const pdf = await PDFDocument.load(buffer);
		const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
		copiedPages.forEach(page => mergedPdf.addPage(page));
	}

	return mergedPdf.save();
}

export async function GET() {
	try {
		const browser = await P.chromium.launch({ headless: true });
		const context = await browser.newContext({
			viewport: { width: 1280, height: 720 },
		});

		// Generate English PDF
		const englishPages = getPageList('en');
		const englishPdfList = await processPdfList(context, englishPages);
		const englishMerged = await mergePdfBuffers(englishPdfList);
		fs.writeFileSync('public/gentleman-programming-book.pdf', englishMerged);

		// Generate Spanish PDF
		const spanishPages = getPageList('es');
		const spanishPdfList = await processPdfList(context, spanishPages);
		const spanishMerged = await mergePdfBuffers(spanishPdfList);
		fs.writeFileSync(
			'public/es/gentleman-programming-book-es.pdf',
			spanishMerged,
		);

		await browser.close();

		return NextResponse.json({ status: 'ok' });
	} catch (error) {
		console.error('PDF generation failed:', error);
		return NextResponse.json(
			{ status: 'error', message: String(error) },
			{ status: 500 },
		);
	}
}
