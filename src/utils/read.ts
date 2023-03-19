import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { constants } from 'src/utils/constants';

interface TitleList {
	id: string;
	name: string;
}

interface Metadata {
	id: string;
	order: number;
	name: string;
	titleList: TitleList[];
}

const postsDirectory = path.join(process.cwd(), 'src', 'data', 'book');

export function findPaths() {
	const fullPath = path.join(postsDirectory + '/en');
	const paths = fs
		.readdirSync(fullPath)
		.map(v => ({ params: { chapterId: v.split('.')[0] } }));
	return paths;
}

export async function readChapter(chapterId?: string, locale: string = 'en') {
	const fullPath = path.join(postsDirectory, `${locale}/${chapterId}.mdx`);
	const fileContents = fs.readFileSync(fullPath, 'utf-8');
	const { data, content } = matter(fileContents);

	return { data, content };
}

export async function getPagination(chapterId?: string, locale: string = 'en') {
	const _postsDirectory = postsDirectory + `/${locale}`;

	const chapterNameList = fs.readdirSync(_postsDirectory).map(fileName => {
		const fullPath = path.join(_postsDirectory, `${fileName}`);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const chapterId = fileName.split('.')[0];
		const data = matter(fileContents).data as Metadata;

		return {
			chapterId,
			name: data.name,
			link: constants.URL + '/book' + '/' + chapterId + '#' + data.id,
		};
	});

	const currentChapter = chapterNameList.findIndex(
		chapter => chapter.chapterId === chapterId,
	);

	return {
		previousChapter: chapterNameList[currentChapter - 1] || null,
		currentChapter: chapterNameList[currentChapter],
		nextChapter: chapterNameList[currentChapter + 1] || null,
	};
}

export async function generateBookContent(
	locale: string = 'en',
	chapterId?: string,
) {
	const _postsDirectory = postsDirectory + `/${locale}`;

	const bookContent = fs.readdirSync(_postsDirectory).map(value => {
		const fullPath = path.join(_postsDirectory, value);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		const chapterId = value.split('.')[0];
		const data = matter(fileContents).data as Metadata;
		return {
			chapterId,
			name: data.name,
			order: data.order,
			link: constants.URL + '/book' + '/' + chapterId + '#' + data.id,
			titleList: data.titleList.map(title => ({
				name: title.name,
				link: constants.URL + '/book' + '/' + chapterId + '#' + title.id,
			})),
		};
	});

	return {
		bookContent,
		currentChapter: bookContent.find(v => v.chapterId === chapterId),
	};
}
