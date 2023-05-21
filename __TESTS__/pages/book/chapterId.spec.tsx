import { render, screen, within } from '@testing-library/react';

import * as ChapterDetail from '@/src/pages/book/[chapterId]';

describe('Page <ChapterDetail />', async () => {
	const res = (await ChapterDetail.getStaticProps({
		params: { chapterId: 'Chapter01_Clean-Agile' },
	})) as { props: ChapterDetail.PageProps };

	it('should contain a header', () => {
		render(<ChapterDetail.default {...res.props} />);

		const header = screen.getByRole('banner');

		expect(header).toBeInTheDocument();
	});

	it('header -> should contain trigger index dialog and go home link', () => {
		render(<ChapterDetail.default {...res.props} />);
		const header = screen.getByRole('banner');

		expect(
			within(header).getByRole('button', { name: /index/i }),
		).toBeInTheDocument();
		expect(
			within(header).getByRole('link', { name: /home/i }),
		).toBeInTheDocument();
	});

	it('header -> should contain the controls settings', () => {
		render(<ChapterDetail.default {...res.props} />);
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
		render(<ChapterDetail.default {...res.props} />);
		const aside = screen.getByLabelText('index');

		expect(aside).toBeInTheDocument();
	});

	it('aside -> should contain a list of chapters', () => {
		render(<ChapterDetail.default {...res.props} />);
		const aside = screen.getByLabelText('index');

		res.props.chapterList[0].titleList.forEach(chapter => {
			expect(within(aside).getByTitle(chapter.value)).toBeInTheDocument();
		});
	});

	it("should contain the navigation's buttons", () => {
		render(<ChapterDetail.default {...res.props} />);

		expect(
			screen.getByRole('button', { name: /previous/i }),
		).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
	});
});
