const baseUrl = 'http://localhost:3000/philip';
interface Title {
	name: string;
	link: string;
}
export interface Chapter {
	name: string;
	order: number;
	link: string;
	titleList: Title[];
}

export type BookContent = Chapter[];

export const bookContentPlaceholder: BookContent = [
	{
		name: 'Clean Agile',
		order: 1,
		link: `${baseUrl}/chapter-1`,
		titleList: [
			{ name: 'Title 1', link: `${baseUrl}/chapter-1#title1` },
			{ name: 'Title 2', link: `${baseUrl}/chapter-1#title2` },
			{ name: 'Title 3', link: `${baseUrl}/chapter-1#title3` },
		],
	},
	{
		name: 'Clean Agile',
		order: 2,
		link: `${baseUrl}/chapter-2`,
		titleList: [
			{ name: 'Title 1', link: `${baseUrl}/chapter-2#title1` },
			{ name: 'Title 2', link: `${baseUrl}/chapter-2#title2` },
			{ name: 'Title 3', link: `${baseUrl}/chapter-2#title3` },
		],
	},
	{
		name: 'Clean Agile',
		order: 3,
		link: `${baseUrl}/chapter-3`,
		titleList: [
			{ name: 'Title 1', link: `${baseUrl}/chapter-3#title1` },
			{ name: 'Title 2', link: `${baseUrl}/chapter-3#title2` },
			{ name: 'Title 3', link: `${baseUrl}/chapter-3#title3` },
		],
	},
	{
		name: 'Clean Agile',
		order: 4,
		link: `${baseUrl}/chapter-4`,
		titleList: [
			{ name: 'Title 1', link: `${baseUrl}/chapter-4#title1` },
			{ name: 'Title 2', link: `${baseUrl}/chapter-4#title2` },
			{ name: 'Title 3', link: `${baseUrl}/chapter-4#title3` },
		],
	},
	{
		name: 'Clean Agile',
		order: 5,
		link: `${baseUrl}/chapter-5`,
		titleList: [
			{ name: 'Title 1', link: `${baseUrl}/chapter-5#title1` },
			{ name: 'Title 2', link: `${baseUrl}/chapter-5#title2` },
			{ name: 'Title 3', link: `${baseUrl}/chapter-5#title3` },
		],
	},
];
