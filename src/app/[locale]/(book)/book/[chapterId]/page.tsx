import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BookRepository } from '@/book/repository';

import { ChapterClient } from './_components/chapter-client';
import { ChapterMDXContent } from './_components/chapter-mdx-content';

interface ChapterPageProps {
	params: Promise<{ locale: string; chapterId: string }>;
}

export async function generateMetadata({
	params,
}: ChapterPageProps): Promise<Metadata> {
	const { locale, chapterId } = await params;

	try {
		const { chapter } = BookRepository().findChapter(chapterId, locale);
		return {
			title: chapter.name,
			description: `Read ${chapter.name} from Gentleman Programming Book`,
		};
	} catch {
		return {
			title: 'Chapter Not Found',
		};
	}
}

export default async function ChapterPage({ params }: ChapterPageProps) {
	const { locale, chapterId } = await params;

	try {
		const {
			chapter: currentChapter,
			pagination,
			content,
		} = BookRepository().findChapter(chapterId, locale);
		const chapterList = BookRepository().findAllChapters(locale);

		return (
			<ChapterClient
				chapterList={chapterList}
				currentChapter={currentChapter}
				pagination={pagination}
				locale={locale}
			>
				<ChapterMDXContent source={content} />
			</ChapterClient>
		);
	} catch {
		notFound();
	}
}

export async function generateStaticParams() {
	const locales = ['en', 'es'];
	const params: Array<{ locale: string; chapterId: string }> = [];

	for (const locale of locales) {
		const paths = BookRepository().findPaths(locale);
		for (const chapterId of paths) {
			params.push({ locale, chapterId });
		}
	}

	return params;
}
