import { useRouter } from 'next/router';
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { GoBook } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { BookContentNavigation } from 'src/components/philip/BookContentNavigation';
import {
	BookContent,
	Chapter,
} from 'src/components/philip/BookContentNavigation/bookContent';
import { ChapterContent } from 'src/components/philip/BookContentNavigation/ChapterContent';
import { Button } from 'src/components/philip/Button';
import { Icon } from 'src/components/philip/Icon';
import { IconButton } from 'src/components/philip/IconButton';
import {
	MenuIcon,
	ThemeIcon,
	TranslateIcon,
	ZoomInText,
	ZoomOutText,
} from 'src/components/philip/IconSource';
import { ThemePicker } from 'src/components/philip/ThemePicker';
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
};

export const BookLayout: React.FC<BookLayoutProps> = ({
	children,
	bookContent,
	currentChapter,
	pagination,
}) => {
	const router = useRouter();
	const ref = React.useRef<HTMLDialogElement | null>(null);

	return (
		<BookLayoutStyled>
			<ContentWrapperStyled>{children}</ContentWrapperStyled>

			<PaginationStyled>
				<Button
					disabled={!pagination.previousChapter?.link}
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
					onClick={() => ref.current?.showModal()}
				/>

				<Button
					disabled={!pagination.nextChapter?.link}
					onClick={() => router.push(pagination.nextChapter?.link)}
				>
					<span>Next</span>{' '}
					<Icon>
						<FaLongArrowAltRight />
					</Icon>
				</Button>
			</PaginationStyled>

			<ReaderConfigButtonsStyled>
				<IconButton variant='text' asIcon={<TranslateIcon />} />
				<IconButton variant='text' asIcon={<ZoomOutText />} />
				<IconButton variant='text' asIcon={<ZoomInText />} />
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
				<Button onClick={() => ref.current?.showModal()}>
					<Icon>
						<MenuIcon />
					</Icon>{' '}
					Menu
				</Button>

				<ChapterContent chapter={currentChapter} />
			</AsideStyled>

			<DialogStyled ref={ref}>
				<ContentDialogWrapper>
					<IconButton
						asIcon={<MdClose />}
						variant='text'
						onClick={() => ref.current?.close()}
					/>
					<BookContentNavigation
						onNavigate={() => ref.current?.close()}
						bookContent={bookContent}
					/>
				</ContentDialogWrapper>
			</DialogStyled>
		</BookLayoutStyled>
	);
};
