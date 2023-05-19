import { render, screen, within } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { BookRepository } from '@/book/repository/book.repo';
import Home from '@/src/pages';

describe('home', () => {
	it.concurrent('home', async () => {
		const bookContent = BookRepository().findAllChapters('en');

		render(<Home chapterIndexList={bookContent} />);
		const main = within(screen.getByRole('main'));
		expect(
			main.getByRole('heading', { level: 2, name: /clean agile/i }),
		).toBeDefined();
	});
});
