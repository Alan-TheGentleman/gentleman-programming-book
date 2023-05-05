export interface Pagination {
	previousChapter: {
		chapterId: string;
		name: string;
		link: string;
	};
	currentChapter: {
		chapterId: string;
		name: string;
		link: string;
	};
	nextChapter: {
		chapterId: string;
		name: string;
		link: string;
	};
}
