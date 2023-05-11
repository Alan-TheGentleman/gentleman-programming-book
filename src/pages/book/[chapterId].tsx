/* eslint-disable simple-import-sort/imports */
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
import { HiHome, HiSelector } from 'react-icons/hi';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

import {
	BookChapterIndex,
	MDXRemote,
	ShareMenu,
	ZoomImageConfig,
} from '@/book/components';
import { useFontSize } from '@/book/hooks';
import { BookChapter, Pagination } from '@/book/models';
import { BookRepository } from '@/book/repository/book.repo';
import { pathListScheme } from '@/book/schemes';
import {
	Button,
	Dialog,
	IconButton,
	MenuIcon,
	Option,
	Select,
	TranslateIcon,
	ZoomInText,
	ZoomOutText,
} from '@/shared/components';
import { SEO } from '@/shared/components/SEO';
import * as chapterDetailCss from '@/src/styles/ChapterDetail.css';
import { ThemeSelect } from '@/theme/components';

export const getStaticPaths: GetStaticPaths = ({ locales = [] }) => {
	type Paths = Awaited<ReturnType<GetStaticPaths>>['paths'][0];
	const pathList = new Set<Paths>();

	const paths = BookRepository().findPaths();

	for (const path of paths) {
		for (const locale of locales) {
			pathList.add({ params: { chapterId: path }, locale });
		}
	}

	return {
		paths: pathListScheme.parse(Array.from(pathList)),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<
	PageProps,
	{ chapterId: string }
> = async ({ params, locale }) => {
	const {
		chapter: currentChapter,
		pagination,
		content,
	} = BookRepository().findChapter(params?.chapterId || '', locale);
	const chapterList = BookRepository().findAllChapters(locale);

	const mdxSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeSlug, rehypePrism],
			format: 'mdx',
		},
	});

	return {
		props: {
			mdxSource,
			chapterList,
			currentChapter,
			pagination,
		},
	};
};

interface PageProps {
	mdxSource: MDXRemoteSerializeResult;
	chapterList: BookChapter[];
	currentChapter: BookChapter;
	pagination: Pagination;
}
export default function ChapterDetail({
	pagination,
	chapterList,
	currentChapter,
	mdxSource,
}: PageProps) {
	const fontSize = useFontSize();
	const router = useRouter();

	return (
		<>
			<SEO
				title='Gentleman Programming Book'
				siteTitle={currentChapter.name}
				locale={router.locale}
			/>

			<ZoomImageConfig />

			<div className={chapterDetailCss.layout}>
				<header className={chapterDetailCss.header}>
					<nav className={chapterDetailCss.navigation}>
						<ul className={chapterDetailCss.settingsControlContainer}>
							<li className={chapterDetailCss.containerItem}>
								<Dialog
									classNameContent={chapterDetailCss.dialogIndex}
									trigger={
										<IconButton
											icon={<MenuIcon />}
											variant='ghost'
											colorScheme='secondary'
										/>
									}
									body={
										<BookChapterIndex
											type='multiple'
											items={chapterList}
											defaultValue={[currentChapter.link]}
										/>
									}
								/>
							</li>

							<li className={chapterDetailCss.containerItem}>
								<IconButton
									icon={<HiHome />}
									variant='ghost'
									colorScheme='secondary'
									component='a'
									href='/'
								/>
							</li>
							<li className={chapterDetailCss.containerItem}>
								<Select
									value={router.locale}
									colorScheme='secondary'
									leftIcon={<TranslateIcon />}
									aria-labelledby='language-select'
									onChange={value =>
										router.push(router.asPath, undefined, { locale: value })
									}
									rightIcon={<HiSelector width='1em' height='1em' />}
								>
									<Option value='es'>Es</Option>
									<Option value='en'>En</Option>
								</Select>
							</li>
							<li className={chapterDetailCss.containerItem}>
								<IconButton
									colorScheme='secondary'
									variant='ghost'
									icon={<ZoomOutText />}
									onClick={fontSize.decreaseFontSize}
								/>
							</li>
							<li className={chapterDetailCss.containerItem}>
								<IconButton
									colorScheme='secondary'
									variant='ghost'
									icon={<ZoomInText />}
									onClick={fontSize.increaseFontSize}
								/>
							</li>

							<li className={chapterDetailCss.containerItem}>
								<ThemeSelect />
							</li>
						</ul>
					</nav>

					<ShareMenu />
				</header>

				<main className={chapterDetailCss.main}>
					<MDXRemote {...mdxSource} />
				</main>

				<div className={chapterDetailCss.paginationControls}>
					<Button
						size='lg'
						onClick={() =>
							pagination.previousChapter &&
							router.push(pagination.previousChapter)
						}
						disabled={!pagination.previousChapter}
						className={chapterDetailCss.controlButton}
					>
						Previous
					</Button>

					<Button
						size='lg'
						onClick={() =>
							pagination.nextChapter && router.push(pagination.nextChapter)
						}
						disabled={!pagination.nextChapter?.link}
						className={chapterDetailCss.controlButton}
					>
						Next
					</Button>
				</div>

				<aside className={chapterDetailCss.aside}>
					<BookChapterIndex
						type='single'
						items={currentChapter}
						value={currentChapter.link}
					/>
				</aside>
			</div>
		</>
	);
}
