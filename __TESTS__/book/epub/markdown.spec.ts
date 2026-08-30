import { describe, expect, it, vi } from 'vitest';

import { MediaLibrary } from '@/book/epub/assets';
import { DiagramRenderer } from '@/book/epub/diagrams';
import { renderChapter } from '@/book/epub/markdown';

function diagramsReturning(fileName = 'diagram-abc123.png') {
	return {
		render: vi.fn(async () => ({
			fileName,
			mediaType: 'image/png',
			data: Buffer.alloc(0),
		})),
		list: () => [],
	} as unknown as DiagramRenderer;
}

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
			diagramsReturning(),
		);

		expect(result.title).toBe('Clean Agile');
	});

	it('collects headings with slugs that match the sidebar tagId format', async () => {
		const result = await renderChapter(
			'# Algorithms\n\n### Types of Big O Notation\n\ntext',
			libraryReturning(null),
			diagramsReturning(),
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
			diagramsReturning(),
		);

		expect(result.body).toContain('src="../media/clean-agile_img1.png"');
		expect(result.body).not.toContain('/clean-agile/img1.svg');
	});

	it('leaves the source untouched when the asset cannot be resolved', async () => {
		const result = await renderChapter(
			'# Chapter\n\n![Missing](/nope/absent.png)',
			libraryReturning(null),
			diagramsReturning(),
		);

		expect(result.body).toContain('src="/nope/absent.png"');
	});

	it('renders gfm tables so Kindle receives real table markup', async () => {
		const result = await renderChapter(
			'# Chapter\n\n| a | b |\n| --- | --- |\n| 1 | 2 |',
			libraryReturning(null),
			diagramsReturning(),
		);

		expect(result.body).toContain('<table>');
		expect(result.body).toContain('<td>1</td>');
	});

	it('emits self closing tags that keep the document xhtml valid', async () => {
		const result = await renderChapter(
			'# Chapter\n\n![Waterfall](/clean-agile/img1.svg)\n\n---',
			libraryReturning('clean-agile_img1.png'),
			diagramsReturning(),
		);

		expect(result.body).toContain('/>');
		expect(result.body).not.toMatch(/<img[^>]*[^/]>/);
	});
	it('turns a box drawing block into an image so Kindle cannot reflow it', async () => {
		const diagram = [
			'```',
			'┌─────────────┐',
			'│  Call Stack │',
			'└─────────────┘',
			'```',
		].join('\n');

		const result = await renderChapter(
			`# Chapter\n\n${diagram}`,
			libraryReturning(null),
			diagramsReturning('diagram-deadbeef.png'),
		);

		expect(result.body).toContain('src="../media/diagram-deadbeef.png"');
		expect(result.body).not.toContain('┌');
	});

	it('leaves ordinary code blocks as text', async () => {
		const result = await renderChapter(
			'# Chapter\n\n```ts\nconst answer = 42;\n```',
			libraryReturning(null),
			diagramsReturning(),
		);

		expect(result.body).toContain('<pre>');
		expect(result.body).toContain('const answer = 42;');
		expect(result.body).not.toContain('../media/diagram');
	});
	it('wraps every code line in its own block so wrapped lines hang', async () => {
		const result = await renderChapter(
			'# Chapter\n\n```ts\nconst a = 1;\nconst b = 2;\n```',
			libraryReturning(null),
			diagramsReturning(),
		);

		expect(result.body).toContain('<span class="cl">const a = 1;</span>');
		expect(result.body).toContain('<span class="cl">const b = 2;</span>');
	});

	it('keeps leading indentation inside a code line', async () => {
		const result = await renderChapter(
			'# Chapter\n\n```ts\nfunction f() {\n  return 1;\n}\n```',
			libraryReturning(null),
			diagramsReturning(),
		);

		expect(result.body).toContain('<span class="cl">  return 1;</span>');
	});

	it('gives blank code lines a marker so they keep their height', async () => {
		const result = await renderChapter(
			'# Chapter\n\n```ts\nconst a = 1;\n\nconst b = 2;\n```',
			libraryReturning(null),
			diagramsReturning(),
		);

		expect(result.body).toContain('<span class="cl">\u200B</span>');
	});
});
