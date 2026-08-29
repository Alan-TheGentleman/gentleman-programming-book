import { describe, expect, it, vi } from 'vitest';

import { MediaLibrary } from '@/book/epub/assets';
import { renderChapter } from '@/book/epub/markdown';

function libraryReturning(fileName: string | null) {
	return {
		resolve: vi.fn(async () =>
			fileName
				? { fileName, mediaType: 'image/png', data: Buffer.alloc(0) }
				: null,
		),
		list: () => [],
	} as unknown as MediaLibrary;
}

describe('renderChapter', () => {
	it('takes the chapter title from the level one heading', async () => {
		const result = await renderChapter(
			'# Clean Agile\n\nSome prose.',
			libraryReturning(null),
		);

		expect(result.title).toBe('Clean Agile');
	});

	it('collects headings with slugs that match the sidebar tagId format', async () => {
		const result = await renderChapter(
			'# Algorithms\n\n### Types of Big O Notation\n\ntext',
			libraryReturning(null),
		);

		expect(result.headings).toContainEqual({
			id: 'types-of-big-o-notation',
			text: 'Types of Big O Notation',
			depth: 3,
		});
	});

	it('rewrites image sources to the packaged media folder', async () => {
		const result = await renderChapter(
			'# Chapter\n\n![Waterfall](/clean-agile/img1.svg)',
			libraryReturning('clean-agile_img1.png'),
		);

		expect(result.body).toContain('src="../media/clean-agile_img1.png"');
		expect(result.body).not.toContain('/clean-agile/img1.svg');
	});

	it('leaves the source untouched when the asset cannot be resolved', async () => {
		const result = await renderChapter(
			'# Chapter\n\n![Missing](/nope/absent.png)',
			libraryReturning(null),
		);

		expect(result.body).toContain('src="/nope/absent.png"');
	});

	it('renders gfm tables so Kindle receives real table markup', async () => {
		const result = await renderChapter(
			'# Chapter\n\n| a | b |\n| --- | --- |\n| 1 | 2 |',
			libraryReturning(null),
		);

		expect(result.body).toContain('<table>');
		expect(result.body).toContain('<td>1</td>');
	});

	it('emits self closing tags that keep the document xhtml valid', async () => {
		const result = await renderChapter(
			'# Chapter\n\n![Waterfall](/clean-agile/img1.svg)\n\n---',
			libraryReturning('clean-agile_img1.png'),
		);

		expect(result.body).toContain('/>');
		expect(result.body).not.toMatch(/<img[^>]*[^/]>/);
	});
});
