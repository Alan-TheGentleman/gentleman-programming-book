import GithubSlugger from 'github-slugger';
import { toString as hastToString } from 'hast-util-to-string';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { MediaLibrary } from './assets';
import { DiagramRenderer, isDiagram } from './diagrams';

export interface ChapterHeading {
	id: string;
	text: string;
	depth: number;
}

export interface RenderedChapter {
	title: string;
	headings: ChapterHeading[];
	body: string;
}

function slugPlugin(headings: ChapterHeading[]) {
	const slugger = new GithubSlugger();

	return () => (tree: unknown) => {
		visit(tree as never, 'element', (node: never) => {
			const element = node as {
				tagName: string;
				properties: Record<string, unknown>;
			};
			if (!/^h[1-6]$/.test(element.tagName)) return;

			const text = hastToString(node);
			const id =
				typeof element.properties.id === 'string'
					? element.properties.id
					: slugger.slug(text);
			element.properties.id = id;
			headings.push({ id, text, depth: Number(element.tagName.slice(1)) });
		});
	};
}

function imagePlugin(library: MediaLibrary) {
	return () => async (tree: unknown) => {
		const targets: { properties: Record<string, unknown> }[] = [];

		visit(tree as never, 'element', (node: never) => {
			const element = node as {
				tagName: string;
				properties: Record<string, unknown>;
			};
			if (element.tagName === 'img') targets.push(element);
		});

		await Promise.all(
			targets.map(async element => {
				const source = element.properties.src;
				if (typeof source !== 'string') return;

				const asset = await library.resolve(source);
				if (asset) element.properties.src = `../media/${asset.fileName}`;
			}),
		);
	};
}

function diagramPlugin(renderer: DiagramRenderer) {
	return () => async (tree: unknown) => {
		const targets: { node: Record<string, unknown>; text: string }[] = [];

		visit(tree as never, 'element', (node: never) => {
			const element = node as {
				tagName: string;
				children: { tagName?: string; children?: unknown[] }[];
			};
			if (element.tagName !== 'pre') return;

			const code = element.children.find(child => child.tagName === 'code');
			if (!code) return;

			const text = hastToString(code as never);
			if (!isDiagram(text)) return;

			targets.push({ node: element as never, text });
		});

		await Promise.all(
			targets.map(async target => {
				const asset = await renderer.render(target.text);
				Object.assign(target.node, {
					type: 'element',
					tagName: 'figure',
					properties: { className: ['diagram'] },
					children: [
						{
							type: 'element',
							tagName: 'img',
							properties: {
								src: `../media/${asset.fileName}`,
								alt: 'Diagram',
							},
							children: [],
						},
					],
				});
			}),
		);
	};
}

const EMPTY_LINE_MARKER = '\u200B';

function codeLinesPlugin() {
	return () => (tree: unknown) => {
		visit(tree as never, 'element', (node: never) => {
			const element = node as {
				tagName: string;
				children: { tagName?: string; children?: unknown[] }[];
			};
			if (element.tagName !== 'pre') return;

			const code = element.children.find(child => child.tagName === 'code') as
				| { children: unknown[] }
				| undefined;
			if (!code) return;

			const text = hastToString(code as never).replace(/\n$/, '');
			code.children = text.split('\n').map(line => ({
				type: 'element',
				tagName: 'span',
				properties: { className: ['cl'] },
				children: [{ type: 'text', value: line || EMPTY_LINE_MARKER }],
			}));
		});
	};
}

export async function renderChapter(
	markdown: string,
	library: MediaLibrary,
	diagrams: DiagramRenderer,
): Promise<RenderedChapter> {
	const headings: ChapterHeading[] = [];

	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(slugPlugin(headings))
		.use(imagePlugin(library))
		.use(diagramPlugin(diagrams))
		.use(codeLinesPlugin())
		.use(rehypeStringify, {
			closeSelfClosing: true,
			closeEmptyElements: true,
			tightSelfClosing: false,
		})
		.process(markdown);

	const heading = headings.find(item => item.depth === 1);

	return {
		title: heading ? heading.text : 'Chapter',
		headings,
		body: String(file),
	};
}
