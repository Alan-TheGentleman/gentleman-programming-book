import { render, screen, within } from '@testing-library/react';

import { BookRepository } from '@/book/repository';
import { ChapterClient } from '@/src/app/[locale]/(book)/book/[chapterId]/_components/chapter-client';

describe('Page <ChapterDetail />', () => {
	const chapterId = 'Chapter01_Clean-Agile';
	const locale = 'en';

	const { chapter: currentChapter, pagination } = BookRepository().findChapter(
		chapterId,
		locale,
	);
	const chapterList = BookRepository().findAllChapters(locale);

	const props = {
		chapterList,
		currentChapter,
		pagination,
		locale,
	};

	it('should contain a header', () => {
		render(
			<ChapterClient {...props}>
				<div>MDX Content</div>
			</ChapterClient>,
		);

		const header = screen.getByRole('banner');

		expect(header).toBeInTheDocument();
	});

	it('header -> should contain trigger index dialog and go home link', () => {
		render(
			<ChapterClient {...props}>
				<div>MDX Content</div>
			</ChapterClient>,
		);
		const header = screen.getByRole('banner');

		expect(
			within(header).getByRole('button', { name: /index/i }),
		).toBeInTheDocument();
		expect(
			within(header).getByRole('link', { name: /home/i }),
		).toBeInTheDocument();
	});

	it('header -> should contain the controls settings', () => {
		render(
			<ChapterClient {...props}>
				<div>MDX Content</div>
			</ChapterClient>,
		);
		const header = screen.getByRole('banner');

		expect(within(header).getByTitle(/language-select/i)).toBeInTheDocument();
		expect(
			within(header).getByRole('button', { description: 'zoom-in' }),
		).toBeInTheDocument();
		expect(
			within(header).getByRole('button', { description: 'zoom-out' }),
		).toBeInTheDocument();
		expect(within(header).getByTitle(/theme-select/i)).toBeInTheDocument();
	});

	it('should contain an aside navigation of the chapter', () => {
		render(
			<ChapterClient {...props}>
				<div>MDX Content</div>
			</ChapterClient>,
		);
		const aside = screen.getByLabelText('index');

		expect(aside).toBeInTheDocument();
	});

	it('aside -> should contain a list of chapters', () => {
		render(
			<ChapterClient {...props}>
				<div>MDX Content</div>
			</ChapterClient>,
		);
		const aside = screen.getByLabelText('index');

		props.chapterList[0].titleList.forEach(chapter => {
			expect(within(aside).getByTitle(chapter.value)).toBeInTheDocument();
		});
	});

	it("should contain the navigation's buttons", () => {
		render(
			<ChapterClient {...props}>
				<div>MDX Content</div>
			</ChapterClient>,
		);

		expect(
			screen.getByRole('button', { name: /previous/i }),
		).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
	});
});
