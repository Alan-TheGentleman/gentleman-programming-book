import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';

import { BookRepository } from '@/book/repository';
import { LocalStorageStubService } from '@/shared/services';
import { HomeClient } from '@/src/app/[locale]/(home)/_components/home-client';

describe('Page <Home />', () => {
	const bookContent = BookRepository().findAllChapters('en');

	it('should contain a header', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const header = screen.getByRole('banner');

		expect(header).toBeDefined();
	});

	it('header -> should contain the social media links', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const header = screen.getByRole('banner');

		expect(within(header).getByTitle('twitch')).toBeInTheDocument();
		expect(within(header).getByTitle('youtube')).toBeInTheDocument();
		expect(within(header).getByTitle('discord')).toBeInTheDocument();
		expect(within(header).getByTitle('instagram')).toBeInTheDocument();
		expect(within(header).getByTitle('spotify')).toBeInTheDocument();
	});

	it('header -> should contain the controls settings', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const header = screen.getByRole('banner');

		expect(within(header).getByTitle(/language-select/i)).toBeInTheDocument();
		expect(
			within(header).getByRole('button', { description: 'zoom-out' }),
		).toBeInTheDocument();
		expect(
			within(header).getByRole('button', { description: 'zoom-in' }),
		).toBeInTheDocument();
		expect(within(header).getByTitle(/theme-select/i)).toBeInTheDocument();
	});

	it('should contain an image of mustachi', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const image = screen.getByRole('img', { name: /mustachi/i });

		expect(image).toBeInTheDocument();
	});

	it('should contain the name of the book', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const heading = screen.getByRole('heading', {
			level: 1,
		});

		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/gentleman programming book/i);
	});

	it('should contain a quote from the author', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const quote = screen.getByRole('blockquote');

		expect(quote).toBeInTheDocument();
		expect(quote).toHaveTextContent(/by Alan Buscaglia/i);
	});

	it('should contain a link to start reading', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const link = screen.getByRole('link', { name: /start reading/i });

		expect(link).toBeInTheDocument();
	});

	it('should contain a link to the book mark', () => {
		const url = 'https://www.gentlemanprogramming.com/en/chapter-1';
		const localStorageService = LocalStorageStubService();
		localStorageService.save('[BOOKMARK]_CHAPTER', url);

		render(
			<HomeClient
				chapterIndexList={bookContent}
				locale='en'
				localStorageService={localStorageService}
			/>,
		);

		const link = screen.getByRole('link', { name: /continue reading/i });

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', url);
	});

	it('should contain the chapters', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);

		bookContent.forEach(chapter => {
			const link = screen.getByText(chapter.name);

			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', chapter.link);
		});
	});

	it('chapter -> should contain its titles', async () => {
		const user = userEvent.setup();
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const chapter = screen.getAllByTestId('accordion-item')[0];
		const button = within(chapter).getByRole('button');

		await user.click(button);

		const region = within(chapter).getByRole('region');

		bookContent[0].titleList.forEach(title => {
			const link = within(region).getByText(title.value);

			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', title.link);
		});
	});

	it('should contain the footer', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const footer = screen.getByRole('contentinfo');

		expect(footer).toBeInTheDocument();
	});

	it('footer -> should contain the social media links (discord, twitch)', () => {
		render(<HomeClient chapterIndexList={bookContent} locale='en' />);
		const footer = screen.getByRole('contentinfo');

		expect(within(footer).getByTitle('discord')).toBeInTheDocument();
		expect(within(footer).getByTitle('twitch')).toBeInTheDocument();
	});
});
