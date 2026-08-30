import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { BrowserContext } from 'playwright';

import { MediaLibrary } from './assets';
import { renderCover } from './cover';
import { DiagramRenderer } from './diagrams';
import { renderChapter } from './markdown';
import {
	buildNav,
	buildOpf,
	ChapterDocument,
	CONTAINER_XML,
	EpubMetadata,
	xhtmlDocument,
} from './opf';
import { EPUB_STYLESHEET } from './styles';
import { createZip, ZipEntry } from './zip';

const BOOK_DIR = path.join(process.cwd(), 'src', 'data', 'book');

export interface LocaleProfile {
	title: string;
	subtitle: string;
	description: string;
	tocLabel: string;
	outputPath: string;
	coverPath: string;
}

export const LOCALE_PROFILES: Record<string, LocaleProfile> = {
	en: {
		title: 'Gentleman Programming',
		subtitle: 'Clean Code, Architecture & Craft',
		description:
			'A comprehensive guide to software development, clean code practices and frontend architecture from the Gentleman Programming community.',
		tocLabel: 'Table of Contents',
		outputPath: path.join('public', 'gentleman-programming-book.epub'),
		coverPath: path.join('public', 'gentleman-programming-book-cover.jpg'),
	},
	es: {
		title: 'Gentleman Programming',
		subtitle: 'Codigo Limpio, Arquitectura y Oficio',
		description:
			'Una guia completa de desarrollo de software, practicas de codigo limpio y arquitectura frontend de la comunidad Gentleman Programming.',
		tocLabel: 'Tabla de Contenidos',
		outputPath: path.join('public', 'es', 'gentleman-programming-book-es.epub'),
		coverPath: path.join(
			'public',
			'es',
			'gentleman-programming-book-es-cover.jpg',
		),
	},
};

const AUTHOR = 'Alan Buscaglia';
const PUBLISHER = 'Gentleman Programming';

interface SourceChapter {
	order: number;
	content: string;
}

async function readChapters(locale: string): Promise<SourceChapter[]> {
	const directory = path.join(BOOK_DIR, locale);
	const fileNames = (await readdir(directory)).filter(name =>
		name.endsWith('.mdx'),
	);

	const chapters = await Promise.all(
		fileNames.map(async name => {
			const raw = await readFile(path.join(directory, name), 'utf-8');
			const { data, content } = matter(raw);

			return { order: Number(data.order ?? Number.MAX_SAFE_INTEGER), content };
		}),
	);

	return chapters.sort((left, right) => left.order - right.order);
}

export interface EpubResult {
	buffer: Buffer;
	cover: Buffer;
	chapterCount: number;
	mediaCount: number;
	outputPath: string;
	coverPath: string;
}

export async function buildEpub(
	context: BrowserContext,
	locale: string,
): Promise<EpubResult> {
	const profile = LOCALE_PROFILES[locale];
	if (!profile) throw new Error(`unsupported locale: ${locale}`);

	const library = new MediaLibrary();
	const diagrams = new DiagramRenderer(context);
	const sources = await readChapters(locale);

	const documents: ChapterDocument[] = [];
	const chapterEntries: ZipEntry[] = [];

	for (const [index, source] of sources.entries()) {
		const rendered = await renderChapter(source.content, library, diagrams);
		const fileName = `chapter-${String(index + 1).padStart(2, '0')}.xhtml`;

		documents.push({
			fileName,
			title: rendered.title,
			headings: rendered.headings,
		});
		chapterEntries.push({
			path: `EPUB/text/${fileName}`,
			data: Buffer.from(
				xhtmlDocument(locale, rendered.title, rendered.body),
				'utf-8',
			),
		});
	}

	const cover = await renderCover(
		context,
		profile.title,
		profile.subtitle,
		AUTHOR,
	);

	const metadata: EpubMetadata = {
		identifier: `urn:uuid:${deterministicUuid(locale)}`,
		title: profile.title,
		subtitle: profile.subtitle,
		author: AUTHOR,
		publisher: PUBLISHER,
		language: locale,
		description: profile.description,
		rights: `© ${AUTHOR}. All rights reserved.`,
		modified: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
	};

	const media = [...library.list(), ...diagrams.list()];
	const coverBody = `\t\t<div class="cover"><img src="../media/cover.jpg" alt="${profile.title}"/></div>`;

	const entries: ZipEntry[] = [
		{
			path: 'mimetype',
			data: Buffer.from('application/epub+zip', 'utf-8'),
			store: true,
		},
		{
			path: 'META-INF/container.xml',
			data: Buffer.from(CONTAINER_XML, 'utf-8'),
		},
		{
			path: 'EPUB/content.opf',
			data: Buffer.from(buildOpf(metadata, documents, media), 'utf-8'),
		},
		{
			path: 'EPUB/nav.xhtml',
			data: Buffer.from(
				buildNav(metadata, documents, profile.tocLabel),
				'utf-8',
			),
		},
		{
			path: 'EPUB/styles/book.css',
			data: Buffer.from(EPUB_STYLESHEET, 'utf-8'),
		},
		{
			path: 'EPUB/text/cover.xhtml',
			data: Buffer.from(
				xhtmlDocument(locale, profile.title, coverBody, 'cover'),
				'utf-8',
			),
		},
		{ path: 'EPUB/media/cover.jpg', data: cover },
		...chapterEntries,
		...media.map(asset => ({
			path: `EPUB/media/${asset.fileName}`,
			data: asset.data,
		})),
	];

	return {
		buffer: createZip(entries),
		cover,
		chapterCount: documents.length,
		mediaCount: media.length,
		outputPath: profile.outputPath,
		coverPath: profile.coverPath,
	};
}

function deterministicUuid(locale: string): string {
	const seed = `gentleman-programming-book-${locale}`;
	let hash = 0x811c9dc5;
	for (let index = 0; index < seed.length; index += 1) {
		hash ^= seed.charCodeAt(index);
		hash = Math.imul(hash, 0x01000193) >>> 0;
	}
	const hex = hash.toString(16).padStart(8, '0');

	return `${hex}-0000-4000-8000-${hex}00000000`.slice(0, 36);
}
