import { expect, type Page } from '@playwright/test';

/**
 * Page Object Model for the Home page
 * Encapsulates all interactions with the home page
 */
export class HomePage {
	constructor(private page: Page) {}

	// ==================== Navigation ====================

	async open(locale: 'en' | 'es' = 'en') {
		const path = locale === 'es' ? '/es' : '/';
		await this.page.goto(path);
	}

	// ==================== Assertions ====================

	async shouldHaveTitle(title: string) {
		await expect(
			this.page.getByRole('heading', { level: 1, name: title }),
		).toBeVisible();
	}

	async shouldHaveQuote(text: string) {
		await expect(this.page.getByRole('blockquote')).toContainText(text);
	}

	async shouldHaveMustachiImage() {
		await expect(
			this.page.getByRole('img', { name: /mustachi/i }),
		).toBeVisible();
	}

	async shouldHaveStartReadingLink() {
		await expect(
			this.page.getByRole('link', { name: /start reading/i }),
		).toBeVisible();
	}

	async shouldHaveContinueReadingLink() {
		await expect(
			this.page.getByRole('link', { name: /continue reading/i }),
		).toBeVisible();
	}

	async shouldHaveDownloadButton() {
		await expect(
			this.page.getByRole('link', { name: /download/i }),
		).toBeVisible();
	}

	async shouldHaveChapter(chapterName: string) {
		await expect(this.page.getByText(chapterName)).toBeVisible();
	}

	async shouldHaveSocialLinks() {
		const header = this.page.getByRole('banner');
		await expect(header.getByTitle('twitch')).toBeVisible();
		await expect(header.getByTitle('youtube')).toBeVisible();
		await expect(header.getByTitle('discord')).toBeVisible();
		await expect(header.getByTitle('instagram')).toBeVisible();
		await expect(header.getByTitle('spotify')).toBeVisible();
	}

	async shouldHaveSettingsControls() {
		const header = this.page.getByRole('banner');
		await expect(header.getByTitle(/language-select/i)).toBeVisible();
		await expect(header.getByTitle(/theme-select/i)).toBeVisible();
		await expect(header.getByTitle('zoom-in')).toBeVisible();
		await expect(header.getByTitle('zoom-out')).toBeVisible();
	}

	async shouldHaveFooter() {
		const footer = this.page.getByRole('contentinfo');
		await expect(footer).toBeVisible();
		await expect(footer.getByTitle('discord')).toBeVisible();
		await expect(footer.getByTitle('twitch')).toBeVisible();
	}

	// ==================== Actions ====================

	async clickStartReading() {
		await this.page.getByRole('link', { name: /start reading/i }).click();
	}

	async clickContinueReading() {
		await this.page.getByRole('link', { name: /continue reading/i }).click();
	}

	async selectLanguage(locale: 'en' | 'es') {
		await this.page.getByTitle('language-select').click();
		await this.page
			.getByRole('option', { name: new RegExp(locale, 'i') })
			.click();
	}

	async selectTheme(theme: 'Light' | 'Dark' | 'Sepia' | 'System') {
		await this.page.getByTitle('theme-select').click();
		await this.page.getByRole('option', { name: theme }).click();
	}

	async zoomIn() {
		await this.page.getByTitle('zoom-in').click();
	}

	async zoomOut() {
		await this.page.getByTitle('zoom-out').click();
	}

	async expandChapter(chapterName: string) {
		await this.page.getByRole('button', { name: chapterName }).click();
	}

	async clickChapterLink(chapterName: string) {
		await this.page.getByRole('link', { name: chapterName }).click();
	}
}
