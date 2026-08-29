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

export async function renderChapter(
	markdown: string,
	library: MediaLibrary,
): Promise<RenderedChapter> {
	const headings: ChapterHeading[] = [];

	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(slugPlugin(headings))
		.use(imagePlugin(library))
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
