interface Title {
	name: string;
	link: string;
}
export interface Chapter {
	chapterId: string;
	name: string;
	order: number;
	link: string;
	titleList: Title[];
}

export type BookContent = Chapter[];
