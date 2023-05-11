export interface ChapterTitle {
	link: string;
	value: string;
}
export interface BookChapter {
	id: string;
	link: string;
	name: string;
	order: number;
	titleList: ChapterTitle[];
}
