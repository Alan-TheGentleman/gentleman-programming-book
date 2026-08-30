import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

import { buildEpub, LOCALE_PROFILES } from '@/book/epub';

const SUPPORTED_LOCALES = Object.keys(LOCALE_PROFILES);

interface LocaleReport {
	locale: string;
	file: string;
	cover: string;
	chapters: number;
	images: number;
	sizeMb: string;
}

function requestedLocales(request: NextRequest): string[] | null {
	const requested = request.nextUrl.searchParams.get('locale');
	if (!requested || requested === 'all') return SUPPORTED_LOCALES;
	if (!SUPPORTED_LOCALES.includes(requested)) return null;

	return [requested];
}

export async function GET(request: NextRequest) {
	const startTime = Date.now();
	const locales = requestedLocales(request);

	if (!locales) {
		return NextResponse.json(
			{
				status: 'error',
				message: `unsupported locale, expected one of: ${SUPPORTED_LOCALES.join(', ')}, all`,
			},
			{ status: 400 },
		);
	}

	const browser = await chromium.launch({ headless: true });

	try {
		const context = await browser.newContext();
		const generated: LocaleReport[] = [];

		for (const locale of locales) {
			console.log(`[EPUB] ${locale}: building...`);
			const result = await buildEpub(context, locale);
			const target = path.join(process.cwd(), result.outputPath);
			const coverTarget = path.join(process.cwd(), result.coverPath);

			await mkdir(path.dirname(target), { recursive: true });
			await writeFile(target, result.buffer);
			await writeFile(coverTarget, result.cover);

			generated.push({
				locale,
				file: result.outputPath,
				cover: result.coverPath,
				chapters: result.chapterCount,
				images: result.mediaCount,
				sizeMb: (result.buffer.length / (1024 * 1024)).toFixed(1),
			});
			console.log(
				`[EPUB] ${locale}: ${result.chapterCount} chapters, ${result.mediaCount} images`,
			);
		}

		const duration = ((Date.now() - startTime) / 1000).toFixed(1);
		console.log(`[EPUB] Generation completed in ${duration}s`);

		return NextResponse.json({
			status: 'ok',
			generated,
			duration: `${duration}s`,
		});
	} catch (error) {
		console.error('[EPUB] Generation failed:', error);

		return NextResponse.json(
			{ status: 'error', message: String(error) },
			{ status: 500 },
		);
	} finally {
		await browser.close();
	}
}
