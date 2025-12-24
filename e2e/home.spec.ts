import { test } from '@playwright/test';

import { HomePage } from './pages/HomePage';

test.describe('Home Page', () => {
	test.describe('Layout and Structure', () => {
		test('should display the book title', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveTitle('Gentleman Programming Book');
		});

		test('should display the author quote', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveQuote('by Alan Buscaglia');
		});

		test('should display the mustachi image', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveMustachiImage();
		});

		test('should display social media links in header', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveSocialLinks();
		});

		test('should display settings controls in header', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveSettingsControls();
		});

		test('should display footer with social links', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveFooter();
		});
	});

	test.describe('Navigation', () => {
		test('should have a "Start Reading" link', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveStartReadingLink();
		});

		test('should have a "Download" button', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveDownloadButton();
		});

		test('should display chapters in the book index', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open();
			await homePage.shouldHaveChapter('Clean Agile');
			await homePage.shouldHaveChapter('Hexagonal Architecture');
		});
	});

	test.describe('Internationalization (i18n)', () => {
		test('should load English version by default', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open('en');
			await homePage.shouldHaveTitle('Gentleman Programming Book');
			await homePage.shouldHaveStartReadingLink();
		});

		test('should load Spanish version', async ({ page }) => {
			const homePage = new HomePage(page);

			await homePage.open('es');
			await homePage.shouldHaveTitle('Gentleman Programming Book');
		});
	});
});
