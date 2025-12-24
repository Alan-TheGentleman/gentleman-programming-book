import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { chromium, Page, BrowserContext } from 'playwright';

const BASE_URL = process.env.PDF_BASE_URL || 'http://localhost:3000';
const CHAPTERS_DIR = path.join(process.cwd(), 'src/data/book/en');

const STYLE_HOME = `
	header, footer, hr { display: none !important; }
	/* Hide hero buttons (Start reading / Download) - they use heroButton class from vanilla-extract */
	.hero a[href], .hero a[download] { display: none !important; }
	/* Hide Next.js dev indicators */
	nextjs-portal, #__next-build-watcher, #__next-prerender-indicator { display: none !important; }
	[data-nextjs-toast], [data-nextjs-dialog], [data-nextjs-dialog-overlay] { display: none !important; }
	body > nextjs-portal { display: none !important; }
	/* Style TOC links as plain text since PDF internal navigation doesn't work */
	main a { color: inherit !important; text-decoration: none !important; pointer-events: none !important; }
`;

const STYLE_CHAPTER = `
	main { margin: 0 !important; }
	header, button { display: none !important; }
	h1 { padding-top: 0 !important; }
	h2 { padding-top: 0 !important; margin-top: 2rem !important; }
	h2 > div { border: none !important; }
	/* Hide Next.js dev indicators */
	nextjs-portal, #__next-build-watcher, #__next-prerender-indicator { display: none !important; }
	[data-nextjs-toast], [data-nextjs-dialog], [data-nextjs-dialog-overlay] { display: none !important; }
	body > nextjs-portal { display: none !important; }
	/* Fix code block rendering - remove text-shadow that causes visual artifacts in PDF */
	code[class*="language-"], pre[class*="language-"] { text-shadow: none !important; }
	.token { text-shadow: none !important; }
	/* Ensure code blocks have solid background for PDF */
	pre[class*="language-"] { 
		background: #2a2139 !important; 
		background-image: none !important;
		border-radius: 0.5rem !important;
	}
`;

const PDF_OPTIONS = {
	format: 'A4' as const,
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

async function getChapterList(): Promise<string[]> {
	const files = await readdir(CHAPTERS_DIR);
	return files
		.filter(f => f.endsWith('.mdx'))
		.map(f => f.replace('.mdx', ''))
		.sort((a, b) => {
			const numA = parseInt(a.match(/Chapter(\d+)/)?.[1] || '0');
			const numB = parseInt(b.match(/Chapter(\d+)/)?.[1] || '0');
			return numA - numB;
		});
}

function getPageUrls(locale: string, chapters: string[]): string[] {
	const prefix = `/${locale}`;
	return [
		`${BASE_URL}${prefix}`,
		...chapters.map(chapter => `${BASE_URL}${prefix}/book/${chapter}`),
	];
}

async function hideNextDevIndicators(page: Page): Promise<void> {
	await page.evaluate(() => {
		// Remove Next.js dev overlay elements from DOM
		const selectors = [
			'nextjs-portal',
			'#__next-build-watcher',
			'#__next-prerender-indicator',
			'[data-nextjs-toast]',
			'[data-nextjs-dialog]',
			'[data-nextjs-dialog-overlay]',
		];
		selectors.forEach(selector => {
			document.querySelectorAll(selector).forEach(el => el.remove());
		});
	});
}

async function processHomePage(page: Page): Promise<void> {
	await page.addStyleTag({ content: STYLE_HOME });
	await hideNextDevIndicators(page);

	// Open all accordion chapters to show the full TOC
	const buttons = await page.getByRole('main').getByRole('button').all();
	await Promise.all(buttons.map(btn => btn.dispatchEvent('click')));

	// Remove href from TOC links since PDF internal navigation doesn't work
	// They're already styled as plain text via CSS, this prevents any navigation attempts
	await page.evaluate(() => {
		document.querySelectorAll('main a').forEach(el => {
			el.removeAttribute('href');
		});
	});
}

async function processChapterPage(page: Page): Promise<void> {
	await page.addStyleTag({ content: STYLE_CHAPTER });
	await hideNextDevIndicators(page);
}

async function generatePdfForPage(
	context: BrowserContext,
	url: string,
	isHomePage: boolean,
): Promise<Uint8Array> {
	const page = await context.newPage();

	try {
		await page.goto(url, { waitUntil: 'networkidle' });
		await page.emulateMedia({ media: 'screen' });

		if (isHomePage) {
			await processHomePage(page);
		} else {
			await processChapterPage(page);
		}

		// Wait for fonts and images to load
		await page.waitForTimeout(1000);

		return await page.pdf(PDF_OPTIONS);
	} finally {
		await page.close();
	}
}

async function generatePdfForLocale(
	context: BrowserContext,
	locale: string,
	chapters: string[],
): Promise<Uint8Array> {
	const urls = getPageUrls(locale, chapters);
	const pdfBuffers: Uint8Array[] = [];

	// Process pages sequentially to avoid memory issues
	for (let i = 0; i < urls.length; i++) {
		const buffer = await generatePdfForPage(context, urls[i], i === 0);
		pdfBuffers.push(buffer);
		console.log(`[PDF] ${locale}: ${i + 1}/${urls.length} pages processed`);
	}

	// Merge all PDFs
	const mergedPdf = await PDFDocument.create();
	for (const buffer of pdfBuffers) {
		const pdf = await PDFDocument.load(buffer);
		const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
		pages.forEach(page => mergedPdf.addPage(page));
	}

	return mergedPdf.save();
}

export async function GET() {
	const startTime = Date.now();

	try {
		const chapters = await getChapterList();
		console.log(`[PDF] Found ${chapters.length} chapters`);

		const browser = await chromium.launch({ headless: true });
		const context = await browser.newContext({
			viewport: { width: 1280, height: 720 },
		});

		// Generate both PDFs
		const [englishPdf, spanishPdf] = await Promise.all([
			generatePdfForLocale(context, 'en', chapters),
			generatePdfForLocale(context, 'es', chapters),
		]);

		// Write files
		await Promise.all([
			writeFile('public/gentleman-programming-book.pdf', englishPdf),
			writeFile('public/es/gentleman-programming-book-es.pdf', spanishPdf),
		]);

		await browser.close();

		const duration = ((Date.now() - startTime) / 1000).toFixed(1);
		console.log(`[PDF] Generation completed in ${duration}s`);

		return NextResponse.json({
			status: 'ok',
			chapters: chapters.length,
			duration: `${duration}s`,
		});
	} catch (error) {
		console.error('[PDF] Generation failed:', error);
		return NextResponse.json(
			{ status: 'error', message: String(error) },
			{ status: 500 },
		);
	}
}
