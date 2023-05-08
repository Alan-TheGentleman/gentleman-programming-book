export interface ChapterTitle {
	name: string;
	link: string;
}
export interface BookChapter {
	chapterId: string;
	name: string;
	order: number;
	link: string;
	titleList: ChapterTitle[];
}
