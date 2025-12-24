import { Metadata } from 'next';

import { BookRepository } from '@/book/repository';

import { HomeClient } from './_components/home-client';

interface HomePageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: 'Gentleman Programming Book',
	description: 'A clean programmer is the best kind of programmer',
};

export default async function HomePage({ params }: HomePageProps) {
	const { locale } = await params;
	const chapterIndexList = BookRepository().findAllChapters(locale);

	return <HomeClient chapterIndexList={chapterIndexList} locale={locale} />;
}

export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'es' }];
}
