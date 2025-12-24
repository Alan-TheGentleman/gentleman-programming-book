import { test, expect } from '@playwright/test';

import { ChapterPage } from './pages/ChapterPage';
import { HomePage } from './pages/HomePage';

test.describe('Chapter Page', () => {
	test.describe('Layout and Structure', () => {
		test('should display chapter content', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.shouldShowChapterContent();
		});

		test('should display header with controls', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.shouldHaveHeader();
			await chapterPage.shouldHaveSettingsControls();
		});

		test('should display home link', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.shouldHaveHomeLink();
		});

		test('should display index button', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.shouldHaveIndexButton();
		});

		test('should display navigation buttons', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.shouldHaveNavigation();
		});

		test('should display aside index', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.shouldHaveAsideIndex();
		});
	});

	test.describe('Navigation', () => {
		test('first chapter should have previous button disabled', async ({
			page,
		}) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.previousButtonShouldBeDisabled();
			await chapterPage.nextButtonShouldBeEnabled();
		});

		test('should navigate to next chapter', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.clickNext();
			await chapterPage.shouldBeOnChapter(
				'Chapter02_Communication-First-and-Foremost',
			);
		});

		test('should navigate to previous chapter', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter02_Communication-First-and-Foremost');
			await chapterPage.previousButtonShouldBeEnabled();
			await chapterPage.clickPrevious();
			await chapterPage.shouldBeOnChapter('Chapter01_Clean-Agile');
		});

		test('should navigate back to home', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile');
			await chapterPage.clickHome();

			await expect(page).toHaveURL('/');
		});
	});

	test.describe('Internationalization (i18n)', () => {
		test('should load chapter in English', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile', 'en');
			await chapterPage.shouldShowChapterContent();
			await chapterPage.shouldBeOnLocale('en');
		});

		test('should load chapter in Spanish', async ({ page }) => {
			const chapterPage = new ChapterPage(page);

			await chapterPage.open('Chapter01_Clean-Agile', 'es');
			await chapterPage.shouldShowChapterContent();
			await chapterPage.shouldBeOnLocale('es');
		});
	});
});

test.describe('User Journey: Reading Flow', () => {
	test('should complete a reading journey from home to chapters', async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		const chapterPage = new ChapterPage(page);

		// 1. Start from home page
		await homePage.open();
		await homePage.shouldHaveTitle('Gentleman Programming Book');

		// 2. Click "Start Reading"
		await homePage.clickStartReading();

		// 3. Verify we're on first chapter
		await chapterPage.shouldShowChapterContent();
		await chapterPage.shouldBeOnChapter('Chapter01_Clean-Agile');

		// 4. Navigate to next chapter
		await chapterPage.clickNext();
		await chapterPage.shouldBeOnChapter(
			'Chapter02_Communication-First-and-Foremost',
		);

		// 5. Navigate back to previous chapter
		await chapterPage.clickPrevious();
		await chapterPage.shouldBeOnChapter('Chapter01_Clean-Agile');

		// 6. Go back home
		await chapterPage.clickHome();
		await homePage.shouldHaveTitle('Gentleman Programming Book');
	});

	test('should maintain navigation state across chapters', async ({ page }) => {
		const chapterPage = new ChapterPage(page);

		// Start at chapter 1
		await chapterPage.open('Chapter01_Clean-Agile');
		await chapterPage.previousButtonShouldBeDisabled();

		// Navigate through a few chapters
		await chapterPage.clickNext();
		await chapterPage.previousButtonShouldBeEnabled();

		await chapterPage.clickNext();
		await chapterPage.shouldBeOnChapter('Chapter03_Hexagonal_Architecture');

		// Go back to chapter 2
		await chapterPage.clickPrevious();
		await chapterPage.shouldBeOnChapter(
			'Chapter02_Communication-First-and-Foremost',
		);
	});
});
