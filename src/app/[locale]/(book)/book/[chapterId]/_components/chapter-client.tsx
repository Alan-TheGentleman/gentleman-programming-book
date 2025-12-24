'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { HiHome, HiSelector } from 'react-icons/hi';

import {
	BookChapterIndex,
	ShareMenu,
	ZoomImageConfig,
} from '@/book/components';
import { useFontSize } from '@/book/hooks';
import { BookChapter, Pagination } from '@/book/models';
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
import * as chapterDetailCss from '@/src/styles/ChapterDetail.css';
import { ThemeSelect } from '@/theme/components';

interface ChapterClientProps {
	chapterList: BookChapter[];
	currentChapter: BookChapter;
	pagination: Pagination;
	locale: string;
	children: ReactNode;
}

export function ChapterClient({
	pagination,
	chapterList,
	currentChapter,
	locale,
	children,
}: ChapterClientProps) {
	const fontSize = useFontSize();
	const router = useRouter();
	const pathname = usePathname();

	const handleLocaleChange = (newLocale: string) => {
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
		router.push(newPath);
	};

	const handleNavigation = (link: string | null) => {
		if (link) {
			// Convert full URL to relative path for App Router
			const url = new URL(link);
			router.push(url.pathname);
		}
	};

	return (
		<>
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
											title='index'
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
									title='home'
									component='a'
									href={`/${locale}`}
								/>
							</li>
							<li className={chapterDetailCss.containerItem}>
								<Select
									value={locale}
									colorScheme='secondary'
									leftIcon={<TranslateIcon />}
									title='language-select'
									onChange={handleLocaleChange}
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
									title='zoom-out'
									icon={<ZoomOutText />}
									onClick={fontSize.decreaseFontSize}
								/>
							</li>
							<li className={chapterDetailCss.containerItem}>
								<IconButton
									colorScheme='secondary'
									variant='ghost'
									title='zoom-in'
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

				<main className={chapterDetailCss.main}>{children}</main>

				<div className={chapterDetailCss.paginationControls}>
					<Button
						size='lg'
						onClick={() => handleNavigation(pagination.previousChapter)}
						disabled={!pagination.previousChapter}
						className={chapterDetailCss.controlButton}
					>
						Previous
					</Button>

					<Button
						size='lg'
						onClick={() => handleNavigation(pagination.nextChapter)}
						disabled={!pagination.nextChapter}
						className={chapterDetailCss.controlButton}
					>
						Next
					</Button>
				</div>

				<aside className={chapterDetailCss.aside} aria-label='index'>
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
