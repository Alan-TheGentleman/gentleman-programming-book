import { expect, type Page } from '@playwright/test';

/**
 * Page Object Model for the Chapter detail page
 * Encapsulates all interactions with chapter pages
 */
export class ChapterPage {
	constructor(private page: Page) {}

	// ==================== Navigation ====================

	async open(chapterId: string, locale: 'en' | 'es' = 'en') {
		const basePath = locale === 'es' ? '/es' : '';
		await this.page.goto(`${basePath}/book/${chapterId}`);
	}

	// ==================== Assertions ====================

	async shouldShowChapterContent() {
		await expect(this.page.getByRole('main')).toBeVisible();
	}

	async shouldHaveHeading(text: string) {
		await expect(
			this.page.getByRole('heading', { level: 1, name: new RegExp(text, 'i') }),
		).toBeVisible();
	}

	async shouldHaveHeader() {
		await expect(this.page.getByRole('banner')).toBeVisible();
	}

	async shouldHaveNavigation() {
		await expect(
			this.page.getByRole('button', { name: /previous/i }),
		).toBeVisible();
		await expect(
			this.page.getByRole('button', { name: /next/i }),
		).toBeVisible();
	}

	async shouldHaveAsideIndex() {
		await expect(this.page.getByLabel('index')).toBeVisible();
	}

	async shouldHaveSettingsControls() {
		const header = this.page.getByRole('banner');
		await expect(header.getByTitle(/language-select/i)).toBeVisible();
		await expect(header.getByTitle(/theme-select/i)).toBeVisible();
		await expect(header.getByTitle('zoom-in')).toBeVisible();
		await expect(header.getByTitle('zoom-out')).toBeVisible();
	}

	async shouldHaveHomeLink() {
		await expect(this.page.getByRole('link', { name: /home/i })).toBeVisible();
	}

	async shouldHaveIndexButton() {
		await expect(
			this.page.getByRole('button', { name: /index/i }),
		).toBeVisible();
	}

	async previousButtonShouldBeDisabled() {
		await expect(
			this.page.getByRole('button', { name: /previous/i }),
		).toBeDisabled();
	}

	async previousButtonShouldBeEnabled() {
		await expect(
			this.page.getByRole('button', { name: /previous/i }),
		).toBeEnabled();
	}

	async nextButtonShouldBeDisabled() {
		await expect(
			this.page.getByRole('button', { name: /next/i }),
		).toBeDisabled();
	}

	async nextButtonShouldBeEnabled() {
		await expect(
			this.page.getByRole('button', { name: /next/i }),
		).toBeEnabled();
	}

	// ==================== Actions ====================

	async clickNext() {
		await this.page.getByRole('button', { name: /next/i }).click();
	}

	async clickPrevious() {
		await this.page.getByRole('button', { name: /previous/i }).click();
	}

	async clickHome() {
		await this.page.getByRole('link', { name: /home/i }).click();
	}

	async openIndexDialog() {
		await this.page.getByRole('button', { name: /index/i }).click();
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

	// ==================== URL Helpers ====================

	async shouldBeOnChapter(chapterId: string) {
		await expect(this.page).toHaveURL(new RegExp(`/book/${chapterId}`));
	}

	async shouldBeOnLocale(locale: 'en' | 'es') {
		if (locale === 'es') {
			await expect(this.page).toHaveURL(/\/es\//);
		} else {
			await expect(this.page).not.toHaveURL(/\/es\//);
		}
	}
}
