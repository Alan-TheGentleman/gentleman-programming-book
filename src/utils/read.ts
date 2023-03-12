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
	const fullPath = path.join(postsDirectory);
	const paths = fs
		.readdirSync(fullPath)
		.map(v => ({ params: { chapterId: v.split('.')[0] } }));
	return paths;
}

export async function readChapter(chapterId?: string) {
	const fullPath = path.join(postsDirectory, `${chapterId}.mdx`);
	const fileContents = fs.readFileSync(fullPath, 'utf-8');
	const { data, content } = matter(fileContents);

	return { data, content };
}

export async function getPagination(chapterId?: string) {
	const chapterNameList = fs.readdirSync(postsDirectory).map(fileName => {
		const fullPath = path.join(postsDirectory, `${fileName}`);
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

export async function generateBookContent(chapterId?: string) {
	const bookContent = fs.readdirSync(postsDirectory).map(v => {
		const fullPath = path.join(postsDirectory, `${v}`);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		const chapterId = v.split('.')[0];
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
