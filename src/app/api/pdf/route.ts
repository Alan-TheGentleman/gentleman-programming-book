import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { chromium, Page, BrowserContext } from 'playwright';
import matter from 'gray-matter';

const BASE_URL = process.env.PDF_BASE_URL || 'http://localhost:3000';
const CHAPTERS_DIR_EN = path.join(process.cwd(), 'src/data/book/en');
const CHAPTERS_DIR_ES = path.join(process.cwd(), 'src/data/book/es');

interface ChapterSection {
	name: string;
	tagId: string;
}

interface ChapterMetadata {
	id: string;
	order: number;
	name: string;
	titleList: ChapterSection[];
	fileName: string;
}

const STYLE_TOC = `
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
	
	* { margin: 0; padding: 0; box-sizing: border-box; }
	
	body { 
		font-family: 'Merriweather', Georgia, serif; 
		background: linear-gradient(180deg, #fdfcfb 0%, #f5f3f0 100%);
		color: #2d2d2d;
		padding: 50px 60px;
		min-height: 100vh;
	}
	
	.toc-container { 
		max-width: 700px; 
		margin: 0 auto; 
	}
	
	.toc-header { 
		text-align: center; 
		margin-bottom: 45px; 
		padding-bottom: 25px; 
		border-bottom: 3px solid #e74c8c; 
	}
	
	.toc-logo {
		width: 80px;
		height: 80px;
		margin: 0 auto 20px;
		background: #1a1a1a;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
	
	.toc-title { 
		font-family: 'Inter', sans-serif;
		font-size: 2rem; 
		font-weight: 700; 
		color: #1a1a1a; 
		margin-bottom: 6px; 
		letter-spacing: 0.02em; 
	}
	
	.toc-subtitle { 
		font-size: 1rem; 
		color: #888; 
		font-style: italic;
		font-weight: 300;
	}
	
	.toc-list {
		list-style: none;
	}
	
	.toc-chapter { 
		margin-bottom: 22px;
		padding-bottom: 18px;
		border-bottom: 1px solid #eee;
	}
	
	.toc-chapter:last-child {
		border-bottom: none;
	}
	
	.toc-chapter-header { 
		display: flex; 
		align-items: baseline; 
		margin-bottom: 6px; 
	}
	
	.toc-chapter-number { 
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem; 
		color: #e74c8c; 
		font-weight: 600; 
		text-transform: uppercase; 
		letter-spacing: 0.12em;
		min-width: 85px;
	}
	
	.toc-chapter-title { 
		font-size: 1.1rem; 
		font-weight: 700; 
		color: #1a1a1a;
		line-height: 1.3;
	}
	
	.toc-sections { 
		padding-left: 85px; 
		margin-top: 8px; 
	}
	
	.toc-section { 
		display: flex; 
		align-items: baseline; 
		padding: 3px 0;
		font-size: 0.9rem;
		color: #666;
		line-height: 1.4;
	}
	
	.toc-section-bullet { 
		color: #e74c8c; 
		margin-right: 10px; 
		font-size: 0.5rem;
		opacity: 0.7;
	}
	
	.toc-section-title { 
		flex: 1; 
	}
	
	.toc-footer {
		margin-top: 40px;
		padding-top: 20px;
		border-top: 1px solid #ddd;
		text-align: center;
		font-size: 0.8rem;
		color: #999;
		font-style: italic;
	}
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

async function getChapterMetadata(
	chaptersDir: string,
): Promise<ChapterMetadata[]> {
	const files = await readdir(chaptersDir);
	const mdxFiles = files
		.filter(f => f.endsWith('.mdx'))
		.sort((a, b) => {
			const numA = parseInt(a.match(/Chapter(\d+)/)?.[1] || '0');
			const numB = parseInt(b.match(/Chapter(\d+)/)?.[1] || '0');
			return numA - numB;
		});

	const chapters: ChapterMetadata[] = [];

	for (const file of mdxFiles) {
		const content = await readFile(path.join(chaptersDir, file), 'utf-8');
		const { data } = matter(content);
		chapters.push({
			id: data.id,
			order: data.order,
			name: data.name,
			titleList: data.titleList || [],
			fileName: file.replace('.mdx', ''),
		});
	}

	return chapters;
}

function generateTocHtml(chapters: ChapterMetadata[], locale: string): string {
	const title = locale === 'es' ? 'Tabla de Contenidos' : 'Table of Contents';
	const subtitle =
		locale === 'es'
			? 'Una guía hacia la programación limpia'
			: 'A guide to clean programming';
	const footer =
		locale === 'es'
			? 'Por Alan Buscaglia — Gentleman Programming'
			: 'By Alan Buscaglia — Gentleman Programming';

	const chaptersHtml = chapters
		.map(
			chapter => `
		<li class="toc-chapter">
			<div class="toc-chapter-header">
				<span class="toc-chapter-number">Chapter ${chapter.order}</span>
				<span class="toc-chapter-title">${chapter.name}</span>
			</div>
			${
				chapter.titleList.length > 0
					? `
				<ul class="toc-sections">
					${chapter.titleList
						.map(
							section => `
						<li class="toc-section">
							<span class="toc-section-bullet">●</span>
							<span class="toc-section-title">${section.name}</span>
						</li>
					`,
						)
						.join('')}
				</ul>
			`
					: ''
			}
		</li>
	`,
		)
		.join('');

	return `
		<!DOCTYPE html>
		<html lang="${locale}">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${title}</title>
			<style>${STYLE_TOC}</style>
		</head>
		<body>
			<div class="toc-container">
				<header class="toc-header">
					<div class="toc-logo">🎩</div>
					<h1 class="toc-title">${title}</h1>
					<p class="toc-subtitle">${subtitle}</p>
				</header>
				
				<ul class="toc-list">
					${chaptersHtml}
				</ul>
				
				<footer class="toc-footer">
					${footer}
				</footer>
			</div>
		</body>
		</html>
	`;
}

async function hideNextDevIndicators(page: Page): Promise<void> {
	await page.evaluate(() => {
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

async function generateTocPdf(
	context: BrowserContext,
	chapters: ChapterMetadata[],
	locale: string,
): Promise<Uint8Array> {
	const page = await context.newPage();

	try {
		const html = generateTocHtml(chapters, locale);
		await page.setContent(html, { waitUntil: 'networkidle' });
		await page.waitForTimeout(500); // Wait for fonts to load

		return await page.pdf(PDF_OPTIONS);
	} finally {
		await page.close();
	}
}

async function generateChapterPdf(
	context: BrowserContext,
	url: string,
): Promise<Uint8Array> {
	const page = await context.newPage();

	try {
		await page.goto(url, { waitUntil: 'networkidle' });
		await page.emulateMedia({ media: 'screen' });
		await page.addStyleTag({ content: STYLE_CHAPTER });
		await hideNextDevIndicators(page);
		await page.waitForTimeout(1000);

		return await page.pdf(PDF_OPTIONS);
	} finally {
		await page.close();
	}
}

async function generatePdfForLocale(
	context: BrowserContext,
	locale: string,
	chapters: ChapterMetadata[],
): Promise<Uint8Array> {
	const pdfBuffers: Uint8Array[] = [];

	// 1. Generate TOC page
	console.log(`[PDF] ${locale}: Generating table of contents...`);
	const tocBuffer = await generateTocPdf(context, chapters, locale);
	pdfBuffers.push(tocBuffer);

	// 2. Generate chapter pages
	for (let i = 0; i < chapters.length; i++) {
		const url = `${BASE_URL}/${locale}/book/${chapters[i].fileName}`;
		const buffer = await generateChapterPdf(context, url);
		pdfBuffers.push(buffer);
		console.log(
			`[PDF] ${locale}: ${i + 1}/${chapters.length} chapters processed`,
		);
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
		// Get chapter metadata from MDX frontmatter
		const [chaptersEn, chaptersEs] = await Promise.all([
			getChapterMetadata(CHAPTERS_DIR_EN),
			getChapterMetadata(CHAPTERS_DIR_ES),
		]);

		console.log(
			`[PDF] Found ${chaptersEn.length} EN chapters, ${chaptersEs.length} ES chapters`,
		);

		const browser = await chromium.launch({ headless: true });
		const context = await browser.newContext({
			viewport: { width: 1280, height: 720 },
		});

		// Generate both PDFs in parallel
		const [englishPdf, spanishPdf] = await Promise.all([
			generatePdfForLocale(context, 'en', chaptersEn),
			generatePdfForLocale(context, 'es', chaptersEs),
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
			chaptersEn: chaptersEn.length,
			chaptersEs: chaptersEs.length,
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
