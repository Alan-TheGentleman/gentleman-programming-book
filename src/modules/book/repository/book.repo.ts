import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { Pagination } from '@/book/models';
import { Chapter, chapterMetadataSchema, chapterScheme } from '@/book/schemes';
import { omitFileExtension } from '@/book/utils';
import { envVariables } from '@/shared/utils';

interface BookRepository {
	findPaths(locale?: string): string[];
	findChapter(
		chapterId: string,
		locale?: string,
	): { chapter: Chapter; pagination: Pagination; content: string };
	findAllChapters(locale?: string): Chapter[];
}

const postsDirectory = path.join(process.cwd(), 'src', 'data', 'book');

function chapterLink(chapterId: string, locale = 'en') {
	return `${envVariables.WEB_URL}/${locale}/book/${chapterId}`;
}

function readChapter(chapterId: string, locale: string) {
	const _path = path.join(postsDirectory, locale, `${chapterId}.mdx`);
	const fileContents = fs.readFileSync(_path, 'utf-8');
	const { data, content } = matter(fileContents);
	const metadata = chapterMetadataSchema.parse(data);

	return {
		content,
		chapter: chapterScheme.parse({
			id: chapterId,
			link: chapterLink(chapterId, locale),
			name: metadata.name,
			order: metadata.order,
			titleList: metadata.titleList.map(title => ({
				value: title.name,
				link: `${chapterLink(chapterId, locale)}#${title.tagId}`,
			})),
		}),
	};
}

export function BookRepository(): BookRepository {
	return {
		findPaths(locale = 'en') {
			const fullPath = path.join(postsDirectory, locale);
			const paths = fs.readdirSync(fullPath).map(omitFileExtension);

			return paths;
		},
		findChapter(chapterId: string, locale = 'en') {
			const { chapter, content } = readChapter(chapterId, locale);
			const chapterList = this.findAllChapters(locale);
			const currentChapterIndex = chapterList.findIndex(
				({ id }) => id === chapterId,
			);

			const pagination: Pagination = {
				currentChapter: chapter.link,
				previousChapter:
					currentChapterIndex > 0
						? chapterList[currentChapterIndex - 1].link
						: null,
				nextChapter:
					currentChapterIndex < chapterList.length - 1
						? chapterList[currentChapterIndex + 1].link
						: null,
			};

			return { chapter, pagination, content };
		},
		findAllChapters(locale = 'en'): Chapter[] {
			const folderPath = path.join(postsDirectory, locale);
			const chapterIdList = fs.readdirSync(folderPath).map(omitFileExtension);
			const chapterList = chapterIdList.map(
				chapterId => readChapter(chapterId, locale).chapter,
			);

			return chapterList;
		},
	};
}
