import { useRouter } from 'next/router';
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { GoBook } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { BookContentNavigation } from 'src/components/BookContentNavigation';
import {
	BookContent,
	Chapter,
} from 'src/components/BookContentNavigation/bookContent';
import { ChapterContent } from 'src/components/BookContentNavigation/ChapterContent';
import { Button } from 'src/components/Button';
import { Icon } from 'src/components/Icon';
import { IconButton } from 'src/components/IconButton';
import {
	MenuIcon,
	ThemeIcon,
	ZoomInText,
	ZoomOutText,
} from 'src/components/IconSource';
import { LanguageSelect } from 'src/components/LanguajeSelect';
import { ThemePicker } from 'src/components/ThemePicker';
import { zoomIn, zoomOut } from 'src/utils';
import { Pagination } from 'src/utils/Pagination';

import {
	AsideStyled,
	BookLayoutStyled,
	ContentDialogWrapper,
	ContentWrapperStyled,
	DialogStyled,
	PaginationStyled,
	ReaderConfigButtonsStyled,
} from './BookLayout.styles';

type BookLayoutProps = {
	children: React.ReactNode;
	bookContent?: BookContent;
	currentChapter: Chapter;
	pagination: Pagination;
	id?: string;
};

export const BookLayout = React.forwardRef<
	HTMLDivElement | null,
	BookLayoutProps
>(function BookLayout(
	{ children, bookContent, currentChapter, pagination, id },
	ref,
) {
	const router = useRouter();
	const modalRef = React.useRef<HTMLDialogElement | null>(null);

	return (
		<BookLayoutStyled id={id} ref={ref}>
			<ContentWrapperStyled>{children}</ContentWrapperStyled>

			<PaginationStyled>
				<Button
					disabled={!pagination?.previousChapter?.link}
					onClick={() => router.push(pagination.previousChapter?.link)}
				>
					<Icon>
						<FaLongArrowAltLeft />
					</Icon>{' '}
					<span>Previous</span>
				</Button>

				<IconButton
					asIcon={<GoBook />}
					colorScheme='secondary'
					onClick={() => modalRef.current?.showModal()}
				/>

				<Button
					disabled={!pagination?.nextChapter?.link}
					onClick={() => router.push(pagination.nextChapter?.link)}
				>
					<span>Next</span>{' '}
					<Icon>
						<FaLongArrowAltRight />
					</Icon>
				</Button>
			</PaginationStyled>

			<ReaderConfigButtonsStyled>
				<LanguageSelect />
				<IconButton variant='text' asIcon={<ZoomOutText />} onClick={zoomOut} />
				<IconButton variant='text' asIcon={<ZoomInText />} onClick={zoomIn} />
				<ThemePicker
					justIcons
					trigger={
						<IconButton
							variant='solid'
							colorScheme='secondary'
							asIcon={<ThemeIcon />}
						/>
					}
				/>
			</ReaderConfigButtonsStyled>

			<AsideStyled>
				<Button onClick={() => modalRef.current?.showModal()}>
					<Icon>
						<MenuIcon />
					</Icon>{' '}
					Menu
				</Button>

				<ChapterContent chapter={currentChapter} />
			</AsideStyled>

			<DialogStyled ref={modalRef}>
				<ContentDialogWrapper>
					<IconButton
						asIcon={<MdClose />}
						variant='text'
						onClick={() => modalRef.current?.close()}
					/>
					<BookContentNavigation
						onNavigate={() => modalRef.current?.close()}
						bookContent={bookContent}
					/>
				</ContentDialogWrapper>
			</DialogStyled>
		</BookLayoutStyled>
	);
});
