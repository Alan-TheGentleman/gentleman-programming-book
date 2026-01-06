import { readdirSync } from 'fs';
import path from 'path';

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://gentleman-programming-book.vercel.app';
	const locales = ['en', 'es'];

	const routes: MetadataRoute.Sitemap = [];

	// Get chapter IDs from filesystem
	const chaptersDir = path.join(process.cwd(), 'src/data/book/en');
	const chapterFiles = readdirSync(chaptersDir)
		.filter(f => f.endsWith('.mdx'))
		.map(f => f.replace('.mdx', ''));

	// Home pages for each locale
	for (const locale of locales) {
		routes.push({
			url: `${baseUrl}/${locale}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					en: `${baseUrl}/en`,
					es: `${baseUrl}/es`,
				},
			},
		});

		// Chapter pages
		for (const chapterId of chapterFiles) {
			routes.push({
				url: `${baseUrl}/${locale}/book/${chapterId}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.8,
				alternates: {
					languages: {
						en: `${baseUrl}/en/book/${chapterId}`,
						es: `${baseUrl}/es/book/${chapterId}`,
					},
				},
			});
		}
	}

	return routes;
}
